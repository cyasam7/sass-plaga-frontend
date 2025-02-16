import { StyleSheet } from '@react-pdf/renderer';

export const styles = StyleSheet.create({
	page: {
		backgroundColor: '#ffffff',
		padding: 16
	},
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginBottom: 16
	},
	headerLeft: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	logo: {
		height: 32,
		marginRight: 16
	},
	title: {
		fontWeight: 'bold'
	},
	subTitle: {
		color: '#6b7280',
		fontSize: 12
	},
	normalText: {
		fontSize: 12,
		marginTop: 2
	},
	section: {
		marginBottom: 18
	},
	sectionTitle: {
		fontSize: 14,
		fontWeight: 'bold',
		marginBottom: 8
	},
	text: {
		marginBottom: 4
	},
	boldText: {
		fontSize: 12,
		fontWeight: 'bold'
	},
	grid: {
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'wrap',
		rowGap: 12
	},
	gridItem: {
		width: '50%'
	},
	list: {
		paddingLeft: 16
	},
	listItem: {
		fontSize: 12,
		marginBottom: 4
	},
	border: {
		borderTop: '1px solid #d1d5db',
		paddingTop: 16
	},
	signatureBox: {
		height: 100,
		borderWidth: 1,
		borderColor: '#d1d5db',
		borderRadius: 8
	}
});
