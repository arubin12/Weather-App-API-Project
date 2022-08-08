//This contains two functions that use the Accuweather CitySearch and CurrentConditions APIs to obtain a code for an input city, then
//uses this code to get the current weather conditions in that city.

class Forecast{
    constructor(){
        this.key = 'rrdzBdzlZrK1qDkDriADCtTcQXmAxW8F';
        this.cityURI = 'http://dataservice.accuweather.com/locations/v1/cities/search';
        this.conditionsURI = 'http://dataservice.accuweather.com/currentconditions/v1/';
    }
    async updateCity(city){
        const cityDets = await this.getCity(city);    
        const weather = await this.getConditions(cityDets.Key);
    
        return {cityDets: cityDets, weather: weather};
    }

    async getCity(city){
        const query = `?apikey=${this.key}&q=${city}`;
        const response = await fetch(this.cityURI + query);
        const data = await response.json();

        return data[0];
    }
    async getConditions(cityKey){
        const query = `${cityKey}?apikey=${this.key}`;

        const response = await fetch(this.conditionsURI + query);
        const data = await response.json();
        return data[0];
    }
}
