import { Card, CardHeader, CardContent, List, ListItem, ListItemIcon, ListItemText, IconButton, Button, CardActions } from "@mui/material"
import { MoreVert, Phone, Apartment, LocationOn, Person } from "@mui/icons-material"
import { Branch } from "../types"

interface BranchCardProps {
  branch: Branch
  onMenuClick: (event: React.MouseEvent<HTMLElement>, branchId: string) => void
  onBranchClick: (branchId: string) => void
}

export function BranchCard({ branch, onMenuClick, onBranchClick }: BranchCardProps) {
  return <Card>
    <CardHeader
      title={branch.name}
      action={
        <IconButton
          size="small"
          onClick={(event) => onMenuClick(event, branch.id)}
          color="primary"
        >
          <MoreVert />
        </IconButton>
      }
    />
    <CardContent>
      <List dense>
        <ListItem>
          <ListItemIcon>
            <LocationOn fontSize="small" color="primary" />
          </ListItemIcon>
          <ListItemText primary={branch.address} />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <Person fontSize="small" color="primary" />
          </ListItemIcon>
          <ListItemText
            primary={branch.contactPerson}
            secondary="Contacto"
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <Phone fontSize="small" color="primary" />
          </ListItemIcon>
          <ListItemText primary={branch.contactPhone} />
        </ListItem>
      </List>
    </CardContent>
    <CardActions>
      <Button
        size="small"
        startIcon={<Apartment />}
        onClick={() => onBranchClick(branch.id)}
        color="primary"
        variant="outlined"
      >
        Ver Detalles
      </Button>
    </CardActions>
  </Card>
}

