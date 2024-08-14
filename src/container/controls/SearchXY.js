import React, { useEffect, useState } from 'react';
import { useMap } from '../map/MapContext';
import { toLonLat } from 'ol/proj';
import '../../styles/SearchXY.css';
export default function SearchXY({ onLocationFound, center }) {
	const [latitude, setLatitude] = useState(''); // 위도 상태
	const [longitude, setLongitude] = useState(''); // 경도 상태

	useEffect(() => {
		if (center) {
			setLongitude(center[0].toString());
			setLatitude(center[1].toString());
		}
	}, [center]);

	const handleSearch = async () => {
		if (latitude && longitude) {
			const lat = parseFloat(latitude);
			const lng = parseFloat(longitude);

			if (!isNaN(lat) && !isNaN(lng)) {
				onLocationFound({ lat, lng }); // 객체 형태로 위도, 경도를 부모 컴포넌트로 전달
			} else {
				console.error('유효하지 않은 위도 또는 경도 값입니다.');
			}
		}
	};

	return (
		<div className='coords-container'>
			<input type='text' className='input_lat' value={latitude} onChange={(e) => setLatitude(e.target.value)} placeholder='위도를 입력하세요' style={{ width: '30vw', height: '1.5vw' }} />
			<input type='text' className='input_lon' value={longitude} onChange={(e) => setLongitude(e.target.value)} placeholder='경도를 입력하세요' style={{ width: '30vw', height: '1.5vw' }} />
			<button onClick={handleSearch} className='trans_btn'>
				이동
			</button>
		</div>
	);
}
