import React from 'react';
import { Controller } from 'react-hook-form';
import { TextField } from '@mui/material';
import { ITextFieldFormProps } from './ITextFieldForm';

function TextFieldForm({ name, control, label, ...props }: ITextFieldFormProps) {
	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState: { error } }) => (
				<TextField
					{...field}
					label={label}
					error={!!error}
					helperText={error ? error.message : null}
					{...props}
				/>
			)}
		/>
	);
}

export default TextFieldForm;
