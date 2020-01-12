import {StyleSheet} from 'react-native';
import {colors, metrics} from '~/styles';

const style = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.lighter,
	},

	loading: {
		marginTop: metrics.baseMargin * 2,
	},

	columnWrapperStyle: {
		marginHorizontal: metrics.baseMargin * 2,
		justifyContent: 'space-between',
	},
});

export default style;
