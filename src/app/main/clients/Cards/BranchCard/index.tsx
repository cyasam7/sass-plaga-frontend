import { Card, CardHeader, CardContent, List, ListItem, ListItemIcon, ListItemText, IconButton, Button, CardActions, Menu, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions, Typography, Box, Chip } from "@mui/material"
import { MoreVert, Phone, Apartment, LocationOn, Person, Store, Business } from "@mui/icons-material"
import { useNavigate } from "react-router"
import { BranchCardProps } from "./types"

export function BranchCard({ branch, onMenuClick }: BranchCardProps) {
  const navigate = useNavigate()

  return (
    <Card sx={{
      height: "100%",
      display: "flex",
      flexDirection: "column",
      position: "relative",
      background: "linear-gradient(to bottom, rgba(25, 118, 210, 0.05), transparent)",
      "&:hover": {
        boxShadow: 6,
        background: "linear-gradient(to bottom, rgba(25, 118, 210, 0.08), transparent)",
      },
      "&:before": {
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: "4px",
        bgcolor: "primary.main",
      }
    }}>
      <CardHeader
        avatar={
          <Store sx={{ color: "primary.main", fontSize: 40 }} />
        }
        title={
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography variant="h6" component="div">
              {branch.name}
            </Typography>
            <Chip
              icon={<Business sx={{ fontSize: 16 }} />}
              label="Sucursal"
              size="small"
              color="primary"
              variant="outlined"
              sx={{ height: 24 }}
            />
          </Box>
        }
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
      <CardContent sx={{ flexGrow: 1, pb: 1 }}>
        <List dense>
          <ListItem>
            <ListItemIcon>
              <LocationOn fontSize="small" color="primary" />
            </ListItemIcon>
            <ListItemText
              primary={branch.address || "Sin dirección"}
              primaryTypographyProps={{
                sx: { fontWeight: branch.address ? "normal" : "light", fontStyle: branch.address ? "normal" : "italic" }
              }}
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <Person fontSize="small" color="primary" />
            </ListItemIcon>
            <ListItemText
              primary={branch.contactPerson || "Sin contacto"}
              secondary="Contacto"
              primaryTypographyProps={{
                sx: { fontWeight: branch.contactPerson ? "normal" : "light", fontStyle: branch.contactPerson ? "normal" : "italic" }
              }}
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <Phone fontSize="small" color="primary" />
            </ListItemIcon>
            <ListItemText
              primary={branch.contactPhone || "Sin teléfono"}
              primaryTypographyProps={{
                sx: { fontWeight: branch.contactPhone ? "normal" : "light", fontStyle: branch.contactPhone ? "normal" : "italic" }
              }}
            />
          </ListItem>
        </List>
      </CardContent>
      <CardActions sx={{ p: 2, pt: 0 }}>
        <Button
          size="small"
          startIcon={<Apartment />}
          onClick={() => navigate(`/clients/${branch.clientId}/branches/${branch.id}`)}
          color="primary"
          variant="contained"
          fullWidth
        >
          Ver Detalles
        </Button>
      </CardActions>
    </Card>
  )
}

