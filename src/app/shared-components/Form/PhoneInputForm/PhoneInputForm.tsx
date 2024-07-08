// ReusableTextField.tsx
import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import { PhoneInput } from 'app/shared-components/PhoneInput/PhoneInput';
import { PhoneInputFormProps } from './IPhoneInputForm';

function PhoneInputForm({ name, control, label, ...props }: PhoneInputFormProps) {
	const [Error, setError] = useState('');

	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState: { error } }) => (
				<PhoneInput
					{...field}
					{...props}
					onErrorChange={setError}
					label={label}
					error={!!error || !!Error}
					helperText={error?.message || Error}
				/>
			)}
		/>
	);
}

export default PhoneInputForm;
