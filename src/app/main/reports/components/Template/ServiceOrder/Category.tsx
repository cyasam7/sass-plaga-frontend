import { Text, View } from '@react-pdf/renderer';
import React, { ReactElement } from 'react';
import { mainColorPdf } from '../colors';

interface ICategory {
	title: string;
	element: ReactElement;
}

function Category(props: ICategory) {
	const { title, element } = props;
	return (
		<View>
			<View
				style={{
					backgroundColor: mainColorPdf,
					height: '35px',
					justifyContent: 'center',
					paddingHorizontal: '8px'
				}}
			>
				<Text style={{ color: '#fff', fontSize: '12px' }}>{title}</Text>
			</View>
			<View style={{ paddingVertical: '8px' }}>{element}</View>
		</View>
	);
}

export default Category;
