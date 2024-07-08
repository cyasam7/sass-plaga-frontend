// ReusableTextField.tsx
import { TextFieldProps } from '@mui/material';
import { Control } from 'react-hook-form';

export type ITextFieldFormProps = {
	name: string;
	control: Control<any>;
	label: string;
} & TextFieldProps;
