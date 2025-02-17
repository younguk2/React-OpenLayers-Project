import TileLayer from 'ol/layer/Tile';
import { OSM, TileWMS } from 'ol/source';
import '../../styles/MpLayers.css';
// Define the background layer (OSM)
export const backgroundLayer = new TileLayer({
	source: new OSM(),
});

export const layerMappingsRed = {
	policestation: new TileLayer({
		source: new TileWMS({
			url: 'http://localhost:3004/MapPrimeServer/map/wms',
			params: {
				SERVICE: 'WMS',
				VERSION: '1.3.0',
				REQUEST: 'GetMap',
				LAYERS: 'mapprime:policestation',
				STYLES: 'policestation-style-red',
				CRS: 'EPSG:5174',
				WIDTH: 912,
				HEIGHT: 815,
				BBOX: '14111379.611,4498970.958,14158050.516,4537306.912',
				FORMAT: 'image/png',
			},
			serverType: 'geoserver',
			crossOrigin: 'anonymous',
		}),
	}),
	firestation: new TileLayer({
		source: new TileWMS({
			url: 'http://localhost:3004/MapPrimeServer/map/wms',
			params: {
				SERVICE: 'WMS',
				VERSION: '1.3.0',
				REQUEST: 'GetMap',
				LAYERS: 'mapprime:firestation',
				STYLES: 'firestation-style-red',
				CRS: 'EPSG:5174',
				WIDTH: 912,
				HEIGHT: 815,
				BBOX: '14111379.611,4498970.958,14158050.516,4537306.912',
				FORMAT: 'image/png',
			},
			serverType: 'geoserver',
			crossOrigin: 'anonymous',
		}),
	}),
	subwaystation: new TileLayer({
		source: new TileWMS({
			url: 'http://localhost:3004/MapPrimeServer/map/wms',
			params: {
				SERVICE: 'WMS',
				VERSION: '1.3.0',
				REQUEST: 'GetMap',
				LAYERS: 'mapprime:subway_station',
				STYLES: 'subwaystation-style-red',
				CRS: 'EPSG:5174',
				WIDTH: 912,
				HEIGHT: 815,
				BBOX: '14111379.611,4498970.958,14158050.516,4537306.912',
				FORMAT: 'image/png',
			},
			serverType: 'geoserver',
			crossOrigin: 'anonymous',
		}),
	}),
};
// Define the WMS layers
export const layerMappingsBlue = {
	policestation_blue: new TileLayer({
		source: new TileWMS({
			url: 'http://localhost:3004/MapPrimeServer/map/wms',
			params: {
				SERVICE: 'WMS',
				VERSION: '1.3.0',
				REQUEST: 'GetMap',
				LAYERS: 'mapprime:policestation',
				STYLES: 'policestation-style-blue',
				CRS: 'EPSG:5174',
				WIDTH: 912,
				HEIGHT: 815,
				BBOX: '14111379.611,4498970.958,14158050.516,4537306.912',
				FORMAT: 'image/png',
			},
			serverType: 'geoserver',
			crossOrigin: 'anonymous',
		}),
	}),

	firestation_blue: new TileLayer({
		source: new TileWMS({
			url: 'http://localhost:3004/MapPrimeServer/map/wms',
			params: {
				SERVICE: 'WMS',
				VERSION: '1.3.0',
				REQUEST: 'GetMap',
				LAYERS: 'mapprime:firestation',
				STYLES: 'firestation-style-blue',
				CRS: 'EPSG:5174',
				WIDTH: 912,
				HEIGHT: 815,
				BBOX: '14111379.611,4498970.958,14158050.516,4537306.912',
				FORMAT: 'image/png',
			},
			serverType: 'geoserver',
			crossOrigin: 'anonymous',
		}),
	}),

	subwaystation_blue: new TileLayer({
		source: new TileWMS({
			url: 'http://localhost:3004/MapPrimeServer/map/wms',
			params: {
				SERVICE: 'WMS',
				VERSION: '1.3.0',
				REQUEST: 'GetMap',
				LAYERS: 'mapprime:subway_station',
				STYLES: 'subwaystation-style-blue',
				CRS: 'EPSG:5174',
				WIDTH: 912,
				HEIGHT: 815,
				BBOX: '14111379.611,4498970.958,14158050.516,4537306.912',
				FORMAT: 'image/png',
			},
			serverType: 'geoserver',
			crossOrigin: 'anonymous',
		}),
	}),
};
