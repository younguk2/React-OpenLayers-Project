import TileLayer from 'ol/layer/Tile';
import { OSM, TileWMS } from 'ol/source';

// Define the background layer (OSM)
export const backgroundLayer = new TileLayer({
	source: new OSM(),
});

// Define the WMS layers
export const layerMappings = {
	policestation: new TileLayer({
		source: new TileWMS({
			url: 'http://localhost:3004/MapPrimeServer/map/wms',
			params: {
				SERVICE: 'WMS',
				VERSION: '1.3.0',
				REQUEST: 'GetMap',
				LAYERS: 'mapprime:policestation',
				STYLES: 'policestation-style',
				CRS: 'EPSG:5174',
				WIDTH: 912,
				HEIGHT: 815,
				BBOX: '14111379.611,4498970.958,14158050.516,4537306.912',
				FORMAT: 'image/png',
			},
			serverType: 'geoserver',
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
				STYLES: 'firestation-style',
				CRS: 'EPSG:5174',
				WIDTH: 912,
				HEIGHT: 815,
				BBOX: '14111379.611,4498970.958,14158050.516,4537306.912',
				FORMAT: 'image/png',
			},
			serverType: 'geoserver',
		}),
	}),
};
