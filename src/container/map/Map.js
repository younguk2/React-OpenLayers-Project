import React, { useEffect, useRef, useState } from 'react';
import { useMap } from './MapContext';
import * as ol from 'ol';
import { fromLonLat } from 'ol/proj';
import { Draw } from 'ol/interaction';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';

export default function Map({ options, center }) {
	const mapRef = useRef(null);
	const { setMap } = useMap();
	const vectorSource = useRef(new VectorSource()).current;

	const drawRef = useRef(null);
	const clearRef = useRef(null);
	const drawInteractionRef = useRef(null);

	useEffect(() => {
		const map = new ol.Map({
			target: mapRef.current,
			layers: [
				...options.layers,
				new VectorLayer({
					source: vectorSource,
				}),
			],
			view: new ol.View({
				center: fromLonLat(center),
				zoom: options.zoom || 10,
			}),
		});

		setMap(map);

		return () => {
			map.setTarget(null);
		};
	}, [options, center, vectorSource, setMap]);

	const startDrawing = () => {
		if (drawInteractionRef.current) {
			return; // 이미 그리기 모드일 경우 아무 작업도 하지 않음
		}
		const draw = new Draw({
			source: vectorSource,
			type: 'LineString',
		});
		drawInteractionRef.current = draw;
		setMap((prevMap) => {
			prevMap.addInteraction(draw);
			return prevMap;
		});
	};

	const clearLines = () => {
		vectorSource.clear();
		if (drawInteractionRef.current) {
			setMap((prevMap) => {
				prevMap.removeInteraction(drawInteractionRef.current);
				drawInteractionRef.current = null;
				return prevMap;
			});
		}
	};

	useEffect(() => {
		const drawButton = drawRef.current;
		const clearButton = clearRef.current;

		if (drawButton && clearButton) {
			drawButton.addEventListener('click', startDrawing);
			clearButton.addEventListener('click', clearLines);
		}

		return () => {
			if (drawButton && clearButton) {
				drawButton.removeEventListener('click', startDrawing);
				clearButton.removeEventListener('click', clearLines);
			}
		};
	}, [setMap]);

	return (
		<div>
			<div className='map-container' ref={mapRef}></div>
			<button id='draw-button' ref={drawRef}>
				Draw Line
			</button>
			<button id='clear-button' ref={clearRef}>
				Clear Lines
			</button>
		</div>
	);
}
