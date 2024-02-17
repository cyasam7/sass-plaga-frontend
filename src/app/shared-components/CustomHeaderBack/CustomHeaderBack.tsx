import { Box, Button, IconButton, Stack, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router';
import clsx from 'clsx';
import { ICustomHeaderBackProps } from './ICustomHeaderBackProps';

function CustomHeaderBack(props: ICustomHeaderBackProps) {
	const { backText, title, subtitle } = props;
	const navigate = useNavigate();
	return (
		<div className="px-16 py-36 flex w-full">
			<Stack width="100%">
				<div className="w-full">
					<Box
						component="div"
						onClick={() => navigate(-1)}
						className="flex items-center space-x-8 cursor-pointer"
					>
						<IconButton size="small">
							<ArrowBackIcon sx={{ fontSize: '1.4rem', color: 'black' }} />
						</IconButton>
						<Typography className={clsx('font-medium')}>{backText}</Typography>
					</Box>
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
						<Typography
							variant="body1"
							className={clsx('font-medium text-16 sm:text-20')}
						>
							{title}
						</Typography>
						<Typography
							className={clsx('font-medium')}
							variant="caption"
						>
							{subtitle}
						</Typography>
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
