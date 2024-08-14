import { useMap } from '../map/MapContext'; // 가정: useMap 훅이 정의되어 있음
import { backgroundLayer, layerMappingsRed, layerMappingsBlue } from '../controls/MPLayerOptions';
import { useState } from 'react';

const MpLayers = ({ onLayerChange, availableLayers }) => {
	const { map } = useMap(); // map element
	const [color, setColor] = useState('red'); // 초기 색상은 빨강

	const handleLayerChange = (layerName) => {
		if (!map) return;

		// 선택된 색깔에 따라 레이어를 가져옴
		const selectedLayer = color === 'red' ? layerMappingsRed[layerName] : layerMappingsBlue[`${layerName}_blue`];

		// 기존 레이어를 삭제하고 새 레이어 추가
		map.getLayers().clear();
		map.addLayer(backgroundLayer); // 배경 레이어 추가
		map.addLayer(selectedLayer); // 선택된 레이어 추가
	};

	const handleLayerColorChange = (newColor) => {
		setColor(newColor); // 색깔 상태 업데이트
	};

	return (
		<div className='mplayer-list'>
			<button className='red_btn' onClick={() => handleLayerColorChange('red')}>
				빨강
			</button>
			<button className='blue_btn' onClick={() => handleLayerColorChange('blue')}>
				파랑
			</button>
			<br></br>
			{availableLayers.map((layerName) => (
				<button key={'layer-' + layerName} className='mplayer-item' onClick={() => handleLayerChange(layerName)}>
					{layerName}
				</button>
			))}
		</div>
	);
};

export default MpLayers;
