import React, {useEffect, useState} from 'react';

import {View, Text, ActivityIndicator, FlatList} from 'react-native';
import Header from '~/components/Header';
import api from '~/services/api';
import AsyncStorage from '@react-native-community/async-storage';

import OrganizationsItem from './organizationsItem/index';
import style from './style';

const Organizations = props => {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [refreshing, setRefreshing] = useState(true);
	const [reload, setReload] = useState('');
	useEffect(() => {
		loadingOrganizations();
	}, []);

	async function loadingOrganizations() {
		const username = await AsyncStorage.getItem('@username');
		console.tron.log(username);
		const {data} = await api.get(`/users/${username}/orgs`);
		setLoading(false);
		setRefreshing(false);
		setData(data);
	}

	function renderListItem({item}) {
		return <OrganizationsItem organization={item} />;
	}

	function renderList() {
		return (
			<FlatList
				data={data}
				keyExtractor={item => String(item.id)}
				renderItem={renderListItem}
				onRefresh={loadingOrganizations}
				numColumns={2}
				columnWrapperStyle={style.columnWrapperStyle}
				refreshing={refreshing}
			/>
		);
	}

	return (
		<View style={style.container}>
			<Header title="Organizations" />

			{loading ? (
				<ActivityIndicator style={style.loading} />
			) : (
				renderList()
			)}
		</View>
	);
};

export default Organizations;
