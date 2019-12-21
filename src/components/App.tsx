import React, { useState, useEffect } from 'react';

import './reset.less';
import './media.less';
import './styles.less';

import { User } from '../models/User';
import { Loader } from './Loader';
import { getCookie } from '../helpers/cookies';
import { authUserById } from '../helpers/api';
import { Auth } from './Auth';

const App = () => {
	const [activeUser, setActiveUser] = useState<User>(null);
	const [isFetching, setIsFetching] = useState<boolean>(true);

	const checkUserAuth = async () => {
		const userIdFromCookies = getCookie('user');

		// if (!userIdFromCookies) {
		// 	setIsFetching(false);

		// 	return;
		// }

		const authResult = await authUserById(userIdFromCookies);

		if (authResult.status === 200 && authResult.user) {
			if (authResult.user.id) {
				setActiveUser(authResult.user);
				setIsFetching(false);
			}
		}
	};

	useEffect(() => {
		checkUserAuth();
	}, []);

	return (
		<>
			<Auth onSuccess={(user: User) => console.log(user)}/>
			{/* {(isFetching && !activeUser) && <Loader />} */}
			{/* {(!isFetching && !activeUser) && <Auth />} */}
		</>
	);
};

export default App;