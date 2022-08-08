//This class controls the application page for the weather app, handling events 
//occuring within the page.


//Getting necessary html elements from the DOM
const form = document.querySelector('form');
const cardText = document.querySelector('.details');
const card = document.querySelector('.card');
const time = document.querySelector('.time');
const icon = document.querySelector('.icon img');
const forecast = new Forecast();

const updateUI = (data) => {
    
    //destructuring the data
    const {cityDets, weather} = data;

    //update card on the website
    cardText.innerHTML = `
    <div class="text-muted text-uppercase text-center details">
        <h5 class="my-3">${cityDets.EnglishName}</h5>
        <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </div>
    </div>
    `;

    //removing the d-none class if present
    if(card.classList.contains('d-none')){
        card.classList.remove('d-none');
    }

    let timeSrc = null;
    if(weather.IsDayTime){
        timeSrc = 'img/day.svg';
    } else {
        timeSrc = 'img/night.svg';
    }
    time.setAttribute('src', timeSrc);
    let iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);
};

form.addEventListener('submit', event =>{
    //prevent page refresh
    event.preventDefault();
    
    //get the submitted value and reset the form
    const city = form.city.value.trim();
    form.reset();

    //update city
    forecast.updateCity(city)
    .then(data => updateUI(data))
    .catch(err => console.log(err));
    
    //store current city in local storage
    localStorage.setItem('currentCity', city);
});

if(localStorage.getItem('currentCity')){
    forecast.updateCity(localStorage.getItem('currentC   ity'))
    .then(data => updateUI(data))
    .catch(err => console.log(err));
}
