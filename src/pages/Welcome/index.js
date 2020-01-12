import React, {useEffect, useState} from 'react';
import api from '~/services/api';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-community/async-storage';
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	StatusBar,
	ActivityIndicator,
} from 'react-native';

import style from './styles';

const Welcome = props => {
	const [userName, setUserName] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);

	async function checkUserExist(username) {
		const user = await api.get(`/users/${username}`);
		return user;
	}

	async function saveUser(username) {
		try {
			await AsyncStorage.setItem('@username', username);
		} catch (error) {
			console.tron.log(error);
		}
	}

	async function sigIn() {
		const {navigation} = props;

		setLoading(true);

		try {
			await checkUserExist(userName);
			await saveUser(userName);
			navigation.navigate('User');
		} catch (error) {
			setLoading(false);
			setError(true);
		}
	}

	return (
		<View style={style.container}>
			<StatusBar
				barStyle="dark-content"
				backgroundColor="white"
				color="black"
			/>
			<Text style={style.title}>Bem-Vindo </Text>
			<Text style={style.text}>
				Para Continuar precisamosque vc informe seu usuário no Github.
			</Text>

			{error && <Text style={style.error}>Usuário inexistente</Text>}

			<View style={style.form}>
				<TextInput
					style={style.input}
					autoCapitalize="none"
					autoCorrect={false}
					placeholder="Digite seu Usuário"
					value={userName}
					onChangeText={text => setUserName(text)}
					underlineColorAndroid="transparent"
				/>

				<TouchableOpacity style={style.button} onPress={sigIn}>
					{loading ? (
						<ActivityIndicator size="small" color="#FFF" />
					) : (
						<Text style={style.buttonText}>Proseguir</Text>
					)}
				</TouchableOpacity>
			</View>
		</View>
	);
};

Welcome.propTypes = {
	navigation: PropTypes.shape({
		navigate: PropTypes.func,
	}).isRequired,
};

export default Welcome;
