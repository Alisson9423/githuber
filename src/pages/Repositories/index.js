import React, {useEffect, useState} from 'react';

import {View, Text, ActivityIndicator, FlatList} from 'react-native';
import Header from '~/components/Header';
import api from '~/services/api';
import AsyncStorage from '@react-native-community/async-storage';

import RepositoryItem from './RepositoryItem';
import style from './style';

const Repositories = props => {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [refreshing, setRefreshing] = useState(false);

	useEffect(() => {
		getRepositores();
	}, []);

	function getRepositores() {
		// const username = await AsyncStorage.getItem('@username');
		// const {data} = await api.get(`/users/${username}/repos`);
		// setLoading(false);
		// setData(data);

		loadingRepositories();
	}

	async function loadingRepositories() {
		setRefreshing(true);
		const username = await AsyncStorage.getItem('@username');
		const {data} = await api.get(`/users/${username}/repos`);
		setLoading(false);
		setRefreshing(false);
		setData(data);
	}

	function renderListItem({item}) {
		return <RepositoryItem repository={item} />;
	}

	function renderList() {
		return (
			<FlatList
				data={data}
				keyExtractor={item => String(item.id)}
				renderItem={renderListItem}
				onRefresh={loadingRepositories}
				refreshing={refreshing}
			/>
		);
	}

	return (
		<View style={style.container}>
			<Header title="Repositorios" />

			{loading ? (
				<ActivityIndicator style={style.loading} />
			) : (
				renderList()
			)}
		</View>
	);
};

export default Repositories;
