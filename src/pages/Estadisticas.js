import React from 'react';
import ReactEcharts from 'echarts-for-react';
import * as echarts from 'echarts';

import NavBar from '../components/NavBar';
import GastosPorCategoria from '../components/GastosPorCategoria';

import "../styles/Estadisticas.css"
import "../styles/Dashboard.css"

class Estadisticas extends React.Component {

	render() {
		console.log(echarts.helpers);

		let base = +new Date(2014, 9, 3);
		const oneDay = 24 * 3600 * 1000;
		let date = [];

		let data = [Math.random() * 50000];

		for (let i = 1; i < 2000; i++) {
			const now = new Date(base += oneDay);
			date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'));
			data.push(Math.round((Math.random() - 0.5) * 10000 + data[i - 1]));
		}

		return (
			<div className='fill estadisticas'>
				<NavBar></NavBar>
				<div className='dashboard fill'>
					<div className='spendy-card category-card'>
						<GastosPorCategoria/>
					</div>
					<div className='spendy-card history-card'>
						<ReactEcharts
							option={{
								tooltip: {
									trigger: 'axis',
									position: function (pt) {
										return [pt[0], '10%'];
									}
								},
								title: {
									left: 'center',
									text: 'Total de Fondo',
								},
								xAxis: {
									type: 'category',
									boundaryGap: false,
									data: date
								},
								yAxis: {
									type: 'value',
									boundaryGap: [0, '20%']
								},
								dataZoom: [
									{
										type: 'inside'
									},
									{
										handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
										handleSize: '80%',
										handleStyle: {
											color: '#fff',
											shadowBlur: 3,
											shadowColor: 'rgba(0, 0, 0, 0.6)',
											shadowOffsetX: 2,
											shadowOffsetY: 2
										}
									}],
									series: [
										{
											name: 'Total Pos',
											type: 'line',
											smooth: true,
											symbol: 'none',
											sampling: 'average',
											itemStyle: {
												color: 'rgba(0,0,0,0)'
											},
											areaStyle: {
												color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
													offset: 0,
													color: 'rgb(0,250,154)'
												}, {
													offset: 1,
													color: 'rgb(50,205,120)'
												}])
											},
											data: data.map((v) => { return (v > 0 ? v : 0) })
										},
										{
											name: 'Total Neg',
											type: 'line',
											smooth: true,
											symbol: 'none',
											sampling: 'average',
											itemStyle: {
												color: 'rgba(0,0,0,0)'
											},
											areaStyle: {
												color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
													offset: 0,
													color: 'rgb(255,99,71)'
												}, {
													offset: 1,
													color: 'rgb(220,20,60)'
												}])
											},
											data: data.map((v) => { return (v < 0 ? v : 0) })
										}
									]
							}}/>
					</div>
				</div>
			</div>
		);
	}
}

export default Estadisticas;