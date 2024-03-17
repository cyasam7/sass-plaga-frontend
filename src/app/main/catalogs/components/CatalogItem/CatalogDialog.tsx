import { Button, Dialog, DialogContent, DialogTitle, Stack, TextField, Typography } from '@mui/material';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { FIELD_REQUIRED } from 'src/app/shared-constants/yupMessages';
import { CatalogsService } from '../../service/catalogs.service';

interface ICatalogForm {
	name: string;
}

interface ICatalogDialog {
	open: boolean;
	route: string;
	onClose: () => void;
	onSubmit?: (id: string) => Promise<void> | void;
	id?: string;
}

function CatalogDialog(props: ICatalogDialog) {
	const { open, route, id, onClose, onSubmit } = props;

	const formHandler = useForm<ICatalogForm>({
		defaultValues: {
			name: ''
		}
	});

	const { data } = useQuery({
		queryKey: ['CatalogDialog', route, id],
		queryFn: () => CatalogsService.getById(route, id),
		enabled: !!id && !!route
	});

	useEffect(() => {
		if (data) {
			formHandler.reset({
				name: data.name
			});
		}
		return () => {
			formHandler.reset({
				name: ''
			});
		};
	}, [data]);

	async function onSubmitForm(data: ICatalogForm): Promise<void> {
		await CatalogsService.save(route, { id, ...data });
		handleClose();
		onSubmit?.('');
	}

	function handleClose(): void {
		onClose();
		formHandler.reset({
			name: ''
		});
	}

	return (
		<Dialog
			open={open}
			fullWidth
			maxWidth="sm"
		>
			<DialogTitle>
				<Stack
					direction="row"
					justifyContent="space-between"
					alignItems="center"
				>
					<Typography variant="h6">Guardar catalogo</Typography>
					<Stack
						direction="row"
						justifyContent="space-between"
						alignItems="center"
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
							onClick={formHandler.handleSubmit(onSubmitForm)}
						>
							Guardar
						</Button>
					</Stack>
				</Stack>
			</DialogTitle>
			<DialogContent>
				<Stack py={2}>
					<Controller
						control={formHandler.control}
						name="name"
						rules={{
							required: {
								message: FIELD_REQUIRED,
								value: true
							}
						}}
						render={({ field, fieldState }) => (
							<TextField
								{...field}
								label="Nombre"
								variant="standard"
								error={!!fieldState.error}
								helperText={fieldState.error?.message}
							/>
						)}
					/>
				</Stack>
			</DialogContent>
		</Dialog>
	);
}

export default CatalogDialog;
