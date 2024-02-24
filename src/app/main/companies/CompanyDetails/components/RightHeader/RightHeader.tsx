import React, { ReactElement } from 'react';
import EditableButtons from 'app/shared-components/EditableButtons/EditableButtons';
import { Button, Stack } from '@mui/material';
import { useCompanyDetail } from '../../../zustand';
import { IRightHeaderProps } from './IRightHeaderProps';

function RightHeader(props: IRightHeaderProps) {
	const { onChangeEditing, isEditing } = useCompanyDetail();
	const { tab, onSaveBasicInformation, onAddAreas } = props;

	const map = {
		1: (
			<EditableButtons
				isEditing={isEditing}
				onEdit={() => onChangeEditing(true)}
				onCancel={() => onChangeEditing(false)}
				onSave={onSaveBasicInformation}
			/>
		),
		2: (
			<Stack>
				<Button
					onClick={onAddAreas}
					color="primary"
					variant="contained"
				>
					Agregar
				</Button>
			</Stack>
		)
	};

	return map[tab] as ReactElement;
}

export default RightHeader;
