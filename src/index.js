/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import 'react-native-gesture-handler';
import './config/ReactotronConfig';
import './config/devTools';

import createNavigator from './routes';

const App = () => {
	const [userCheck, setUserCheck] = useState(false);
	const [userLogged, setUserLogged] = useState(false);

	async function getUser() {
		const username = await AsyncStorage.getItem('@username');
		setUserLogged(!!username);
	}

	useEffect(() => {
		getUser();
		setUserCheck(true);
	}, [userLogged]);

	if (!userCheck) return null;

	const Routes = createNavigator(userLogged);

	return <Routes />;
};

export default App;
