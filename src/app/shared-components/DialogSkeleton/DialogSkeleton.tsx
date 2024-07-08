import { Dialog, DialogContent, DialogTitle, Stack } from '@mui/material';
import React from 'react';
import { IDialogSkeletonProps } from './IDialogSkeletonProps';

function DialogSkeleton(props: IDialogSkeletonProps) {
	const { content, header, open, maxWidth } = props;

	return (
		<Dialog
			open={open}
			maxWidth={maxWidth}
		>
			<DialogTitle>{header}</DialogTitle>
			<DialogContent>
				<Stack pt={1}>{content}</Stack>
			</DialogContent>
		</Dialog>
	);
}

export default DialogSkeleton;
