import Head from 'next/head';
import { NextSeo } from 'next-seo';
import React, { useState } from 'react';
import Chart from '../components/Chart';
import Charts from '../components/Charts';
import Current from '../components/Current';
import Table from '../components/Table';
import nextSEO from 'next-seo/lib/meta/nextSEO';
//globaly variable transefer by using usestate

var weekday = new Array(7);
weekday[0] = 'Sun';
weekday[1] = 'Mon';
weekday[2] = 'Tue';
weekday[3] = 'Wed';
weekday[4] = 'Thu';
weekday[5] = 'Fri';
weekday[6] = 'Sat';

const lat_lon = async (props) => {
	const location_input = props;
	const url = `https://api.openweathermap.org/geo/1.0/direct?q=${location_input}&limit=1&appid=${process.env.apikey}`;
	const raw = await fetch(url);
	const data = await raw.json();
	const lat = data[0].lat;
	const lon = data[0].lon;
	return { lat: lat, lon: lon };
};
const weatherData = async (cordination) => {
	const lat = cordination.lat;
	const lon = cordination.lon;
	const urlApi = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&appid=${process.env.apikey}`;
	const res = await fetch(urlApi);
	const weather_Data = await res.json();
	return weather_Data;
};
const logWethear = async (e) => {
	e.preventDefault();
	var formInput = e.target.location.value;
	var lattiLongi = await lat_lon(formInput);
	const dummy = await weatherData(lattiLongi);
	return dummy;
};

const datePharser = (rawDate) => {
	let date = new Date(rawDate * 1000);
	return `${('0' + date.getHours()).slice(-2)}:${date.getMinutes()}`;
};
export async function getStaticProps() {
	var lattiLongi = await lat_lon('delhi');
	const wetherdata = await weatherData(lattiLongi);

	return {
		props: {
			wetherdata
		}
	};
}

function index({ wetherdata }) {
	// useState variable handling for the over all application

	// delhi data has beem transfered in the default startup

	const localweatherData = wetherdata;

	// current data partion in the function

	const current_Weather = localweatherData['current'];

	// temprature for local wether data
	let localtemp = Math.floor(current_Weather.temp - 273);
	let crthumitidity = current_Weather.humidity;
	let crtWiSpeed = current_Weather.wind_speed;
	let crtWiDeg = current_Weather.wind_deg;
	let crtUvi = current_Weather.uvi;
	let crticon = current_Weather.weather[0].icon;

	// play with date
	let crtSunr = datePharser(current_Weather.sunrise);
	let crtSuns = datePharser(current_Weather.sunset);

	// play with weekly data

	let delWeekData = localweatherData['daily'];

	// weekly humitidity data

	let crtweekHumi = [];
	for (let i = 0; i <= 7; i++) {
		crtweekHumi.push(delWeekData[i].humidity);
	}

	// week label

	let crt_Week = [];
	for (let i = 0; i <= 7; i++) {
		let date = new Date(delWeekData[i].dt * 1000);
		crt_Week.push(weekday[date.getDay()]);
	}

	// weekly temp data

	let crtWeekTempMin = [];
	for (let i = 0; i <= 7; i++) {
		crtWeekTempMin.push(Math.floor(delWeekData[i].temp.min - 273));
	}

	// weekly temp max data

	let crtWeekTempMax = [];
	for (let i = 0; i <= 7; i++) {
		crtWeekTempMax.push(Math.floor(delWeekData[i].temp.max - 273));
	}

	// delhi week sun rise data

	let del_weekSrise = [];
	for (let i = 0; i <= 7; i++) {
		let del_sunRise = datePharser(delWeekData[i].sunrise);
		del_weekSrise.push(del_sunRise);
	}

	// delhi week sun set Data

	let del_weekSset = [];
	for (let i = 0; i <= 7; i++) {
		let del_sunSet = datePharser(delWeekData[i].sunset);
		del_weekSset.push(del_sunSet);
	}

	// use state variables for the problem

	const [Temp, setTemp] = useState(localtemp);
	const [Humi, setHumi] = useState(crthumitidity);
	const [WiSpeed, setWiSpeed] = useState(crtWiSpeed);
	const [WiDeg, setWiDeg] = useState(crtWiDeg);
	const [uvi, setUvi] = useState(crtUvi);
	const [Location, setLocation] = useState('Delhi');
	const [IconLoc, setIconLoc] = useState(crticon);
	const [Sunr, setSunr] = useState(crtSunr);
	const [Suns, setSuns] = useState(crtSuns);
	const [humiData, sethumiData] = useState(crtweekHumi);
	const [cLabel, setcLabel] = useState(crt_Week);
	const [miTemp, setmiTemp] = useState(crtWeekTempMin);
	const [maTemp, setmaTemp] = useState(crtWeekTempMax);
	const [weekSr, setweekSr] = useState(del_weekSrise);
	const [weekSs, setweekSs] = useState(del_weekSset);

	// weather data

	const newdata = async (e) => {
		const fetchdata = await logWethear(e);

		// play with daily data in the api

		// week hunitidity

		let rawdata = await fetchdata.daily;
		let humi = [];
		for (let i = 0; i <= 7; i++) {
			humi.push(rawdata[i].humidity);
		}

		sethumiData(humi);

		// week label

		let c_Week = [];
		for (let i = 0; i <= 7; i++) {
			let date = new Date(rawdata[i].dt * 1000);
			c_Week.push(weekday[date.getDay()]);
		}

		setcLabel(c_Week);

		// getting sun Raise

		let weekSrise = [];
		for (let i = 0; i <= 7; i++) {
			let sunRise = datePharser(rawdata[i].sunrise);
			weekSrise.push(sunRise);
		}
		setweekSr(weekSrise);
		// getting sun Set

		let weekSset = [];
		for (let i = 0; i <= 7; i++) {
			let sunSet = datePharser(rawdata[i].sunset);
			weekSset.push(sunSet);
		}
		setweekSs(weekSset);

		// week Minimum temp

		let weekTempmin = [];
		for (let i = 0; i <= 7; i++) {
			let tempmin = rawdata[i].temp.min;
			weekTempmin.push(Math.floor(tempmin - 273));
		}
		setmiTemp(weekTempmin);

		// week Maximum Temp

		let weekTempmax = [];
		for (let i = 0; i <= 7; i++) {
			let tempmax = rawdata[i].temp.max;
			weekTempmax.push(Math.floor(tempmax - 273));
		}
		setmaTemp(weekTempmax);

		// place and current data

		const place = e.target.location.value;
		const UpperPlace = place.charAt(0).toUpperCase() + place.slice(1);
		setLocation(UpperPlace);

		let mytemp = fetchdata['current'].temp;
		let myhumi = fetchdata['current'].humidity;
		let myspeed = fetchdata['current'].wind_speed;
		let mydeg = fetchdata['current'].wind_deg;
		let myuvi = fetchdata['current'].uvi;
		let myicon = fetchdata['current'].weather[0].icon;

		// date section of the project

		let mySunr = datePharser(fetchdata['current'].sunrise);
		let mySuns = datePharser(fetchdata['current'].sunset);

		let fetchTemp = Math.floor(mytemp - 273);

		// updating my new fetching data

		setTemp(fetchTemp);
		setHumi(myhumi);
		setWiSpeed(myspeed);
		setWiDeg(mydeg);
		setUvi(myuvi);
		setIconLoc(myicon);
		setSunr(mySunr);
		setSuns(mySuns);
		document.getElementById('form').reset();
	};

	return (
		<div
			className='bg-fixed'
			style={{
				backgroundImage: 'url(/720498.jpg)',
				backgroundSize: 'cover'
			}}
		>
			{/* heading area and meta tag */}
			<Head>
				<meta
					name='viewport'
					content='width=device-width, initial-scale=1.0'
				/>
				<link rel='shortcut icon' href='cloudy.ico' type='image/x-icon' />
				{/* seo section */}
				{/* Primary Meta Tags  */}
				<title>Weather App</title>
				<meta name='title' content='Weather App' />
				<meta
					name='description'
					content='simple to view  your wether details'
				/>

				{/* Open Graph / Facebook */}
				<meta property='og:type' content='website' />
				<meta property='og:url' content='https://wether-app.vercel.app/' />
				<meta property='og:title' content='Weather App' />
				<meta
					property='og:description'
					content='simple to view  your wether details'
				/>
				<meta
					property='og:image'
					content='https://github.com/sri0711/wether_App/blob/main/public/scr.png)'
				/>

				{/* Twitter */}
				<meta property='twitter:card' content='summary_large_image' />
				<meta
					property='twitter:url'
					content='https://wether-app.vercel.app/'
				/>
				<meta property='twitter:title' content='Weather App' />
				<meta
					property='twitter:description'
					content='simple to view  your wether details'
				/>
				<meta
					property='twitter:image'
					content='https://github.com/sri0711/wether_App/blob/main/public/scr.png)'
				/>
				<title>Weather App</title>
			</Head>

			<div>
				{/* page 1 */}
				<div className='h-screen mb-5'>
					<div>
						<h1
							className=' text-center font-semibold text-white'
							style={{ fontSize: 60 }}
						>
							Weather App
						</h1>
					</div>
					<div className='flex'>
						<form
							onSubmit={newdata}
							id='form'
							className='w-full text-center'
						>
							<input
								type='text'
								name='location'
								placeholder='        Enter Your Location ...'
								autoComplete='off'
								spellCheck='true'
								id='location'
								required={true}
								className='hadow m5 appearance-none border rounded w-half py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
							/>
							<input
								type='submit'
								value='search'
								className='bg-blue-500 m-5 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
							/>
						</form>
					</div>
					<Current
						Location={Location}
						Temp={Temp}
						Humi={Humi}
						WiSpeed={WiSpeed}
						WiDeg={WiDeg}
						Uvi={uvi}
						IconLoc={IconLoc}
						Sunr={Sunr}
						Suns={Suns}
					/>
				</div>

				{/* page 2 */}

				<div className='h-screen'>
					<div className='current h-auto m-5 sm:m-15 md:mr-20 md:m-10 md:ml-20 p-10 w-auto'>
						<div className='sm:flex sm:flex-row'>
							{/* left section */}
							<div className='sm:w-1/2 sm:mr-3 sm:ml-3 h-full '>
								<div className='sm:m-5 w-auto mb-3 '>
									<Charts
										c_Title='Temp-min'
										c_Title2='Temp-max'
										Lables={cLabel}
										C_Data={miTemp}
										C_Data2={maTemp}
										LineColor2='red'
										Fill_Color2='rgba(225,0,0,0.4)'
										LineColor='blue'
										Fill_Color='rgba(0,0,128,0.6)'
									/>
								</div>
								<div className='sm:m-5 w-auto mb-3'>
									<Chart
										c_Title='Humidty'
										Lables={cLabel}
										C_Data={humiData}
										LineColor='green'
										Fill_Color='rgba(0, 128, 0,0.4)'
									/>
								</div>
							</div>
							{/* right section */}
							<div className=' hidden sm:w-1/2 sm:block'>
								<p className='text-center'>Sun set and rise timing</p>
								<Table
									Lables={cLabel}
									sunRise={weekSr}
									sunSet={weekSs}
								/>
							</div>
						</div>
					</div>
				</div>

				{/* page 3 */}
				<div className='h-screen sm:hidden'>
					<div className='current h-auto m-5 sm:m-15 md:mr-20 md:m-10 md:ml-20 p-10 w-auto'>
						<p className='text-center'>Sun set and rise timing</p>

						<Table Lables={cLabel} sunRise={weekSr} sunSet={weekSs} />
					</div>
				</div>
			</div>
		</div>
	);
}

export default index;
