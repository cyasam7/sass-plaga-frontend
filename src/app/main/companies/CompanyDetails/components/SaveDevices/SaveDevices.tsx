import { Stack, Typography } from '@mui/material';
import DialogSkeleton from 'app/shared-components/DialogSkeleton/DialogSkeleton';
import TextFieldForm from 'app/shared-components/Form/TextFieldForm/TextFieldForm';
import React from 'react';
import { useForm } from 'react-hook-form';
import HeaderDialog from 'app/shared-components/DialogSkeleton/HeaderDialog/HeaderDialog';
import { AxiosFetcher } from 'src/app/shared/fetcher';
import { displayToast } from '@fuse/core/FuseMessage/DisplayToast';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { IFormDevices, TypeDevice } from '../../../types';

type Props = {
	isOpen: boolean;
	onClose: () => void;
	onSubmit?: () => void;
	areaId: string;
	companyId: string;
};

type TypeArray = Array<{
	type: TypeDevice;
}>;

function SaveDevices(props: Props) {
	const { isOpen, onClose, areaId, companyId, onSubmit } = props;

	const formHandler = useForm<IFormDevices>({
		resolver: yupResolver(
			yup.object({
				rodents: yup.number().required(),
				crawling: yup.number().required(),
				flyers: yup.number().required()
			})
		),
		defaultValues: {
			rodents: 0,
			crawling: 0,
			flyers: 0
		}
	});

	const { crawling, flyers, rodents } = formHandler.watch();
	const totalDevices = crawling + flyers + rodents;

	async function handleSubmit(form: IFormDevices): Promise<void> {
		const { crawling, flyers, rodents } = form;

		const crawlingArray = new Array(crawling).fill({ type: TypeDevice.CRAWLING }) as TypeArray;
		const flyersArray = new Array(flyers).fill({ type: TypeDevice.FLYERS }) as TypeArray;
		const rodentsArray = new Array(rodents).fill({ type: TypeDevice.RODENTS }) as TypeArray;

		const allStations = [...rodentsArray, ...crawlingArray, ...flyersArray];

		const stationsFormatted = allStations.map((i, index) => ({ ...i, numberStation: index + 1 }));

		await AxiosFetcher({
			url: '/device/create-multiple',
			method: 'POST',
			data: {
				stations: stationsFormatted,
				areaId,
				companyId
			}
		});
		onSubmit?.();
		formHandler.reset();
		onClose();
		displayToast({
			anchorOrigin: {
				horizontal: 'right',
				vertical: 'top'
			},
			autoHideDuration: 2000,
			message: 'Se han creado dispositivos correctamente',
			variant: 'success'
		});
	}

	return (
		<DialogSkeleton
			open={isOpen}
			header={
				<HeaderDialog
					title="Guardar dispositivos"
					onClickSecondaryButton={onClose}
					onClickPrimaryButton={formHandler.handleSubmit(handleSubmit)}
				/>
			}
			content={
				<Stack spacing={2}>
					<Stack spacing={2}>
						<TextFieldForm
							control={formHandler.control}
							name="rodents"
							label="Roedores"
							type="number"
						/>
						<TextFieldForm
							control={formHandler.control}
							name="crawling"
							label="Rastreros"
							type="number"
						/>
						<TextFieldForm
							control={formHandler.control}
							name="flyers"
							label="Voladores"
							type="number"
						/>
					</Stack>
					<Typography variant="h6">{`${totalDevices} de dispositivos serán agregados`}</Typography>
				</Stack>
			}
			maxWidth="sm"
		/>
	);
}

export default SaveDevices;
