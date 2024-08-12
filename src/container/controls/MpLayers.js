import React, { useEffect } from 'react';
import { useMap } from '../map/MapPrimeContext'; // 가정: useMap 훅이 정의되어 있음
import { backgroundLayer, layerMappings } from '../controls/MPLayerOptions';

const MpLayers = ({ onLayerChange, availableLayers }) => {
	const { map } = useMap(); // map element

	const handleLayerChange = (layerName) => {
		const selectedLayer = layerMappings[layerName];
		if (!map) return;

		// 기존 레이어를 삭제하고 새 레이어 추가
		map.getLayers().clear();
		map.addLayer(backgroundLayer); // Add the background layer
		map.addLayer(selectedLayer);
	};

	return (
		<div className='layer-list'>
			{availableLayers.map((layerName) => (
				<button key={'layer-' + layerName} className='layer-item' onClick={() => handleLayerChange(layerName)}>
					{layerName}
				</button>
			))}
		</div>
	);
};

export default MpLayers;
