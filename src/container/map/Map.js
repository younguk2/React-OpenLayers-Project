import React, { useEffect, useRef, useState } from 'react';
import { useMap } from './MapContext';
import * as ol from 'ol';
import { fromLonLat } from 'ol/proj';
import { Draw } from 'ol/interaction';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import { Style, Stroke, Fill } from 'ol/style';
import { getLength, getArea } from 'ol/sphere'; // ol/sphere 모듈을 추가
import '../../styles/Map.css';

export default function Map({ options, center }) {
	const mapRef = useRef(null);
	const { setMap } = useMap();
	const vectorSource = useRef(new VectorSource()).current;

	const drawRef = useRef(null);
	const circleRef = useRef(null);
	const clearRef = useRef(null);
	const drawInteractionRef = useRef();

	const [measurements, setMeasurements] = useState({ length: 0, area: 0 });

	useEffect(() => {
		const vectorLayer = new VectorLayer({
			source: vectorSource,
			zIndex: 9999,
		});

		const map = new ol.Map({
			target: mapRef.current,
			layers: [...options.layers, vectorLayer],
			view: new ol.View({
				center: fromLonLat(center),
				zoom: options.zoom || 16,
			}),
		});

		setMap(map);

		return () => {
			map.setTarget(null);
		};
	}, [options, center, vectorSource, setMap]);

	const createStyle = (type) => {
		if (type === 'LineString') {
			return new Style({
				stroke: new Stroke({
					color: 'red',
					width: 7,
				}),
				fill: new Fill({
					color: 'red',
				}),
			});
		} else {
			return new Style({
				stroke: new Stroke({
					color: 'red',
					width: 5,
				}),
			});
		}
	};

	const startDrawing = () => {
		if (drawInteractionRef.current) {
			return;
		}
		const draw = new Draw({
			source: vectorSource,
			type: 'LineString',
			style: createStyle('LineString'),
		});
		draw.on('drawend', (event) => {
			const length = getLength(event.feature.getGeometry());
			setMeasurements({ length, area: 0 });
		});
		drawInteractionRef.current = draw;
		setMap((prevMap) => {
			prevMap.addInteraction(draw);
			return prevMap;
		});
	};

	const startDrawingCircle = () => {
		if (drawInteractionRef.current) {
			return;
		}

		const draw = new Draw({
			source: vectorSource,
			type: 'Polygon',
			style: new Style({
				stroke: new Stroke({
					color: 'rgba(240, 79, 79, 0.9)',
					width: 2,
				}),
				fill: new Fill({
					color: 'rgba(50, 133, 240, 0.5)',
				}),
			}),
		});
		draw.on('drawend', (event) => {
			const area = getArea(event.feature.getGeometry());
			setMeasurements({ length: 0, area });
		});
		drawInteractionRef.current = draw;
		setMap((prevMap) => {
			prevMap.addInteraction(draw);
			return prevMap;
		});
	};

	const clearLines = () => {
		vectorSource.clear();
		setMeasurements({ length: 0, area: 0 });
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
		const circleButton = circleRef.current;
		const clearButton = clearRef.current;

		if (drawButton && circleButton && clearButton) {
			drawButton.addEventListener('click', startDrawing);
			circleButton.addEventListener('click', startDrawingCircle);
			clearButton.addEventListener('click', clearLines);
		}

		return () => {
			if (drawButton && circleButton && clearButton) {
				drawButton.removeEventListener('click', startDrawing);
				circleButton.removeEventListener('click', startDrawingCircle);
				clearButton.removeEventListener('click', clearLines);
			}
		};
	}, [setMap]);

	return (
		<div>
			<div className='map-container' ref={mapRef}></div>
			<button id='draw-button' ref={drawRef}>
				선 그리기
			</button>
			<button id='draw-poly-button' ref={circleRef}>
				다각형 그리기
			</button>
			<button id='clear-button' ref={clearRef}>
				지우기
			</button>
			<div className='measure'>
				{measurements.length > 0 && <p>길이: {measurements.length.toFixed(2)} meters</p>}
				{measurements.area > 0 && <p>면적: {measurements.area.toFixed(2)} square meters</p>}
			</div>
		</div>
	);
}
