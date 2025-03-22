import { Card, CardHeader, CardContent, List, ListItem, ListItemIcon, ListItemText, IconButton, Button, CardActions, Menu, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions, Typography } from "@mui/material"
import { MoreVert, Phone, Apartment, LocationOn, Person, Delete, Edit } from "@mui/icons-material"
import { useNavigate } from "react-router"
import { useState } from "react"
import { BranchForm } from "../../Forms/BranchForm"
import { Branch } from "../../../types"

interface BranchCardProps {
  branch: Branch
  onMenuClick: (event: React.MouseEvent<HTMLElement>, branchId: string) => void
}

export function BranchCard({ branch, onMenuClick }: BranchCardProps) {
  const navigate = useNavigate()
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null)
  const [selectedBranchId, setSelectedBranchId] = useState<string | null>(null)
  const [showBranchForm, setShowBranchForm] = useState(false)
  const [currentBranch, setCurrentBranch] = useState<Branch | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [branchToDelete, setBranchToDelete] = useState<string | null>(null)

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, branchId: string) => {
    setMenuAnchorEl(event.currentTarget)
    setSelectedBranchId(branchId)
  }

  const handleMenuClose = () => {
    setMenuAnchorEl(null)
    setSelectedBranchId(null)
  }

  const handleDeleteBranch = (branchId: string) => {
    setBranchToDelete(branchId)
    setDeleteConfirmOpen(true)
    handleMenuClose()
  }

  return <>
    <Menu
      anchorEl={menuAnchorEl}
      open={Boolean(menuAnchorEl)}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={() => { }}>
        <Edit sx={{ mr: 1, color: 'primary.main' }} /> Editar
      </MenuItem>
      <MenuItem onClick={() => handleDeleteBranch(branch.id)}>
        <Delete sx={{ mr: 1, color: 'error.main' }} /> Eliminar
      </MenuItem>
    </Menu>
    <Dialog
      open={showBranchForm}
      onClose={() => setShowBranchForm(false)}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>
        {isEditing ? "Editar Sucursal" : "Nueva Sucursal"}
      </DialogTitle>
      <DialogContent>
        <BranchForm
          branch={currentBranch}
          onSave={() => { }}
          onClose={() => {
            setShowBranchForm(false)
          }}
          open={showBranchForm}
          isEditing={isEditing}
        />
      </DialogContent>
    </Dialog>

    <Dialog
      open={deleteConfirmOpen}
      onClose={() => setDeleteConfirmOpen(false)}
    >
      <DialogTitle>Confirmar Eliminación</DialogTitle>
      <DialogContent>
        <Typography>
          ¿Está seguro que desea eliminar esta sucursal?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => setDeleteConfirmOpen(false)}
          color="inherit"
        >
          Cancelar
        </Button>
        <Button
          onClick={() => { }}
          color="error"
          variant="contained"
        >
          Eliminar
        </Button>
      </DialogActions>
    </Dialog>
    <Card>
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
          onClick={() => navigate(`/clients/${branch.clientId}/branches/${branch.id}`)}
          color="primary"
          variant="outlined"
        >
          Ver Detalles
        </Button>
      </CardActions>
    </Card>
  </>
}

