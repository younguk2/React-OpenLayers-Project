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
import Modal from 'react-modal'; // react-modal 임포트

// 모달 스타일 설정
const customStyles = {
	content: {
		width: '25vw',
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
	},
};

const modalTitleStyle = {
	fontSize: '24px',
	fontWeight: 'bold',
	color: '#333',
	marginBottom: '10px',
};

const modalContentStyle = {
	fontSize: '18px',
	color: '#555',
};

Modal.setAppElement('#root');

export default function Map({ options, center }) {
	const mapRef = useRef(null);
	const { setMap } = useMap();
	const vectorSource = useRef(new VectorSource()).current;

	// 각 버튼들의 참조들
	const drawRef = useRef(null);
	const circleRef = useRef(null);
	const clearRef = useRef(null);
	const drawInteractionRef = useRef();

	const [modalIsOpen, setIsOpen] = useState(false);
	const [message, setMessage] = useState('');

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
					color: 'orange',
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
			setMessage(`길이: ${length.toFixed(2)} meters`);
			setIsOpen(true);
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
			setMessage(`면적: ${area.toFixed(2)} square meters`);
			setIsOpen(true);
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
			<div class='button-container'>
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
			<Modal isOpen={modalIsOpen} onRequestClose={() => setIsOpen(false)} style={customStyles} contentLabel='측정 결과'>
				<h2 style={modalTitleStyle}>측정 결과</h2>
				<p style={modalContentStyle}>{message}</p>
				<button onClick={() => setIsOpen(false)}>닫기</button>
			</Modal>
		</div>
	);
}
