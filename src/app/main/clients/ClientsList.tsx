import { motion } from 'framer-motion';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import FuseLoading from '@fuse/core/FuseLoading';
import { ClientEntity } from 'src/app/shared/entities/ClientsEntities';
import ContactListItem from './ClientListItem';

interface IClientsListProps {
	clients: ClientEntity[];
	loading: boolean;
	searchFilter: string;
}

/**
 * The Clients list.
 */
function ClientsList(props: IClientsListProps) {
	const { clients, loading, searchFilter } = props;

	if (loading) {
		return <FuseLoading />;
	}

	if (clients.length === 0) {
		return (
			<div className="flex flex-1 items-center justify-center h-full">
				<Typography
					color="text.secondary"
					variant="h5"
				>
					There are no Clients!
				</Typography>
			</div>
		);
	}

	function handleFilterClients(items: ClientEntity[], value: string): ClientEntity[] {
		return items.filter((i) => {
			const name = i.name.toLowerCase().includes(value);
			const address = i.address.toLowerCase().includes(value);
			const phone = i.phone.toLowerCase().includes(value);
			return name || address || phone || !value;
		});
	}

	return (
		<motion.div
			initial={{ y: 20, opacity: 0 }}
			animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
			className="flex flex-col flex-auto w-full max-h-full"
		>
			<List className="w-full m-0 p-0">
				{handleFilterClients(clients, searchFilter).map((item: ClientEntity, index: number) => (
					<ContactListItem
						client={item}
						key={index}
					/>
				))}
			</List>
		</motion.div>
	);
}

export default ClientsList;
