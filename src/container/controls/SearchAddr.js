import React, { useState } from 'react';
import axios from 'axios';

export default function SearchAddr({ onLocationFound }) {
	const [address, setAddress] = useState('');

	const handleSearch = async () => {
		try {
			const response = await axios.get(`https://dapi.kakao.com/v2/local/search/address.json?query=${address}`, {
				headers: {
					Authorization: 'KakaoAK 773b35a2ad7d22737bdbb20d69f15f7e', // 개인 카카오 API 키 입력
				},
			});

			if (response.data.documents.length > 0) {
				const location = response.data.documents[0];
				const { x, y } = location.address; // x: 경도, y: 위도
				onLocationFound({ lat: y, lng: x });
			} else {
				alert('No results found!');
			}
		} catch (error) {
			console.error('Error fetching location:', error);
			alert('Failed to fetch location.');
		}
	};

	return (
		<div>
			<input type='text' value={address} onChange={(e) => setAddress(e.target.value)} placeholder='지명을 입력하세요' style={{ width: '30vw', height: '1.5vw' }} />
			<button onClick={handleSearch}>Search</button>
		</div>
	);
}
