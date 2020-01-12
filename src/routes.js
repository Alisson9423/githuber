import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import Welcome from '~/pages/Welcome';
import Repositories from '~/pages/Repositories';
import Organizations from '~/pages/Organizations';
import {colors} from '~/styles';
import color from './styles/color';
import Icon from 'react-native-vector-icons/FontAwesome';

const persistenceKey = 'persistenceKey';

const Routes = (userlogged = false) =>
	createAppContainer(
		createStackNavigator(
			{
				Welcome,
				User: createBottomTabNavigator(
					{
						Repositories: {
							screen: Repositories,
							navigationOptions: {
								tabBarIcon: ({
									focused,
									horizontal,
									tintColor,
								}) => (
									<Icon
										name="list-alt"
										size={16}
										color={tintColor}
									/>
								),
							},
						},

						Organizations: {
							screen: Organizations,
							navigationOptions: {
								tabBarIcon: ({
									focused,
									horizontal,
									tintColor,
								}) => (
									<Icon
										name="building"
										size={16}
										color={tintColor}
									/>
								),
							},
						},
					},

					{
						tabBarOptions: {
							showIcon: true,
							showLabel: false,
							activeTintColor: colors.white,
							inactiveTintColor: color.whiteTransparent,

							style: {
								backgroundColor: colors.segundary,
								height: 60,
								padding: 0,
								// paddingBottom: 20,
							},
						},
					},
				),
			},

			{
				initialRouteName: userlogged ? 'User' : 'Welcome',
				defaultNavigationOptions: ({navigation}) => ({}),
				header: null,
				headerShown: true,
				headerMode: 'none',
			},
		),
	);

export default Routes;
