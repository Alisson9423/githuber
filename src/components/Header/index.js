import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {withNavigation} from 'react-navigation';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';

import style from './styles';

const Header = ({title, navigation}) => {
	async function sigOut() {
		await AsyncStorage.clear().then(() => console.tron.log('cleared'));
		navigation.navigate('Welcome');
	}

	return (
		<View style={style.container}>
			{/* <StatusBar barStyle="dark-content" /> */}
			<View style={style.left} />
			<Text style={style.title}>{title}</Text>
			<TouchableOpacity onPress={sigOut}>
				<Icon name="exchange" size={16} style={style.icon} />
			</TouchableOpacity>
		</View>
	);
};

Header.propTypes = {
	title: PropTypes.string.isRequired,
	navigation: PropTypes.shape({
		navigate: PropTypes.func,
	}).isRequired,
};

export default withNavigation(Header);
