import FusePageSimple from '@fuse/core/FusePageSimple';
import { styled } from '@mui/material/styles';
import { Container } from '@mui/material';
import { ClientList } from './ClientDetail/ClientList';
import { ClientService } from 'src/app/shared/services/ClientService';
import { useQuery } from 'react-query';
import { FormClientValues } from './Forms/NewClientForm/types';

const Root = styled(FusePageSimple)(({ theme }) => ({
	'& .FusePageSimple-header': {
		backgroundColor: theme.palette.background.paper,
		borderBottomWidth: 1,
		borderStyle: 'solid',
		borderColor: theme.palette.divider
	},
}));

/**
 * The ContactsApp page.
 */
export function ClientsApp() {

	const { data = [], isLoading, refetch } = useQuery({
		queryKey: ["clients"],
		queryFn: () => ClientService.getByQuery()
	})


	async function handleSaveClient(data: FormClientValues, id?: string) {
		await ClientService.save(data, id)
		await refetch()
	}


	async function handleDeleteClient(id: string) {
		await ClientService.remove(id)
		await refetch()
	}

	return (
		<Root
			content={
				<Container sx={{ py: 4, maxWidth: "1400px !important" }}>
					<ClientList clients={data} onSaveClient={handleSaveClient} onDeleteClient={handleDeleteClient} />
				</Container>
			}
		/>
	);
}
