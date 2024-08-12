// layers.js
import TileLayer from 'ol/layer/Tile';
import { XYZ, OSM } from 'ol/source';

const openStreetMap = new TileLayer({
	title: 'OpenStreetMap',
	source: new OSM(),
	visible: true,
	zIndex: 0,
});

const vworldBaseLayer = new TileLayer({
	title: 'V-World',
	source: new XYZ({
		projection: 'EPSG:3857',
		url: 'https://xdworld.vworld.kr/2d/Base/service/{z}/{x}/{y}.png',
		crossOrigin: 'anonymous',
	}),
	id: 'vworld_base',
	visible: false,
});

const vworldMidnightLayer = new TileLayer({
	title: 'V-World-Midnight',
	source: new XYZ({
		projection: 'EPSG:3857',
		url: 'https://xdworld.vworld.kr/2d/midnight/service/{z}/{x}/{y}.png',
		crossOrigin: 'anonymous',
	}),
	id: 'vworld_midnight',
	visible: false,
});

const googleRoadLayer = new TileLayer({
	title: 'GoogleRoad',
	source: new XYZ({
		projection: 'EPSG:3857',
		url: 'http://mt0.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}',
		crossOrigin: 'anonymous',
	}),
	id: 'google_road',
	visible: false,
});

const googleSatelliteLayer = new TileLayer({
	title: 'GoogleSatellite',
	source: new XYZ({
		projection: 'EPSG:3857',
		url: 'http://mt0.google.com/vt/lyrs=s&hl=en&x={x}&y={y}&z={z}',
		crossOrigin: 'anonymous',
	}),
	id: 'google_satellite',
	visible: false,
});

export { openStreetMap, vworldBaseLayer, vworldMidnightLayer, googleRoadLayer, googleSatelliteLayer };
