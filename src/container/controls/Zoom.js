import React from 'react';
import { useMap } from '../map/MapContext';
import '../../styles/Zoom.css';

export default function Zoom() {
	const { map } = useMap(); // map element

	const onZoomIn = () => {
		let zoomLvl = map.getView().getZoom();
		map.getView().setZoom(++zoomLvl);
	};

	const onZoomOut = () => {
		let zoomLvl = map.getView().getZoom();
		map.getView().setZoom(--zoomLvl);
	};

	return (
		<div className='zoom-container'>
			<button className='zoom-in-btn' onClick={onZoomIn}>
				+
			</button>
			<button className='zoom-out-btn' onClick={onZoomOut}>
				-
			</button>
		</div>
	);
}
