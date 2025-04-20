import FusePageSimple from '@fuse/core/FusePageSimple';
import { useTranslation } from 'react-i18next';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { useWebSocket } from 'src/app/shared-hooks/useWebSocket';
import { Button } from '@mui/material';
import { useQuery } from 'react-query';
import { MembershipService } from 'src/app/shared/services/MembershipService';

const Root = styled(FusePageSimple)(({ theme }) => ({
	'& .FusePageSimple-header': {
		backgroundColor: theme.palette.background.paper,
		borderBottomWidth: 1,
		borderStyle: 'solid',
		borderColor: theme.palette.divider
	},
	'& .FusePageSimple-content': {},
	'& .FusePageSimple-sidebarHeader': {},
	'& .FusePageSimple-sidebarContent': {}
}));

function Example() {
	const { t } = useTranslation('examplePage');

	const { data, isLoading } = useQuery({
		queryKey: ['memberships'],
		queryFn: () => MembershipService.getAll()
	});

	console.log(data)


	return (
		<Root
			header={
				<div className="p-24">
					<h4>{t('TITLE')}</h4>
				</div>
			}
			content={
				<div className="p-24">
					{data?.map((membership) => (
						<div key={membership.id}>
							<h4>{membership.owner}</h4>
							<p>{membership.ownerEmail}</p>
							<p>{membership.tenantName}</p>
							<p>{membership.type}</p>
						</div>
					))}
				</div>
			}
		/>
	);
}

export default Example;
