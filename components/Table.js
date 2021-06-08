import {FiSunrise ,FiSunset } from 'react-icons/fi'

function Table(props) {
	return (
		<div className=' h-5/6 flex flex-col justify-between mt-10'>
			<div className=' flex flex-row justify-between text-center'><p> {props.Lables[0]}  </p> -<p><FiSunrise/></p> <p> {props.sunRise[0]} </p> - <p><FiSunset/></p> <p> {props.sunSet[0]} </p> </div>
			<div className=' flex flex-row justify-between text-center'><p> {props.Lables[1]}  </p> -<p><FiSunrise/></p> <p> {props.sunRise[1]} </p> - <p><FiSunset/></p> <p> {props.sunSet[1]} </p> </div>
			<div className=' flex flex-row justify-between text-center'><p> {props.Lables[2]}  </p> -<p><FiSunrise/></p> <p> {props.sunRise[2]} </p> - <p><FiSunset/></p> <p> {props.sunSet[2]} </p> </div>
			<div className=' flex flex-row justify-between text-center'><p> {props.Lables[3]}  </p> -<p><FiSunrise/></p> <p> {props.sunRise[3]} </p> - <p><FiSunset/></p> <p> {props.sunSet[3]} </p> </div>
			<div className=' flex flex-row justify-between text-center'><p> {props.Lables[4]}  </p> -<p><FiSunrise/></p> <p> {props.sunRise[4]} </p> - <p><FiSunset/></p> <p> {props.sunSet[4]} </p> </div>
			<div className=' flex flex-row justify-between text-center'><p> {props.Lables[5]}  </p> -<p><FiSunrise/></p> <p> {props.sunRise[5]} </p> - <p><FiSunset/></p> <p> {props.sunSet[5]} </p> </div>
			<div className=' flex flex-row justify-between text-center'><p> {props.Lables[6]}  </p> -<p><FiSunrise/></p> <p> {props.sunRise[6]} </p> - <p><FiSunset/></p> <p> {props.sunSet[6]} </p> </div>
			<div className=' flex flex-row justify-between text-center'><p> {props.Lables[7]}  </p> -<p><FiSunrise/></p> <p> {props.sunRise[7]} </p> - <p><FiSunset/></p> <p> {props.sunSet[7]} </p> </div>

        
		</div>
	);
}

export default Table;
