import {
  Box,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  Paper,
  Skeleton,
  Card,
  CardContent,
} from "@mui/material"
import {
  Business,
  Person,
  LocationOn,
  Email,
  Phone,
} from "@mui/icons-material"
import { Client } from "../../types"

interface ClientInfoProps {
  client: Client | null
  loading: boolean
}

function ClientInfoSkeleton() {
  return (
    <Box>
      <Paper
        sx={{
          p: 2,
          mb: 2,
          bgcolor: '#2B6858',
          borderRadius: '4px 4px 0 0',
          color: 'white'
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Business sx={{ fontSize: 32 }} />
          <Box>
            <Skeleton variant="text" width={200} height={32} sx={{ bgcolor: 'rgba(255,255,255,0.1)' }} />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
              <Skeleton variant="rectangular" width={80} height={24} sx={{ bgcolor: 'rgba(255,255,255,0.1)' }} />
            </Box>
          </Box>
        </Box>
      </Paper>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography
                variant="h6"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  mb: 3,
                  color: '#2B6858',
                  fontWeight: 500,
                  fontSize: '1.25rem'
                }}
              >
                <LocationOn fontSize="small" />
                Información de Contacto
              </Typography>
              <List>
                {[1, 2, 3].map((_, index) => (
                  <ListItem key={index} >
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <Skeleton variant="circular" width={24} height={24} />
                    </ListItemIcon>
                    <ListItemText
                      primary={<Skeleton variant="text" width="80%" />}
                      secondary={<Skeleton variant="text" width="40%" sx={{ opacity: 0.7 }} />}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography
                variant="h6"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  mb: 3,
                  color: '#2B6858',
                  fontWeight: 500,
                  fontSize: '1.25rem'
                }}
              >
                <Business fontSize="small" />
                Detalles de la Empresa
              </Typography>
              <List>
                {[1, 2].map((_, index) => (
                  <ListItem key={index} >
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <Skeleton variant="circular" width={24} height={24} />
                    </ListItemIcon>
                    <ListItemText
                      primary={<Skeleton variant="text" width="80%" />}
                      secondary={<Skeleton variant="text" width="40%" sx={{ opacity: 0.7 }} />}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

export function ClientInfo({ client, loading }: ClientInfoProps) {
  if (loading || !client) {
    return <ClientInfoSkeleton />
  }

  const shouldShowBusinessDetails = !!client?.businessDetails?.contactPerson || client!!?.businessDetails?.position


  return (
    <Box paddingBottom={2}>
      <Paper
        sx={{
          p: 2,
          mb: 2,
          bgcolor: '#2B6858',
          borderRadius: '4px 4px 0 0',
          color: 'white'
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {client.type === "business" ? (
            <Business sx={{ fontSize: 32 }} />
          ) : (
            <Person sx={{ fontSize: 32 }} />
          )}
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 500 }}>
              {client.name}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
              <Chip
                label={client.type === "business" ? "Empresa" : "Persona"}
                size="small"
                sx={{
                  bgcolor: 'rgba(255,255,255,0.1)',
                  color: 'white',
                  height: 24,
                  '& .MuiChip-label': {
                    px: 1,
                  }
                }}
              />
            </Box>
          </Box>
        </Box>
      </Paper>

      <Grid container spacing={3}>
        <Grid item xs={12} md={!shouldShowBusinessDetails ? 12 : 6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography
                variant="h6"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  color: '#2B6858',
                  fontWeight: 500,
                }}
              >
                <LocationOn fontSize="small" />
                Información de Contacto
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon sx={{ minWidth: 40, color: '#2B6858' }}>
                    <Email sx={{ fontSize: 24 }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={client.email}
                    secondary="Correo electrónico"
                    primaryTypographyProps={{
                      sx: { fontWeight: "normal", }
                    }}
                    secondaryTypographyProps={{
                      sx: { opacity: 0.7, }
                    }}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon sx={{ minWidth: 40, color: '#2B6858' }}>
                    <Phone sx={{ fontSize: 24 }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={client.phone}
                    secondary="Teléfono"
                    primaryTypographyProps={{
                      sx: { fontWeight: "normal", }
                    }}
                    secondaryTypographyProps={{
                      sx: { opacity: 0.7, }
                    }}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon sx={{ minWidth: 40, color: '#2B6858' }}>
                    <LocationOn sx={{ fontSize: 24 }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={client.address}
                    secondary="Dirección"
                    primaryTypographyProps={{
                      sx: { fontWeight: "normal", }
                    }}
                    secondaryTypographyProps={{
                      sx: { opacity: 0.7, }
                    }}
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        {shouldShowBusinessDetails && (
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography
                  variant="h6"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    color: '#2B6858',
                    fontWeight: 500,
                  }}
                >
                  <Business fontSize="small" />
                  Detalles de la Empresa
                </Typography>
                <List>
                  {client.type === "business" && client.businessDetails && (
                    <>
                      <ListItem >
                        <ListItemIcon sx={{ minWidth: 40, color: '#2B6858' }}>
                          <Person sx={{ fontSize: 24 }} />
                        </ListItemIcon>
                        <ListItemText
                          primary={client.businessDetails.contactPerson}
                          secondary="Contacto Principal"
                          primaryTypographyProps={{
                            sx: { fontWeight: "normal", }
                          }}
                          secondaryTypographyProps={{
                            sx: { opacity: 0.7, }
                          }}
                        />
                      </ListItem>
                      <ListItem >
                        <ListItemIcon sx={{ minWidth: 40, color: '#2B6858' }}>
                          <Business sx={{ fontSize: 24 }} />
                        </ListItemIcon>
                        <ListItemText
                          primary={client.businessDetails.position}
                          secondary="Cargo"
                          primaryTypographyProps={{
                            sx: { fontWeight: "normal", }
                          }}
                          secondaryTypographyProps={{
                            sx: { opacity: 0.7, }
                          }}
                        />
                      </ListItem>
                    </>
                  )}
                  {client.type === "individual" && (
                    <ListItem >
                      <ListItemIcon sx={{ minWidth: 40, color: '#2B6858' }}>
                        <Person sx={{ fontSize: 24 }} />
                      </ListItemIcon>
                      <ListItemText
                        primary="Cliente Individual"
                        secondary="Tipo de Cliente"
                        primaryTypographyProps={{
                          sx: { fontWeight: "normal", }
                        }}
                        secondaryTypographyProps={{
                          sx: { opacity: 0.7, }
                        }}
                      />
                    </ListItem>
                  )}
                </List>
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>
    </Box>
  )
}

export default ClientInfo 