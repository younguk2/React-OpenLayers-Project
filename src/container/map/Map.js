import React, { useEffect, useRef } from 'react';
import { useMap } from './MapContext';
import * as ol from 'ol';
import { fromLonLat } from 'ol/proj';

export default function Map({ options }) {
	const mapRef = useRef(null);
	const { setMap } = useMap();

	useEffect(() => {
		const map = new ol.Map(options); //options 받은 Openlayers Map 객체 생성
		map.setTarget(mapRef.current || ''); //map이 렌더링될 HTML element 지정

		setMap(map); //=> 이제 (MapContainer 하위) 전역에서 map 객체 호출 가능!

		return () => {
			map.setTarget();
		};
	}, [options]);

	return <div className='map-container' ref={mapRef}></div>;
}
