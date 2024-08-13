import React from 'react';
import { useMap } from '../map/MapContext'; // MapContext에서 map 객체를 가져옵니다.
import '../../styles/DownloadMap.css';
export default function DownloadMap() {
	const { map } = useMap(); // 맵 객체를 가져옵니다.

	const downloadMapImage = () => {
		if (!map) {
			alert('지도 정보를 가져올 수 없습니다.');
			return;
		}

		// 지도의 현재 상태를 캡처할 캔버스를 생성합니다.
		const canvas = document.createElement('canvas');
		const size = map.getSize();
		canvas.width = size[0];
		canvas.height = size[1];

		// CanvasRenderingContext2D 객체를 가져옵니다.
		const context = canvas.getContext('2d');

		// 현재 지도의 상태를 캡처하여 캔버스에 그립니다.
		// OpenLayers의 map.getViewport()를 사용하여 현재 보이는 영역을 캡처합니다.
		const mapCanvas = map.getViewport().querySelector('canvas');
		context.drawImage(mapCanvas, 0, 0, canvas.width, canvas.height);

		// 캔버스의 데이터를 URL로 변환합니다.
		const imgData = canvas.toDataURL('image/png');

		// 다운로드 링크를 생성하고 클릭하여 이미지를 다운로드합니다.
		const link = document.createElement('a');
		link.href = imgData;
		link.download = 'map-snapshot.png';
		link.click();
	};

	return (
		<button className='download_btn' onClick={downloadMapImage}>
			지도 이미지 다운로드
		</button>
	);
}
