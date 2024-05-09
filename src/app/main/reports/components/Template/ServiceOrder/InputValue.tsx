import { Text, View } from '@react-pdf/renderer';
import React from 'react';
import { mainColorPdf } from '../colors';

interface IInputValue {
	displayName: string;
	value: string;
}

function InputValue(props: IInputValue) {
	const { displayName, value } = props;
	return (
		<View
			style={{
				flexDirection: 'row',
				justifyContent: 'space-between',
				gap: '12px'
			}}
		>
			<Text style={{ fontSize: '10px', color: mainColorPdf }}>{displayName}:</Text>
			<Text style={{ fontSize: '10px' }}>{value}</Text>
		</View>
	);
}

export default InputValue;
