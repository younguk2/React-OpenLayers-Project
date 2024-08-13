import React from 'react';
import { useMap } from '../map/MapPrimeContext';
import '../../styles/DownloadMap.css';

export default function DownloadMapPrime() {
	const { map } = useMap();

	const downloadMapImage = () => {
		if (!map) {
			alert('지도 정보를 가져올 수 없습니다.');
			return;
		}

		const size = map.getSize();
		const canvas = document.createElement('canvas');
		canvas.width = size[0];
		canvas.height = size[1];
		const context = canvas.getContext('2d');

		// 맵이 렌더링 완료될 때까지 대기
		map.once('rendercomplete', () => {
			// 모든 레이어를 캔버스에 그리기
			const mapCanvas = map.getViewport().querySelector('canvas');
			if (mapCanvas) {
				context.drawImage(mapCanvas, 0, 0, canvas.width, canvas.height);
			}

			// 캔버스의 데이터를 URL로 변환합니다.
			const imgData = canvas.toDataURL('image/png');

			// 다운로드 링크를 생성하고 클릭하여 이미지를 다운로드합니다.
			const link = document.createElement('a');
			link.href = imgData;
			link.download = 'map-snapshot.png';
			link.click();
		});

		// 지도 강제 렌더링
		map.renderSync();
	};

	return (
		<button className='download_btn' onClick={downloadMapImage}>
			지도 이미지 다운로드
		</button>
	);
}
