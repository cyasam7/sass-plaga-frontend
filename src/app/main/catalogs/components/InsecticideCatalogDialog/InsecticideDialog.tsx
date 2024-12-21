import { Button, Stack } from '@mui/material';
import DialogSkeleton from 'app/shared-components/DialogSkeleton/DialogSkeleton';
import HeaderDialog from 'app/shared-components/DialogSkeleton/HeaderDialog/HeaderDialog';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery, useQueryClient } from 'react-query';
import { ECatalogType, IInsecticide } from 'src/app/shared/entities/CatalogEntities';
import { CatalogService } from 'src/app/shared/services/CatalogService';
import { displayToast } from '@fuse/core/FuseMessage/DisplayToast';
import TextFieldForm from 'app/shared-components/Form/TextFieldForm/TextFieldForm';
import { FIELD_REQUIRED } from 'src/app/shared-constants/yupMessages';
import { yupResolver } from '@hookform/resolvers/yup';
import { translateCatalogs } from '../HeaderCatalogTag/utils';
import {
	defaultValuesInsecticideForm,
	IInsecticideCatalogDialog,
	IInsecticideCatalogForm
} from './IInsecticideCatalogDialog';
import { yupSchemaInsecticideForm } from './yupSchemaInsecticideForm';

function InsecticideCatalogDialog(props: IInsecticideCatalogDialog) {
	const { open, id, onClose, onSubmit } = props;
	const queryClient = useQueryClient();

	const formHandler = useForm<IInsecticideCatalogForm>({
		resolver: yupResolver(yupSchemaInsecticideForm),
		defaultValues: defaultValuesInsecticideForm
	});

	const { data } = useQuery({
		queryKey: ['InsecticideCatalogDialog', ECatalogType.INSECTICIDE, id],
		queryFn: () => CatalogService.getCatalogTypeById<IInsecticide>({ catalogType: ECatalogType.INSECTICIDE, id }),
		enabled: !!id && open
	});

	useEffect(() => {
		if (data) {
			formHandler.reset(data);
		}
		return () => {
			formHandler.reset(defaultValuesInsecticideForm);
		};
	}, [data, id]);

	async function onSubmitForm(data: IInsecticideCatalogForm): Promise<void> {
		const { doses } = data;
		if (!doses.length) {
			formHandler.setError('dose', { message: FIELD_REQUIRED });
			return;
		}

		await CatalogService.save({ data: { ...data, id }, type: ECatalogType.INSECTICIDE });
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
		onSubmit?.(data);
	}

	function handleClose(): void {
		onClose();
	}

	function handleAddDose(): void {
		const dose = formHandler.getValues('dose');

		if (!dose) {
			formHandler.setError('dose', { message: FIELD_REQUIRED });
		} else {
			const doses = formHandler.getValues('doses');
			const newDoses = new Set([...doses, dose]);
			formHandler.setValue('doses', [...newDoses]);
			formHandler.resetField('dose');
		}
	}

	return (
		<DialogSkeleton
			open={open}
			header={
				<HeaderDialog
					title={`Guardar catalogo ${translateCatalogs(ECatalogType.INSECTICIDE)}`}
					onClickSecondaryButton={handleClose}
					onClickPrimaryButton={formHandler.handleSubmit(onSubmitForm)}
				/>
			}
			content={
				<Stack
					py={2}
					spacing={2}
				>
					<TextFieldForm
						control={formHandler.control}
						name="comercialName"
						label="Nombre comercial"
						variant="outlined"
					/>
					<TextFieldForm
						control={formHandler.control}
						name="chemical"
						label="Compuesto químico"
						variant="outlined"
					/>
					<Stack
						width="100%"
						direction="row"
						spacing={2}
						alignItems="center"
					>
						<TextFieldForm
							control={formHandler.control}
							name="dose"
							fullWidth
							label="Dosis"
							variant="outlined"
						/>
						<Button onClick={handleAddDose}>Agregar dosis</Button>
					</Stack>
					<ul>
						{formHandler.watch('doses').map((i, index) => (
							<li key={index}>{i}</li>
						))}
					</ul>
				</Stack>
			}
			maxWidth="sm"
		/>
	);
}

export default InsecticideCatalogDialog;
