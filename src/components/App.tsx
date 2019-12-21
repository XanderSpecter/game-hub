import React, { useEffect } from 'react';

import './styles.less';
import { uploadData } from '../helpers/apiFetch';

const App = () => {

	const uploadUserData = async () => {
		const res = await uploadData('/users/', JSON.stringify({}));

		console.log(res);
	};

	useEffect(() => {
		uploadUserData();
	}, []);

	return (
		<div>
			<h1>Hello World!</h1>
		</div>
	);
};

export default App;