import React, { useContext, useState, useEffect } from 'react';
import { useMap } from '../map/MapContext';
import { toLonLat } from 'ol/proj';
import '../../styles/View.css';
export default function View() {
	const { map } = useMap(); // map element
	const [mapView, setMapView] = useState({ zoom: 0, center: [0, 0] });

	useEffect(() => {
		if (!map) return;

		map.on('postrender', () => {
			setMapView({
				zoom: map.getView().getZoom(),
				center: toLonLat(map.getView().getCenter()),
			});
		});
	}, [map]);

	return (
		<div className='view-container'>
			<div>줌 레벨 : {mapView.zoom}</div>
			<div>
				{mapView.center[0]} / {mapView.center[1]}
			</div>
		</div>
	);
}
