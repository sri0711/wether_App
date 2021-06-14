import Head from 'next/head';
import React, { useState } from 'react';
import Chart from '../components/Chart';
import Charts from '../components/Charts';
import Current from '../components/Current';
import Table from '../components/Table';

//globaly variable transefer by using usestate

var weekday = new Array(7);
weekday[0] = 'Sun';
weekday[1] = 'Mon';
weekday[2] = 'Tue';
weekday[3] = 'Wed';
weekday[4] = 'Thu';
weekday[5] = 'Fri';
weekday[6] = 'Sat';

const dataPusher = (prop_value, propcess) => {
	let aray = [];
	let proValue = prop_value;
	let proces = propcess;
	for (let i = 0; i <= 7; i++) {
		let data = proValue[i][proces];
		aray.push(data);
	}
	return aray;
};
const datePusher = (prop_value) => {
	let aray = [];
	let proValue = prop_value;
	for (let i = 0; i <= 7; i++) {
		let data = new Date(proValue[i].dt * 1000);
		aray.push(weekday[data.getDay()]);
	}
	return aray;
};
const tempPusher = (prop_value, propcess, opt) => {
	let aray = [];
	let proces = propcess;
	let proValue = prop_value;
	let sub = opt;
	for (let i = 0; i <= 7; i++) {
		aray.push(Math.floor(proValue[i][proces][sub]));
	}
	return aray;
};

const TimePusher = (prop_value, propcess) => {
	let aray = [];
	let proValue = prop_value;
	let proces = propcess;
	for (let i = 0; i <= 7; i++) {
		let data = datePharser(proValue[i][proces]);
		aray.push(data);
	}
	return aray;
};

const lat_lon = async (props) => {
	const location_input = props;
	const url = `https://api.openweathermap.org/geo/1.0/direct?q=${location_input}&limit=1&appid=${process.env.apikey}`;
	const raw = await fetch(url);
	const data = await raw.json();
	const lat = data[0].lat;
	const lon = data[0].lon;
	return { lat: lat, lon: lon };
};

