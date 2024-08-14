import React, { useEffect, useRef } from 'react';
import 'ol/ol.css';
import { Map, View } from 'ol';
import { fromLonLat } from 'ol/proj';
import { useMap } from './MapPrimeContext';
import { backgroundLayer } from '../controls/MPLayerOptions';

const defaultOptions = {
	view: new View({
		zoom: 14,
		center: fromLonLat([126.972656, 37.5516258]), // 서울역
	}),
	layers: [backgroundLayer],
	controls: [],
	overlays: [],
};

export default function MapPrimeComponent({ options = defaultOptions }) {
	const mapRef = useRef(null);
	const { setMap, map } = useMap();

	useEffect(() => {
		if (!mapRef.current) return;

		const mapInstance = new Map({
			...options,
			target: mapRef.current, // map이 렌더링될 HTML element 지정
		});

		console.log('Map created:', mapInstance); // 콘솔 로그 추가

		setMap(mapInstance); // 이제 (MapContainer 하위) 전역에서 map 객체 호출 가능!

		return () => {
			mapInstance.setTarget(null); // clean up
		};
	}, [options, setMap]);

	// options이 변경될 때마다 레이어를 업데이트
	useEffect(() => {
		if (map) {
			map.setLayerGroup(
				new Map({
					...options,
					layers: options.layers, // 변경된 레이어 적용
				}).getLayerGroup()
			);
		}
	}, [options, map]);

	return <div className='map-container' ref={mapRef} style={{ width: '100%', height: '50vh' }}></div>;
}
