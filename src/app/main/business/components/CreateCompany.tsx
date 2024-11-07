import { Button, Dialog, DialogContent, DialogTitle, Stack, Typography } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useQueryClient } from 'react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { displayToast } from '@fuse/core/FuseMessage/DisplayToast';
import TextFieldForm from 'app/shared-components/Form/TextFieldForm/TextFieldForm';
import PhoneInputForm from 'app/shared-components/Form/PhoneInputForm/PhoneInputForm';
import { BusinessService } from 'src/app/shared/services/CompanyService';
import { IFormSaveBusiness } from 'src/app/shared/entities/CompanyEntity';
import { ICreateCompanyProps } from './ICreateCompanyProps';
import { schemaCreateCompany } from './schema';

function CreateCompany(props: ICreateCompanyProps) {
	const queryClient = useQueryClient();

	const { open, onClose } = props;
	const formHandler = useForm<IFormSaveBusiness>({
		resolver: yupResolver(schemaCreateCompany),
		defaultValues: {
			name: '',
			contactName: '',
			contactPhone: '',
			address: ''
		}
	});

	async function onSubmit(params: IFormSaveBusiness): Promise<void> {
		await BusinessService.save(params);
		await queryClient.invalidateQueries('business');
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
					<TextFieldForm
						name="name"
						control={formHandler.control}
						variant="standard"
						label="Nombre"
					/>
					<TextFieldForm
						name="contactName"
						control={formHandler.control}
						variant="standard"
						label="Nombre de contacto"
					/>
					<PhoneInputForm
						name="contactPhone"
						control={formHandler.control}
						label="Teléfono"
						fullWidth
						variant="standard"
					/>
					<TextFieldForm
						name="address"
						control={formHandler.control}
						variant="standard"
						label="Dirección"
						multiline
						rows={5}
						maxRows={5}
					/>
				</Stack>
			</DialogContent>
		</Dialog>
	);
}

export default CreateCompany;
