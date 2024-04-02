import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { Box, Typography } from '@mui/material';
import React from 'react';
import { ClientEntity } from 'src/app/shared/entities/OrderEntity';

interface IBasicInfoProps {
	client: ClientEntity;
}

function BasicInfo(props: IBasicInfoProps) {
	const { client } = props;
	return (
		<div className="flex flex-col space-y-32">
			{client?.phone && (
				<div className="flex">
					<FuseSvgIcon>heroicons-outline:phone</FuseSvgIcon>
					<div className="min-w-0 ml-24 space-y-4">
						<div className="flex items-center leading-6">
							<Box
								className="hidden sm:flex w-24 h-16 overflow-hidden"
								sx={{
									background: "url('/assets/images/apps/contacts/flags.png') no-repeat 0 0",
									backgroundSize: '24px 3876px'
								}}
							/>

							<div className="sm:ml-12 font-mono">MX</div>

							<div className="ml-10 font-mono">{client.phone}</div>

							<Typography
								className="text-md truncate"
								color="text.secondary"
							>
								<span className="mx-8">&bull;</span>
								<span className="font-medium">Personal</span>
							</Typography>
						</div>
					</div>
				</div>
			)}
			{client.address && (
				<div className="flex items-center">
					<FuseSvgIcon>heroicons-outline:location-marker</FuseSvgIcon>
					<div className="ml-24 leading-6">{client.address}</div>
				</div>
			)}
		</div>
	);
}

export default BasicInfo;
