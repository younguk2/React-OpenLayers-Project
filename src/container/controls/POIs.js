import { useMap } from '../map/MapContext';
import '../../styles/POIs.css';
export default function POIs({ pois }) {
	const { map } = useMap(); // map element

	const onPOIClick = (poi) => {
		map.getView().setCenter(poi.coords);
		map.getView().setZoom(poi.zoom);
	};

	return (
		<div className='poi-container'>
			{pois &&
				pois.map((poi, index) => (
					<button
						key={'poi-' + index}
						className='poi-item'
						onClick={() => {
							onPOIClick(poi);
						}}
					>
						{poi.name}
					</button>
				))}
		</div>
	);
}
