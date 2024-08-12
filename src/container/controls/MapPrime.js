import React, { useEffect, useRef } from 'react';
import 'ol/ol.css';
import { Map, View } from 'ol';
import { fromLonLat } from 'ol/proj';
import { useMap } from '../map/MapPrimeContext';
import { backgroundLayer } from './MPLayerOptions';

const defaultOptions = {
	view: new View({
		zoom: 16,
		center: fromLonLat([126.972656, 37.5516258]), // 서울역
	}),
	layers: [backgroundLayer],
	controls: [],
	overlays: [],
};

export default function MapPrimeComponent({ options = defaultOptions }) {
	const mapRef = useRef(null);
	const { setMap } = useMap();

	useEffect(() => {
		if (!mapRef.current) return;

		const map = new Map({
			...options,
			target: mapRef.current, // map이 렌더링될 HTML element 지정
		});

		console.log('Map created:', map); // 콘솔 로그 추가

		setMap(map); // 이제 (MapContainer 하위) 전역에서 map 객체 호출 가능!

		return () => {
			map.setTarget(null); // clean up
		};
	}, [options, setMap]);

	return <div className='map-container' ref={mapRef} style={{ width: '100%', height: '50vh' }}></div>;
}

// const MapPrimeComponent = () => {
// 	const mapRef = useRef(null); // 지도를 렌더링할 DOM 요소에 대한 참조

// 	useEffect(() => {
// 		// 지도 초기화
// 		const map = new Map({
// 			target: mapRef.current,
// 			title: 'policestation',
// 			layers: [
// 				new TileLayer({
// 					source: new OSM(), // OSM 기본 지도
// 				}),
// 				new TileLayer({
// 					source: new TileWMS({
// 						url: 'http://localhost:3004/MapPrimeServer/map/wms',
// 						params: {
// 							SERVICE: 'WMS',
// 							VERSION: '1.3.0',
// 							REQUEST: 'GetMap',
// 							LAYERS: 'mapprime:policestation',
// 							STYLES: 'aaa',
// 							CRS: 'EPSG:5174',
// 							WIDTH: 912,
// 							HEIGHT: 815,
// 							BBOX: '14111379.611,4498970.958,14158050.516,4537306.912',
// 							FORMAT: 'image/png',
// 						},
// 						serverType: 'geoserver', // 적절한 서버 유형을 지정
// 					}),
// 				}),
// 			],
// 			view: new View({
// 				center: [14134699, 4518138], // 초기 중심점 (EPSG:3857 좌표계)
// 				zoom: 13, // 초기 줌 레벨
// 			}),
// 		});

// 		// 컴포넌트가 언마운트될 때 지도를 정리
// 		return () => map.setTarget(null);
// 	}, []);

// 	return <div ref={mapRef} style={{ width: '100%', height: '40vh' }} />;
// };
