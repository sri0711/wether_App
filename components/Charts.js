import React from 'react';
import { Line } from 'react-chartjs-2';

function Charts(props) {
	const data = {
		labels: props.Lables,
		datasets: [
			{
				label: props.c_Title,
				data: props.C_Data,
				fill: true,
				backgroundColor: props.Fill_Color,
				borderColor: props.LineColor,
				tension: 0.3
			},
			{
				label: props.c_Title2,
				data: props.C_Data2,
				fill: true,
				backgroundColor: props.Fill_Color2,
				borderColor: props.LineColor2,
				tension: 0.3
			}
		]
	};
	const options = {
		plugins: {
			datalabels: {
				color: 'white'
			}
		},
		scales: {
			yAxes: [
				{
					ticks: {
						beginAtZero: true
					}
				}
			]
		},
		animation: {
			tension: {
				duration: 2000,
				easing: 'easeInCubic',
				from: 0.55,
				to: -0.2,
				loop: true
			}
		}
	};
	return (
		<div
			id='pop'
			style={{
				backgroundColor: 'rgba(255, 255, 255, 0.5)',
				borderRadius: '10px'
			}}
		>
			<Line data={data} options={options} />
		</div>
	);
}

export default Charts;
