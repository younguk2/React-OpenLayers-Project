import React, { useEffect, useRef, useState } from 'react';
import { useMap } from './MapContext';
import * as ol from 'ol';
import { fromLonLat } from 'ol/proj';
import { Draw } from 'ol/interaction';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import { Style, Stroke, Fill } from 'ol/style';
import { Circle as CircleGeometry, Point } from 'ol/geom';
import { Feature } from 'ol';
import '../../styles/Map.css';

export default function Map({ options, center }) {
	const mapRef = useRef(null);
	const { setMap } = useMap();
	const vectorSource = useRef(new VectorSource()).current;

	const drawRef = useRef(null);
	const circleRef = useRef(null);
	const clearRef = useRef(null);
	const drawInteractionRef = useRef();

	useEffect(() => {
		// 벡터 레이어의 zIndex를 높게 설정하여 최상위에 위치시키기
		const vectorLayer = new VectorLayer({
			source: vectorSource,
			zIndex: 9999, // zIndex를 높게 설정하여 항상 위에 그려지도록 함
		});

		const map = new ol.Map({
			target: mapRef.current,
			layers: [
				...options.layers, // 다른 레이어들
				vectorLayer, // zIndex가 가장 높은 벡터 레이어
			],
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
					width: 10,
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

	const startDrawingCircle = () => {
		if (drawInteractionRef.current) {
			return; // 이미 그리기 모드일 경우 아무 작업도 하지 않음
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
		</div>
	);
}
