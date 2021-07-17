import React, {Component} from 'react';
import './weather.css'

export default class Weather extends Component {
    constructor() {
        super();
        this.state = {
            temperature: '',
            feels_like: '',
            weather: '',
            description: '',
            icon: '',
            city: '',
            wind: '',
            humidity: '',
            time: '',
            timezone: ''
        }

    }

    componentDidMount() {
        // check if user's geolocation is available
        if ('geolocation' in navigator) {
            // available
            navigator.geolocation.getCurrentPosition(position => {
                this.getWeather(position.coords.latitude, position.coords.longitude).then(data => this.setState({
                    temperature: data.main.temp,
                    feels_like: data.main.feels_like,
                    weather: data.weather[0].main,
                    description: data.weather[0].description,
                    icon: data.weather[0].icon,
                    city: data.name,
                    wind: data.wind.speed,
                    humidity: data.main.humidity,
                    time: data.dt,
                    timezone: data.timezone
                }))
            });

        } else {
            // not available
        }


            
    }

    getWeather(lat, lon) {
        return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${process.env.REACT_APP_WEATHER_API_KEY}`)
        .then(response => response.json());
    }

    formatUnixTimestamp(unixTimestamp, type) {
        var date = new Date(unixTimestamp * 1000);
        // TODO: Add metric/imperial toggles
        if (type === 'time') {

            var hours = date.getHours();
            var minutes = "0" + date.getMinutes();
            var seconds = "0" + date.getSeconds();

            // Military time (metric)
            return hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
        } else if (type === 'date') {
            // const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
            const days = ['Sunday', 'Monday', 'Tuesday', 'Wendsday', 'Thursday', 'Friday', 'Saturday'];

            // var dayOfMonth = date.getDate();
            var day = date.getDay();
            // var month = date.getMonth();

            return days[day]; 
        }
        
    }

    render() {
        return (
            <div className='Weather, container'>
                <div className='inner'>
                    <img className='weather-icon' src={`https://openweathermap.org/img/wn/${this.state.icon}@2x.png`} alt={this.state.description}></img>
                    <div className='temperature'>{Math.round(this.state.temperature)}°F</div>
                    <ul className='weather-items'>
                        <li className='weather-information'>Feels like {Math.round(this.state.feels_like)}°F </li>
                        <li>Wind: {this.state.wind} mph</li>
                        <li>Humidity: {this.state.humidity}%</li>
                    </ul>
                    <ul className='city-date-conditions'>
                        <li className='city'>{this.state.city}</li>
                        <li className='date'>{this.formatUnixTimestamp(this.state.time, 'time')} {this.formatUnixTimestamp(this.state.time, 'date')}</li>
                        <li className='condition'>{this.state.weather}</li>
                    </ul>
                </div>

                

            </div>
            
        );
    }
}