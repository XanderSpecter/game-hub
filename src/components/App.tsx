import React, { useState, useEffect } from 'react';

import './reset.less';
import './media.less';
import './styles.less';

import { User } from '../models/User';
import { Loader } from './Loader';
import { getCookie, deleteCookie } from '../helpers/cookies';
import { authUserById } from '../helpers/api';
import { Auth } from './Auth';
import { Games } from './Games';

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

	const onLogOut = () => {
		deleteCookie('user');
		setActiveUser(null);
	};

	useEffect(() => {
		checkUserAuth();
	}, []);

	return (
		<>
			{/* {(isFetching && !activeUser) && <Loader />} */}
			{/* {(!isFetching && !activeUser) && <Auth onSuccess={(user: User) => setActiveUser(user)} />} */}
			<Games user={{
				name: 'ololo',
				password: '123',
				id: '4',
			}} onLogOut={onLogOut}/>
		</>
	);
};

export default App;