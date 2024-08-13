import React, { useEffect, useRef, useState } from 'react';
import { useMap } from './MapContext';
import * as ol from 'ol';
import { fromLonLat } from 'ol/proj';
import { Draw } from 'ol/interaction';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import { Style, Stroke, Fill } from 'ol/style';
import { GeometryType } from 'ol/geom';
import Polygon, { fromCircle } from 'ol/geom/Polygon';
import { Circle as CircleStyle } from 'ol/style';

import { Circle as CircleGeometry, Point } from 'ol/geom';
import { Feature } from 'ol';
export default function Map({ options, center }) {
	const mapRef = useRef(null);
	const { setMap } = useMap();
	const vectorSource = useRef(new VectorSource()).current;

	const drawRef = useRef(null);
	const circleRef = useRef(null);
	const clearRef = useRef(null);
	const drawInteractionRef = useRef();

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
	const createStyle = (type) => {
		if (type === 'Circle') {
			return new Style({
				stroke: new Stroke({
					color: 'blue',
					width: 3,
				}),
				fill: new Fill({
					color: 'rgba(0, 0, 255, 0.1)',
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
			return; // 이미 그리기 모드일 경우 아무 작업도 하지 않음
		}
		const draw = new Draw({
			source: vectorSource,
			type: 'LineString',
			style: createStyle('LineString'),
		});
		drawInteractionRef.current = draw;
		setMap((prevMap) => {
			prevMap.addInteraction(draw);
			return prevMap;
		});
	};

	const createCircleFeature = (center, radius) => {
		const circle = new CircleGeometry(center, radius);
		return new Feature(circle);
	};

	// 원형을 그리기 위한 Draw 상호작용 생성
	const startDrawingCircle = () => {
		if (drawInteractionRef.current) {
			return; // 이미 그리기 모드일 경우 아무 작업도 하지 않음
		}

		const draw = new Draw({
			source: vectorSource,
			type: 'Polygon', // Polygon을 사용하여 원형을 근사
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

		drawInteractionRef.current = draw;
		setMap((prevMap) => {
			prevMap.addInteraction(draw);
			console.log('추가된 인터렉션');
			console.log(draw);
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
			<button id='draw-circle-button' ref={circleRef}>
				다각형 그리기
			</button>
			<button id='clear-button' ref={clearRef}>
				지우기
			</button>
		</div>
	);
}
