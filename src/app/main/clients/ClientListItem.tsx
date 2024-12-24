import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import NavLinkAdapter from '@fuse/core/NavLinkAdapter';
import ListItemButton from '@mui/material/ListItemButton';
import { ClientEntity } from 'src/app/shared/entities/ClientsEntities';

interface IContactListItemProps {
	client: ClientEntity;
}

/**
 * The client list item.
 */
function ContactListItem(props: IContactListItemProps) {
	const { client } = props;

	return (
		<>
			<ListItemButton
				className="px-32 py-16"
				sx={{ bgcolor: 'background.paper' }}
				component={NavLinkAdapter}
				to={`/clients/${client.id}`}
			>
				<ListItemAvatar>
					<Avatar>{client.name[0]}</Avatar>
				</ListItemAvatar>
				<ListItemText
					classes={{ root: 'm-0', primary: 'font-medium leading-5 truncate' }}
					primary={client.name}
					secondary={
						<Typography
							className="inline"
							component="span"
							variant="body2"
							color="text.secondary"
						>
							{client.address}
						</Typography>
					}
				/>
			</ListItemButton>
			<Divider />
		</>
	);
}

export default ContactListItem;