const getPlace = async (latiLong) => {
	const lat = latiLong.lat;
	const lon = latiLong.lon;
	const url = `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${process.env.apikey}`;
	const getres = await fetch(url);
	const place = await getres.json();
	const actPlace = await place[0].name;
	return actPlace;
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
	return `${('0' + date.getHours()).slice(-2)}:${(
		'0' + date.getMinutes()
	).slice(-2)}`;
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

	const [Location, setLocation] = useState('Delhi');
	let startloc = 0;

	// location fetching

	const loadedFunc = () => {
		if (startloc === 0) {
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(showPosition, showError);
			} else {
				alert('unnable to fetch location on your device');
			}
		}
	};

	function showError(error) {
		switch (error.code) {
			case error.PERMISSION_DENIED:
				alert(
					` Turn on location service on your device  (or) User denied the request for Geolocation.`
				);
				break;
			case error.POSITION_UNAVAILABLE:
				alert('Location information is unavailable.');
				break;
			case error.TIMEOUT:
				alert('The request to get user location timed out.');
				break;
			case error.UNKNOWN_ERROR:
				alert('An unknown error occurred.');
				break;
		}
	}

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
	let crtrpt = current_Weather.weather[0].description;

	// play with date
	let crtSunr = datePharser(current_Weather.sunrise);
	let crtSuns = datePharser(current_Weather.sunset);

	// play with weekly data

	let delWeekData = localweatherData['daily'];

	// weekly humitidity data

	let crtweekHumi = dataPusher(delWeekData, 'humidity');

	// week label

	let crt_Week = datePusher(delWeekData);

	// weekly temp data

	let crtWeekTempMin = tempPusher(delWeekData, 'temp', 'min');
	// weekly temp max data

	let crtWeekTempMax = tempPusher(delWeekData, 'temp', 'max');

	// delhi week sun rise data

	let del_weekSrise = TimePusher(delWeekData, 'sunrise');

	// delhi week sun set Data

	let del_weekSset = TimePusher(delWeekData, 'sunset');

	// use state variables for the problem

	const [Temp, setTemp] = useState(localtemp);
	const [Humi, setHumi] = useState(crthumitidity);
	const [WiSpeed, setWiSpeed] = useState(crtWiSpeed);
	const [WiDeg, setWiDeg] = useState(crtWiDeg);
	const [uvi, setUvi] = useState(crtUvi);
	const [IconLoc, setIconLoc] = useState(crticon);
	const [Sunr, setSunr] = useState(crtSunr);
	const [Suns, setSuns] = useState(crtSuns);
	const [humiData, sethumiData] = useState(crtweekHumi);
	const [cLabel, setcLabel] = useState(crt_Week);
	const [miTemp, setmiTemp] = useState(crtWeekTempMin);
	const [maTemp, setmaTemp] = useState(crtWeekTempMax);
	const [weekSr, setweekSr] = useState(del_weekSrise);
	const [weekSs, setweekSs] = useState(del_weekSset);
	const [rpt, setrpt] = useState(crtrpt);

	// current wether data

	const showPosition = async (position) => {
		let lat = position.coords.latitude;
		let lon = position.coords.longitude;
		let locAtion = { lat: lat, lon: lon };

		const geoLoc = await getPlace(locAtion);
		setLocation(geoLoc);

		// device location update section and play

		const geoFetch = await weatherData(locAtion);

		// page1

		const devGeoFetch = geoFetch['current'];

		// temp for device and main page

		let dev_temp = Math.floor(devGeoFetch.temp - 273);
		let devhumitidity = devGeoFetch.humidity;
		let devWiSpeed = devGeoFetch.wind_speed;
		let devWiDeg = devGeoFetch.wind_deg;
		let devUvi = devGeoFetch.uvi;
		let devicon = devGeoFetch.weather[0].icon;
		let devrpt = devGeoFetch.weather[0].description;

		// sunset and sun rise
		let devSunr = datePharser(devGeoFetch.sunrise);
		let devSuns = datePharser(devGeoFetch.sunset);

		// update sometjing
		setTemp(dev_temp);
		setHumi(devhumitidity);
		setWiSpeed(devWiSpeed);
		setWiDeg(devWiDeg);
		setUvi(devUvi);
		setIconLoc(devicon);
		setSunr(devSunr);
		setSuns(devSuns);
		setrpt(devrpt);

		// ////////////////// page 2

		// play with weekly data

		let locWeekData = geoFetch['daily'];

		// weekly humitidity data

		let devweekHumi = dataPusher(locWeekData, 'humidity');

		// week label

		let dev_Week = datePusher(locWeekData);

		// weekly temp data

		let devWeekTempMin = tempPusher(locWeekData, 'temp', 'min');

		// weekly temp max data

		let devWeekTempMax = tempPusher(locWeekData, 'temp', 'max');

		// delhi week sun rise data

		let dev_weekSrise = TimePusher(locWeekData, 'sunrise');

		// delhi week sun set Data

		let dev_weekSset = TimePusher(delWeekData, 'sunset');

		// device location based week data update

		sethumiData(devweekHumi);
		setcLabel(dev_Week);
		setmiTemp(devWeekTempMin);
		setmaTemp(devWeekTempMax);
		setweekSr(dev_weekSrise);
		setweekSs(dev_weekSset);
		startloc = 1;
	};
	// weather data

	const newdata = async (e) => {
		try {
			const fetchdata = await logWethear(e);

			// play with daily data in the api

			// week hunitidity

			let rawdata = await fetchdata.daily;
			let humi = dataPusher(rawdata, 'humidity');

			sethumiData(humi);

			// week label

			let c_Week = datePusher(rawdata);

			setcLabel(c_Week);

			// getting sun Raise

			let weekSrise = TimePusher(rawdata, 'sunrise');

			setweekSr(weekSrise);

			// getting sun Set

			let weekSset = TimePusher(rawdata, 'sunset');

			setweekSs(weekSset);

			// week Minimum temp

			let weekTempmin = tempPusher(rawdata, 'temp', 'min');

			setmiTemp(weekTempmin);

			// week Maximum Temp

			let weekTempmax = tempPusher(rawdata, 'temp', 'max');

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
			let myrpt = fetchdata['current'].weather[0].description;

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
			setrpt(myrpt);
			document.getElementById('form').reset();
		} catch (e) {
			alert('Please Enter valid location');
			document.getElementById('form').reset();
		}
	};

	return (
		<div
			className='bg-fixed bg-main-bg bg-right2  '
			// style={{
			// 	backgroundImage: 'url(/720498.svg)',
			// 	backgroundSize: 'cover'
			// }}
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

			<div onLoad={loadedFunc}>
				{/* page 1 */}
				<div className='h-screen sm:mb-5 mb-15'>
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
								className='bg-purple-600 m-5 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded'
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
						rpt={rpt}
					/>
				</div>
				<div className=' h-5'></div>

				{/* page 2 */}

				<div className='h-screen mt-40 sm:mt-0'>
					<div className='current m-5 sm:m-15 md:mr-20 md:m-10 md:ml-20 p-10 w-auto '>
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
										LineColor2='orange'
										Fill_Color2='rgba(235,122,52,0.4)'
										LineColor='blue'
										Fill_Color='rgba(0,0,128,0.6)'
									/>
								</div>
								<div className='sm:m-5 w-auto mb-3 '>
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
								<p className='text-center mt-10 sm:mt-0'>
									Sun set and rise timing
								</p>
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
						<p className='text-center  '>Sun set and rise timing</p>

						<Table Lables={cLabel} sunRise={weekSr} sunSet={weekSs} />
					</div>
				</div>
				<div className=' h-12'></div>
			</div>
		</div>
	);
}

export default index;
