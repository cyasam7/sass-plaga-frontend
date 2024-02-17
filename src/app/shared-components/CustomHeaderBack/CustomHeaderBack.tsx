import { Button, IconButton, Stack, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import React from 'react';
import { useNavigate } from 'react-router';

interface ICustomHeaderBackProps {
	backText: string;
	title: string;
	subtitle: string;
}

function CustomHeaderBack(props: ICustomHeaderBackProps) {
	const { backText, title, subtitle } = props;
	const navigate = useNavigate();
	return (
		<div className="px-16 py-36 flex w-full">
			<Stack width="100%">
				<div className="w-full">
					<button
						type="button"
						onClick={() => navigate(-1)}
						className="flex items-center space-x-8"
					>
						<IconButton size="small">
							<ArrowBackIcon sx={{ fontSize: '1.4rem', color: 'black' }} />
						</IconButton>
						<Typography variant="subtitle2">{backText}</Typography>
					</button>
				</div>
				<Stack
					direction="row"
					width="100$"
					justifyContent="space-between"
				>
					<Stack
						mt="4px"
						ml="20px"
						spacing={0.5}
					>
						<Typography variant="h6">{backText}</Typography>
						<Typography variant="subtitle2">{backText}</Typography>
					</Stack>
					<Stack
						direction="row"
						spacing={1}
					>
						<Button
							color="primary"
							variant="outlined"
						>
							Cancelar
						</Button>
						<Button
							color="primary"
							variant="contained"
						>
							Editar
						</Button>
					</Stack>
				</Stack>
			</Stack>
		</div>
	);
}

export default CustomHeaderBack;
