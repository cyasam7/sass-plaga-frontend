import { Button, Dialog, DialogContent, DialogTitle, Stack, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useQueryClient } from 'react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { displayToast } from '@fuse/core/FuseMessage/DisplayToast';
import { ICreateCompanyProps } from './ICreateCompanyProps';
import { schemaCreateCompany } from './schema';

function CreateCompany(props: ICreateCompanyProps) {
	const queryClient = useQueryClient();

	const { open, onClose } = props;
	const formHandler = useForm({
		resolver: yupResolver(schemaCreateCompany),
		defaultValues: {
			name: '',
			address: ''
		}
	});

	async function onSubmit(params: { name: string; address: string }): Promise<void> {
		await axios.post('company', params);
		await queryClient.invalidateQueries('companies');
		displayToast({
			message: 'Se creo correctamente el registro',
			anchorOrigin: {
				horizontal: 'right',
				vertical: 'top'
			},
			autoHideDuration: 4000,
			variant: 'success'
		});
		formHandler.reset();
		onClose();
	}

	function handleClose(): void {
		formHandler.reset();
		onClose();
	}

	return (
		<Dialog
			open={open}
			maxWidth="md"
			fullWidth
		>
			<DialogTitle>
				<Stack
					direction="row"
					alignItems="center"
					justifyContent="space-between"
				>
					<Typography variant="h6">Guardar compañia</Typography>
					<Stack
						direction="row"
						alignItems="center"
						justifyContent="space-between"
						spacing={2}
					>
						<Button
							color="primary"
							variant="outlined"
							onClick={handleClose}
						>
							Cancelar
						</Button>
						<Button
							color="primary"
							variant="contained"
							onClick={formHandler.handleSubmit(onSubmit)}
						>
							Guardar
						</Button>
					</Stack>
				</Stack>
			</DialogTitle>
			<DialogContent>
				<Stack spacing={2}>
					<Controller
						control={formHandler.control}
						name="name"
						render={({ field, fieldState }) => (
							<TextField
								{...field}
								variant="standard"
								label="Nombre"
								error={!!fieldState.error}
								helperText={fieldState.error?.message && fieldState.error?.message}
							/>
						)}
					/>
					<Controller
						control={formHandler.control}
						name="address"
						render={({ field, fieldState }) => (
							<TextField
								{...field}
								variant="standard"
								label="Dirección"
								multiline
								rows={5}
								maxRows={5}
								error={!!fieldState.error}
								helperText={fieldState.error?.message && fieldState.error?.message}
							/>
						)}
					/>
				</Stack>
			</DialogContent>
		</Dialog>
	);
}

export default CreateCompany;
