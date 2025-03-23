import React from "react"
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  IconButton,
  Typography,
  Box,
  Chip,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material"
import {
  Business,
  Person,
  MoreVert,
  Email,
  Phone,
  LocationOn,
  ContactMail,
  Work,
} from "@mui/icons-material"
import { ClientCardProps } from "./types"
import { useNavigate } from "react-router"

export const ClientCard: React.FC<ClientCardProps> = ({
  client,
  onMenuOpen,
}) => {
  const isBusiness = client.type === "business"
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
        bgcolor: isBusiness ? "primary.main" : "secondary.main",
      }
    }}>
      <CardHeader
        avatar={
          <Box sx={{ color: isBusiness ? "primary.main" : "secondary.main" }}>
            {isBusiness ? <Business sx={{ fontSize: 40 }} /> : <Person sx={{ fontSize: 40 }} />}
          </Box>
        }
        action={
          <IconButton
            size="small"
            onClick={(e) => onMenuOpen(e, client.id)}
            color={isBusiness ? "primary" : "secondary"}
          >
            <MoreVert />
          </IconButton>
        }
        title={
          <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
            <Typography variant="h6" component="div">
              {client.name}
            </Typography>
            <Chip
              icon={isBusiness ? <Business sx={{ fontSize: 16 }} /> : <Person sx={{ fontSize: 16 }} />}
              label={isBusiness ? "Empresa" : "Persona"}
              size="small"
              color={isBusiness ? "primary" : "secondary"}
              variant="outlined"
              sx={{ height: 24, alignSelf: "flex-start" }}
            />
          </Box>
        }
      />
      <CardContent sx={{ flexGrow: 1, pb: 1 }}>
        <List dense>
          <ListItem>
            <ListItemIcon>
              <Email fontSize="small" color={isBusiness ? "primary" : "secondary"} />
            </ListItemIcon>
            <ListItemText
              primary={client.email || "Sin correo"}
              primaryTypographyProps={{
                sx: { fontWeight: client.email ? "normal" : "light", fontStyle: client.email ? "normal" : "italic" }
              }}
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <Phone fontSize="small" color={isBusiness ? "primary" : "secondary"} />
            </ListItemIcon>
            <ListItemText
              primary={client.phone || "Sin teléfono"}
              primaryTypographyProps={{
                sx: { fontWeight: client.phone ? "normal" : "light", fontStyle: client.phone ? "normal" : "italic" }
              }}
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <LocationOn fontSize="small" color={isBusiness ? "primary" : "secondary"} />
            </ListItemIcon>
            <ListItemText
              primary={client.address || "Sin dirección"}
              primaryTypographyProps={{
                sx: { fontWeight: client.address ? "normal" : "light", fontStyle: client.address ? "normal" : "italic" }
              }}
            />
          </ListItem>

          {client.businessDetails && (
            <>
              <Divider sx={{ my: 1 }} />
              <ListItem>
                <ListItemIcon>
                  <ContactMail fontSize="small" color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary={client.businessDetails.contactPerson || "Sin contacto"}
                  secondary="Persona de contacto"
                  primaryTypographyProps={{
                    sx: {
                      fontWeight: client.businessDetails.contactPerson ? "normal" : "light",
                      fontStyle: client.businessDetails.contactPerson ? "normal" : "italic"
                    }
                  }}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Work fontSize="small" color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary={client.businessDetails.position || "Sin cargo"}
                  secondary="Cargo"
                  primaryTypographyProps={{
                    sx: {
                      fontWeight: client.businessDetails.position ? "normal" : "light",
                      fontStyle: client.businessDetails.position ? "normal" : "italic"
                    }
                  }}
                />
              </ListItem>
            </>
          )}
        </List>
      </CardContent>
      <CardActions sx={{ p: 2, pt: 0 }}>
        <Button
          size="small"
          startIcon={isBusiness ? <Business /> : <Person />}
          onClick={() => navigate(`/clients/${client.id}`)}
          color={isBusiness ? "primary" : "secondary"}
          variant="contained"
          fullWidth
        >
          Ver Detalles
        </Button>
      </CardActions>
    </Card>
  )
}
