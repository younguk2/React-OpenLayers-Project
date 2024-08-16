import React, { useEffect, useState } from 'react';

export default function InnerMap() {
	const [count, setCount] = useState(0);

	const counter = (count) => {
		setCount(count + 1);
		if (1 == 1) {
			console.log('haha');
		}
	};

	useEffect(() => {}, [count]);
	return (
		<div className='youarelucky'>
			<div>you want prize? I'll give special present if count is 1000000000000000000 : {count}</div>
			<button onClick={() => counter(count)} style={{ width: '4vw', height: '3vw' }}>
				up
			</button>
		</div>
	);
}
