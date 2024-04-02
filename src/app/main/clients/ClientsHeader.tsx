import Input from '@mui/material/Input';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import Button from '@mui/material/Button';
import NavLinkAdapter from '@fuse/core/NavLinkAdapter';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Box from '@mui/material/Box';

interface IClientsHeader {
	loading: boolean;
	searchFilter: string;
	setSearchFilter: (value: string) => void;
	clientsLength: number;
}

/**
 * The Clients header.
 */
function ClientsHeader(props: IClientsHeader) {
	const { loading, searchFilter, setSearchFilter, clientsLength } = props;

	if (loading) {
		return null;
	}

	return (
		<div className="p-24 sm:p-32 w-full border-b-1">
			<div className="flex flex-col">
				<motion.span
					initial={{ x: -20 }}
					animate={{ x: 0, transition: { delay: 0.2 } }}
				>
					<Typography className="text-24 md:text-32 font-extrabold tracking-tight leading-none">
						Clients
					</Typography>
				</motion.span>
				<motion.span
					initial={{ y: -20, opacity: 0 }}
					animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
				>
					<Typography
						component={motion.span}
						className="text-14 font-medium ml-2"
						color="text.secondary"
					>
						{`${clientsLength} Clients`}
					</Typography>
				</motion.span>
			</div>
			<div className="flex flex-1 items-center mt-16 -mx-8">
				<Box
					component={motion.div}
					initial={{ y: -20, opacity: 0 }}
					animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
					className="flex flex-1 w-full sm:w-auto items-center px-16 mx-8 border-1 rounded-full"
				>
					<FuseSvgIcon
						color="action"
						size={20}
					>
						heroicons-outline:search
					</FuseSvgIcon>

					<Input
						placeholder="Search Clients"
						className="flex flex-1 px-16"
						disableUnderline
						fullWidth
						value={searchFilter}
						onChange={(e) => setSearchFilter(e.target.value)}
						inputProps={{ 'aria-label': 'Search' }}
					/>
				</Box>
				<Button
					className="mx-8"
					variant="contained"
					color="secondary"
					component={NavLinkAdapter}
					to="new/edit"
				>
					<FuseSvgIcon size={20}>heroicons-outline:plus</FuseSvgIcon>
					<span className="hidden sm:flex mx-8">Add</span>
				</Button>
			</div>
		</div>
	);
}

export default ClientsHeader;
