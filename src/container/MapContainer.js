import { useState } from 'react';

import '../styles/MapContainer.css';
import { fromLonLat } from 'ol/proj';
import Map from './map/Map';
import Layers from './controls/Layers';
import Zoom from './controls/Zoom';
import POIs from './controls/POIs';
import { MapProvider } from './map/MapContext';
import Views from './controls/View';
import { MapPrimeProvider } from './map/MapPrimeContext';
import MapPrimeComponent from './map/MapPrime';
import MpLayers from './controls/MpLayers';
import { layerMappings } from './controls/MPLayerOptions';
import { openStreetMap, vworldBaseLayer, vworldMidnightLayer, googleRoadLayer, googleSatelliteLayer } from './controls/LayerOptions';
import * as ol from 'ol';
import { View } from 'ol';
import SearchAddr from './controls/SearchAddr';
import SearchXY from './controls/SearchXY';
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

	const [center, setCenter] = useState([126.972656, 37.5516258]); // 서울역 초기 위치
	const [zoom, setZoom] = useState(16);

	const handleLayerChange = (layerName) => {
		setMPlayers([layerMappings[layerName]]);
	};

	const handleLocationFound = ({ lat, lng }) => {
		setCenter([lng, lat]);
		setZoom(16); // 지도를 찾은 위치로 줌 설정 (필요에 따라 조정 가능)
	};

	const options = {
		view: new View({
			zoom: zoom,
			center: fromLonLat(center), // 위도와 경도를 OpenLayers 형식으로 변환
		}),
		layers: [],
		controls: [],
		overlays: [],
	};
	return (
		<>
			<MapProvider>
				<SearchAddr onLocationFound={handleLocationFound} />
				<SearchXY onLocationFound={handleLocationFound} center={center} />
				<Map options={options} center={center} />
				<Views />
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
