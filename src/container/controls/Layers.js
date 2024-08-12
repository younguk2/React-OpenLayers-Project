import React, { useEffect } from 'react';
import { useMap } from '../map/MapContext';

const Layers = ({ layers }) => {
	const { map } = useMap(); // map element

	const onLayerClick = (layer) => {
		layer.setVisible(!layer.getVisible());
	};

	useEffect(() => {
		if (!map) return;

		layers.map((layer) => {
			map.addLayer(layer); //map에 추가
		});
	}, [map]);

	return (
		<div className='layer-list'>
			{layers &&
				layers.map((layer, index) => (
					<button
						key={'layer-' + index}
						className='layer-item'
						onClick={() => {
							onLayerClick(layer);
						}}
					>
						{layer.get('title')}
					</button>
				))}
		</div>
	);
};

// const Layers = ({ layers }) => {
// 	const { map } = useMap(); // map element

// 	const onLayerChange = (event) => {
// 		const layerId = event.target.value;
// 		const layer = layers.find((l) => l.get('id') === layerId);

// 		if (layer) {
// 			// Toggle layer visibility
// 			layer.setVisible(!layer.getVisible());
// 		}
// 	};

// 	useEffect(() => {
// 		if (!map) return;

// 		layers.forEach((layer) => {
// 			map.addLayer(layer); // Add layers to map
// 		});

// 		// Clean up function to remove layers on component unmount
// 		return () => {
// 			layers.forEach((layer) => {
// 				map.removeLayer(layer);
// 			});
// 		};
// 	}, [map, layers]);

// 	return (
// 		<div className='layer-list'>
// 			<select onChange={onLayerChange}>
// 				<option value='' disabled>
// 					레이어를 선택하세요
// 				</option>
// 				{layers.map((layer, index) => (
// 					<option key={'layer-' + index} value={layer.get('id')}>
// 						{layer.get('title')}
// 					</option>
// 				))}
// 			</select>
// 		</div>
// 	);
// };

export default Layers;
