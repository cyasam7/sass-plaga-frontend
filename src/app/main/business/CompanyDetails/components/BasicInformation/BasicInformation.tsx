import { Grid, TextField } from '@mui/material';
import React from 'react';
import { Controller, UseFormReturn } from 'react-hook-form';
import { useCompanyDetail } from '../../../zustand';
import { IFormCompany } from '../../../types';

interface IBasicInformationProps {
	formHandler: UseFormReturn<IFormCompany>;
}

function BasicInformation(props: IBasicInformationProps) {
	const { formHandler } = props;
	const { isEditing } = useCompanyDetail();

	return (
		<Grid
			container
			spacing={5}
		>
			<Grid
				item
				xs={12}
				md={6}
			>
				<Controller
					control={formHandler.control}
					name="name"
					render={({ field }) => (
						<TextField
							{...field}
							disabled={!isEditing}
							fullWidth
							variant="standard"
							label="Nombre"
						/>
					)}
				/>
			</Grid>
			<Grid
				item
				xs={12}
			>
				<Controller
					control={formHandler.control}
					name="address"
					render={({ field }) => (
						<TextField
							{...field}
							disabled={!isEditing}
							fullWidth
							variant="standard"
							label="Direccion"
							multiline
							rows={5}
						/>
					)}
				/>
			</Grid>
		</Grid>
	);
}

export default BasicInformation;
