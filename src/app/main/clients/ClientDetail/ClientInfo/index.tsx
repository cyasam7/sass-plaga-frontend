import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  Paper,
} from "@mui/material"
import {
  Business,
  Person,
  LocationOn,
  Email,
  Phone,
  CalendarMonth,
} from "@mui/icons-material"
import { Client } from "../../types"

interface ClientInfoProps {
  client: Client
}

export function ClientInfo({ client }: ClientInfoProps) {
  return (
    <Paper sx={{ p: 3, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box sx={{
            display: "flex",
            alignItems: "center",
            mb: 3,
            p: 2,
            bgcolor: client.type === "business" ? "primary.light" : "secondary.light",
            borderRadius: 1,
            color: client.type === "business" ? "primary.contrastText" : "secondary.contrastText"
          }}>
            <Box sx={{ mr: 2 }}>
              {client.type === "business" ? (
                <Business sx={{ fontSize: 48, color: "white" }} />
              ) : (
                <Person sx={{ fontSize: 48, color: "white" }} />
              )}
            </Box>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                {client.name}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.5 }}>
                <Chip
                  label={client.type === "business" ? "Empresa" : "Persona"}
                  color={client.type === "business" ? "primary" : "secondary"}
                  size="small"
                  sx={{
                    bgcolor: "white",
                    color: client.type === "business" ? "primary.main" : "secondary.main",
                    fontWeight: "bold"
                  }}
                />
                {client.type === "business" && client.businessDetails && (
                  <Chip
                    label={`${client.businessDetails.employeeCount} empleados`}
                    size="small"
                    sx={{
                      bgcolor: "white",
                      color: "primary.main",
                      fontWeight: "bold"
                    }}
                  />
                )}
              </Box>
            </Box>
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card variant="outlined" sx={{ height: "100%" }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    color: client.type === "business" ? "primary.main" : "secondary.main"
                  }}>
                    <LocationOn /> Información de Contacto
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemIcon>
                        <Email fontSize="small" color={client.type === "business" ? "primary" : "secondary"} />
                      </ListItemIcon>
                      <ListItemText
                        primary={client.email}
                        secondary="Correo electrónico"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <Phone fontSize="small" color={client.type === "business" ? "primary" : "secondary"} />
                      </ListItemIcon>
                      <ListItemText
                        primary={client.phone}
                        secondary="Teléfono"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <LocationOn fontSize="small" color={client.type === "business" ? "primary" : "secondary"} />
                      </ListItemIcon>
                      <ListItemText
                        primary={client.address}
                        secondary="Dirección"
                      />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>

            {client.type === "business" && client.businessDetails && (
              <Grid item xs={12} md={6}>
                <Card variant="outlined" sx={{ height: "100%" }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      color: "primary.main"
                    }}>
                      <Business /> Detalles de la Empresa
                    </Typography>
                    <List dense>
                      <ListItem>
                        <ListItemIcon>
                          <Person fontSize="small" color="primary" />
                        </ListItemIcon>
                        <ListItemText
                          primary={client.businessDetails.contactPerson}
                          secondary="Contacto Principal"
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <Business fontSize="small" color="primary" />
                        </ListItemIcon>
                        <ListItemText
                          primary={client.businessDetails.position}
                          secondary="Cargo"
                        />
                      </ListItem>
                    </List>
                  </CardContent>
                </Card>
              </Grid>
            )}

            {client.type === "individual" && (
              <Grid item xs={12} md={6}>
                <Card variant="outlined" sx={{ height: "100%" }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      color: "secondary.main"
                    }}>
                      <Person /> Información Personal
                    </Typography>
                    <List dense>
                      <ListItem>
                        <ListItemIcon>
                          <Person fontSize="small" color="secondary" />
                        </ListItemIcon>
                        <ListItemText
                          primary="Cliente Individual"
                          secondary="Tipo de Cliente"
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <CalendarMonth fontSize="small" color="secondary" />
                        </ListItemIcon>
                        <ListItemText
                          primary={client.lastService || "Sin servicio previo"}
                          secondary="Último Servicio"
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <CalendarMonth fontSize="small" color="secondary" />
                        </ListItemIcon>
                        <ListItemText
                          primary={client.nextService || "Sin servicio programado"}
                          secondary="Próximo Servicio"
                        />
                      </ListItem>
                    </List>
                  </CardContent>
                </Card>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default ClientInfo 