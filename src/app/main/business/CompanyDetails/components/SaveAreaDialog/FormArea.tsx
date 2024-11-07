import React from 'react';
import { Controller } from 'react-hook-form';
import { Stack, TextField } from '@mui/material';
import { IFormAreaProps } from './types';

function FormArea(props: IFormAreaProps) {
	const { formHandler } = props;

	const { control } = formHandler;

	return (
		<Stack>
			<Controller
				control={control}
				name="name"
				rules={{
					required: {
						value: true,
						message: 'Campo requerido'
					}
				}}
				render={({ field }) => (
					<TextField
						{...field}
						variant="standard"
						label="Nombre"
					/>
				)}
			/>
		</Stack>
	);
}

export default FormArea;
