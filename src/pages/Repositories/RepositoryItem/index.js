import React from 'react';
import PropTypes from 'prop-types';

import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import style from './style';

const RepositoryItem = ({repository}) => {
	return (
		<View style={style.container}>
			<Text style={style.title}>{repository.full_name}</Text>

			<View style={style.infoContainer}>
				<View style={style.info}>
					<Icon name="star" size={12} style={style.infoIcon} />
					<Text style={style.infoText}>
						{repository.stargazers_count}
					</Text>
				</View>

				<View style={style.info}>
					<Icon name="code-fork" size={12} style={style.infoIcon} />
					<Text style={style.infoText}>{repository.forks_count}</Text>
				</View>

				<View style={style.info}>
					<Icon name="eye" size={12} style={style.infoIcon} />
					<Text style={style.infoText}>
						{repository.watchers_count}
					</Text>
				</View>
			</View>
		</View>
	);
};

RepositoryItem.propTypes = {
	repository: PropTypes.shape({
		full_name: PropTypes.string,
		stargazers_count: PropTypes.number,
		forks_count: PropTypes.number,
		watchers_count: PropTypes.number,
	}).isRequired,
};

export default RepositoryItem;
