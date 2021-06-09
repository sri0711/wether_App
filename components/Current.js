import Image from 'next/image';
import { FiSunrise, FiSunset } from 'react-icons/fi';

function Current(props) {
	return (
		<div className='current h-auto m-5 sm:m-15 md:mr-20 md:m-10 md:ml-20 p-10 w-auto max-h-screen'>
			<h2 className='text-center text-2xl '>{props.Location}</h2>
			<p className='ml-3 mr-3 text-center' style={{ fontSize: 70 }}>
				{props.Temp}&#186;c
			</p>
			<div className='block text-center m-2'>
				<p>{props.rpt}</p>
			</div>
			<div className='flex flex-wrap h-auto justify-between '>
				<div>
					<p>Humidity: {props.Humi} %</p>
				</div>
				<div>
					<p>Wind Speed: {props.WiSpeed}</p>
				</div>
				<div>
					<p>Wind degree: {props.WiDeg}</p>
				</div>
				<div>
					<p>Uvi: {props.Uvi}</p>
				</div>
			</div>
			<div className='icons_div mt-5'>
				<h1 className='w-20 icon_main'>
					<Image
						src={`http://openweathermap.org/img/wn/${props.IconLoc}.png`}
						height={100}
						width={100}
					/>
				</h1>
			</div>
			<div className='flex flex-wrap h-auto justify-between '>
				<div className='block text-center'>
					<p className='flex'>
						<FiSunrise size={25} /> {props.Sunr}
					</p>
					<p>sunrise</p>
				</div>

				<div className='block text-center'>
					<p className='flex '>
						<FiSunset size={25} /> {props.Suns}
					</p>

					<p>sunset</p>
				</div>
			</div>
		</div>
	);
}

export default Current;
