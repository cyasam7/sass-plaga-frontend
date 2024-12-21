import { Stack, TextField } from '@mui/material';
import DialogSkeleton from 'app/shared-components/DialogSkeleton/DialogSkeleton';
import HeaderDialog from 'app/shared-components/DialogSkeleton/HeaderDialog/HeaderDialog';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useQuery, useQueryClient } from 'react-query';
import { FIELD_REQUIRED } from 'src/app/shared-constants/yupMessages';
import { CatalogType } from 'src/app/shared/entities/CatalogEntities';
import { CatalogService } from 'src/app/shared/services/CatalogService';
import { displayToast } from '@fuse/core/FuseMessage/DisplayToast';
import { translateCatalogs } from '../HeaderCatalogTag/utils';
import { IBasicCatalogDialog, ICatalogForm } from './IBasicCatalogDialog';

function BasicCatalogDialog(props: IBasicCatalogDialog) {
	const { open, type, id, onClose, onSubmit } = props;
	const queryClient = useQueryClient();

	const formHandler = useForm<ICatalogForm>({
		defaultValues: {
			name: ''
		}
	});

	const { data } = useQuery({
		queryKey: ['BasicCatalogDialog', type, id],
		queryFn: () => CatalogService.getCatalogTypeById<CatalogType>({ catalogType: type, id }),
		enabled: !!id && !!type && open
	});

	useEffect(() => {
		if (data) {
			formHandler.reset({ name: (data as { name: string }).name ?? '' });
		}
		return () => {
			formHandler.reset({ name: '' });
		};
	}, [data, type, id]);

	async function onSubmitForm(data: ICatalogForm): Promise<void> {
		await CatalogService.save({ data: { ...data, id }, type });
		queryClient.invalidateQueries();
		handleClose();
		displayToast({
			anchorOrigin: {
				horizontal: 'right',
				vertical: 'top'
			},
			message: 'Se ha guardado correctamente',
			variant: 'success'
		});
		onSubmit?.('');
	}

	function handleClose(): void {
		onClose();
	}

	return (
		<DialogSkeleton
			open={open}
			header={
				<HeaderDialog
					title={`Guardar catalogo ${translateCatalogs(type)}`}
					onClickSecondaryButton={handleClose}
					onClickPrimaryButton={formHandler.handleSubmit(onSubmitForm)}
				/>
			}
			content={
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
			}
			maxWidth="sm"
		/>
	);
}

export default BasicCatalogDialog;
