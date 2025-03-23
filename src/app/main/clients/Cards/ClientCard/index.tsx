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
  Stack,
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
  ArrowForward,
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
          <Stack direction="row" spacing={1} alignItems="center">
            <Chip
              icon={isBusiness ? <Business sx={{ fontSize: 16 }} /> : <Person sx={{ fontSize: 16 }} />}
              label={isBusiness ? "Empresa" : "Persona"}
              size="small"
              color={isBusiness ? "primary" : "secondary"}
              variant="outlined"
              sx={{
                height: 24,
                '& .MuiChip-label': {
                  px: 1
                }
              }}
            />
            <IconButton
              size="small"
              onClick={(e) => onMenuOpen(e, client.id)}
              color={isBusiness ? "primary" : "secondary"}
            >
              <MoreVert />
            </IconButton>
          </Stack>
        }
        title={
          <Typography variant="h6" component="div">
            {client.name}
          </Typography>
        }
      />
      <CardContent sx={{ flexGrow: 1, pb: 1 }}>
        <List dense>
          {client.email && (
            <ListItem>
              <ListItemIcon>
                <Email fontSize="small" color={isBusiness ? "primary" : "secondary"} />
              </ListItemIcon>
              <ListItemText
                primary={client.email}
                primaryTypographyProps={{
                  sx: { fontWeight: "normal" }
                }}
              />
            </ListItem>
          )}
          {client.phone && (
            <ListItem>
              <ListItemIcon>
                <Phone fontSize="small" color={isBusiness ? "primary" : "secondary"} />
              </ListItemIcon>
              <ListItemText
                primary={client.phone}
                primaryTypographyProps={{
                  sx: { fontWeight: "normal" }
                }}
              />
            </ListItem>
          )}
          {client.address && (
            <ListItem>
              <ListItemIcon>
                <LocationOn fontSize="small" color={isBusiness ? "primary" : "secondary"} />
              </ListItemIcon>
              <ListItemText
                primary={client.address}
                primaryTypographyProps={{
                  sx: { fontWeight: "normal" }
                }}
              />
            </ListItem>
          )}

          {client.businessDetails && (
            <>
              <Divider sx={{ my: 1 }} />
              {client.businessDetails.contactPerson && (
                <ListItem>
                  <ListItemIcon>
                    <ContactMail fontSize="small" color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary={client.businessDetails.contactPerson}
                    secondary="Persona de contacto"
                    primaryTypographyProps={{
                      sx: { fontWeight: "normal" }
                    }}
                  />
                </ListItem>
              )}
              {client.businessDetails.position && (
                <ListItem>
                  <ListItemIcon>
                    <Work fontSize="small" color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary={client.businessDetails.position}
                    secondary="Cargo"
                    primaryTypographyProps={{
                      sx: { fontWeight: "normal" }
                    }}
                  />
                </ListItem>
              )}
            </>
          )}
        </List>
      </CardContent>
      <CardActions sx={{ p: 2, pt: 0 }}>
        <Button
          size="small"
          endIcon={<ArrowForward />}
          onClick={() => navigate(`/clients/${client.id}`)}
          color={isBusiness ? "primary" : "secondary"}
          variant="contained"
          fullWidth
        >
          {isBusiness ? "Ver Sucursales" : "Ver Detalles"}
        </Button>
      </CardActions>
    </Card>
  )
}
