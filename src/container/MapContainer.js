import { useState } from 'react';
import { register } from 'ol/proj/proj4.js';
import { TileGrid } from 'ol/tilegrid.js';

import CartoDB from 'ol/source/CartoDB';

import '../styles/MapContainer.css';
import { fromLonLat, Projection } from 'ol/proj';
import Map from './map/Map';
import Layers from './controls/Layers';
import Zoom from './controls/Zoom';
import POIs from './controls/POIs';
import { MapProvider } from './map/MapContext';
import TileLayer from 'ol/layer/Tile';
import { OSM, TileWMS, XYZ } from 'ol/source';
import View from './controls/View';
import { openStreetMap, vworldBaseLayer, vworldMidnightLayer, googleRoadLayer, googleSatelliteLayer } from './controls/LayerOptions';
import { MapPrimeProvider } from './map/MapPrimeContext';
import MapPrimeComponent from './controls/MapPrime';
import MpLayers from './controls/MpLayers';
import { layerMappings } from './controls/MPLayerOptions';

/** POI 리스트 */
const poiList = [
	{ name: '서울역', coords: fromLonLat([126.972656, 37.5516258]), zoom: 16 },
	{ name: '부산역', coords: fromLonLat([129.039702, 35.115229]), zoom: 16 },
	{ name: '대전역', coords: fromLonLat([127.4341401294979, 36.3321211564871]), zoom: 16 },
];

export default function MapContainer() {
	const [layers, setLayers] = useState([openStreetMap, vworldBaseLayer, vworldMidnightLayer, googleRoadLayer, googleSatelliteLayer]);
	const [pois, setPOIs] = useState(poiList);

	const [mplayers, setMPlayers] = useState([]); // 현재 활성화된 레이어 상태

	const handleLayerChange = (layerName) => {
		setMPlayers([layerMappings[layerName]]);
	};

	return (
		<>
			<MapProvider>
				<Map />
				<View />
				<Layers layers={layers} />
				<Zoom />
				<POIs pois={pois} />
			</MapProvider>

			<MapPrimeProvider>
				<MapPrimeComponent />
				<MpLayers layers={mplayers} onLayerChange={handleLayerChange} availableLayers={Object.keys(layerMappings)} />
			</MapPrimeProvider>
		</>
	);
}
