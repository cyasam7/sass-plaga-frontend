import { TablePagination } from '@mui/material';
import React from 'react';

export interface ICustomPaginationProps {
	page: number;
	rowsPerPage: number;
	onPageChange: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, page: number) => void;
	onRowsPerPageChange: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
}

function CustomPagination(props: ICustomPaginationProps): React.ReactElement {
	const { page, onPageChange, rowsPerPage, onRowsPerPageChange } = props;
	return (
		<TablePagination
			component="div"
			count={100}
			page={page}
			onPageChange={onPageChange}
			rowsPerPage={rowsPerPage}
			onRowsPerPageChange={onRowsPerPageChange}
		/>
	);
}

export default CustomPagination;
