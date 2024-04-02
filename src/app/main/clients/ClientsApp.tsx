import FusePageSimple from '@fuse/core/FusePageSimple';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import { useQuery } from 'react-query';
import ContactsHeader from './ClientsHeader';
import ContactsList from './ClientsList';
import ContactsSidebarContent from './ClientsSidebarContent';
import { CatalogService } from '../../shared/services/CatalogService';

const Root = styled(FusePageSimple)(({ theme }) => ({
	'& .FusePageSimple-header': {
		backgroundColor: theme.palette.background.paper
	}
}));

/**
 * The ContactsApp page.
 */
function ContactsApp() {
	const pageLayout = useRef(null);
	const routeParams = useParams();
	const [rightSidebarOpen, setRightSidebarOpen] = useState(false);
	const [searchFilter, setSearchFilter] = useState('');
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));

	const { data, isLoading } = useQuery({
		queryKey: ['ContactsHeader'],
		queryFn: () => CatalogService.getClientsBy({})
	});

	useEffect(() => {
		setRightSidebarOpen(Boolean(routeParams.id));
	}, [routeParams]);

	return (
		<Root
			header={
				<ContactsHeader
					loading={isLoading}
					searchFilter={searchFilter}
					setSearchFilter={setSearchFilter}
				/>
			}
			content={
				<ContactsList
					clients={data?.payload ?? []}
					loading={isLoading}
					searchFilter={searchFilter}
				/>
			}
			ref={pageLayout}
			rightSidebarContent={<ContactsSidebarContent />}
			rightSidebarOpen={rightSidebarOpen}
			rightSidebarOnClose={() => setRightSidebarOpen(false)}
			rightSidebarWidth={640}
			rightSidebarVariant="temporary"
			scroll={isMobile ? 'normal' : 'content'}
		/>
	);
}

export default ContactsApp;
