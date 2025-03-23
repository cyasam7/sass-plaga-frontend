import { Box, Grid, List, ListItem, ListItemIcon, ListItemText, Paper, Typography, Skeleton, Chip } from "@mui/material"
import { LocationOn, Person, Phone, Store, Business, Email } from "@mui/icons-material"
import { BranchInfoProps } from "./types"

function BranchInfoSkeleton() {
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
          <Store sx={{ fontSize: 32 }} />
          <Box>
            <Skeleton variant="text" width={200} height={32} sx={{ bgcolor: 'rgba(255,255,255,0.1)' }} />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
              <Skeleton variant="rectangular" width={80} height={24} sx={{ bgcolor: 'rgba(255,255,255,0.1)' }} />
            </Box>
          </Box>
        </Box>
      </Paper>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography
              variant="h6"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                mb: 3,
                color: '#2B6858',
                fontWeight: 500
              }}
            >
              <LocationOn fontSize="small" />
              Información de Contacto
            </Typography>
            <List>
              {[1, 2, 3].map((_, index) => (
                <ListItem key={index} sx={{ px: 0 }}>
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <Skeleton variant="circular" width={24} height={24} />
                  </ListItemIcon>
                  <ListItemText
                    primary={<Skeleton variant="text" width="80%" />}
                    secondary={<Skeleton variant="text" width="40%" sx={{ opacity: 0.5 }} />}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography
              variant="h6"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                mb: 3,
                color: '#2B6858',
                fontWeight: 500
              }}
            >
              <Business fontSize="small" />
              Detalles de la Empresa
            </Typography>
            <List>
              {[1, 2].map((_, index) => (
                <ListItem key={index} sx={{ px: 0 }}>
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <Skeleton variant="circular" width={24} height={24} />
                  </ListItemIcon>
                  <ListItemText
                    primary={<Skeleton variant="text" width="80%" />}
                    secondary={<Skeleton variant="text" width="40%" sx={{ opacity: 0.5 }} />}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}

export function BranchInfo({ branch, isLoading }: BranchInfoProps) {
  if (isLoading) {
    return <BranchInfoSkeleton />
  }

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
          <Store sx={{ fontSize: 32 }} />
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 500 }}>
              {branch.name}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
              <Chip
                label="Sucursal"
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

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography
              variant="h6"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                mb: 3,
                color: '#2B6858',
                fontWeight: 500
              }}
            >
              <LocationOn fontSize="small" />
              Información de Contacto
            </Typography>
            <List>
              {branch.contactEmail && (
                <ListItem sx={{ px: 0 }}>
                  <ListItemIcon sx={{ minWidth: 40, color: '#2B6858' }}>
                    <Email fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    primary={branch.contactEmail}
                    secondary="Correo electrónico"
                    primaryTypographyProps={{
                      sx: { fontWeight: "normal" }
                    }}
                    secondaryTypographyProps={{
                      sx: { opacity: 0.5 }
                    }}
                  />
                </ListItem>
              )}
              {branch.contactPhone && (
                <ListItem sx={{ px: 0 }}>
                  <ListItemIcon sx={{ minWidth: 40, color: '#2B6858' }}>
                    <Phone fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    primary={branch.contactPhone}
                    secondary="Teléfono"
                    primaryTypographyProps={{
                      sx: { fontWeight: "normal" }
                    }}
                    secondaryTypographyProps={{
                      sx: { opacity: 0.5 }
                    }}
                  />
                </ListItem>
              )}
              {branch.address && (
                <ListItem sx={{ px: 0 }}>
                  <ListItemIcon sx={{ minWidth: 40, color: '#2B6858' }}>
                    <LocationOn fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    primary={branch.address}
                    secondary="Dirección"
                    primaryTypographyProps={{
                      sx: { fontWeight: "normal" }
                    }}
                    secondaryTypographyProps={{
                      sx: { opacity: 0.5 }
                    }}
                  />
                </ListItem>
              )}
            </List>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography
              variant="h6"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                mb: 3,
                color: '#2B6858',
                fontWeight: 500
              }}
            >
              <Business fontSize="small" />
              Detalles de la Empresa
            </Typography>
            <List>
              {branch.contactPerson && (
                <ListItem sx={{ px: 0 }}>
                  <ListItemIcon sx={{ minWidth: 40, color: '#2B6858' }}>
                    <Person fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    primary={branch.contactPerson}
                    secondary="Contacto Principal"
                    primaryTypographyProps={{
                      sx: { fontWeight: "normal" }
                    }}
                    secondaryTypographyProps={{
                      sx: { opacity: 0.5 }
                    }}
                  />
                </ListItem>
              )}
              {branch.notes && (
                <ListItem sx={{ px: 0 }}>
                  <ListItemIcon sx={{ minWidth: 40, color: '#2B6858' }}>
                    <Business fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    primary={branch.notes}
                    secondary="Cargo"
                    primaryTypographyProps={{
                      sx: { fontWeight: "normal" }
                    }}
                    secondaryTypographyProps={{
                      sx: { opacity: 0.5 }
                    }}
                  />
                </ListItem>
              )}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
} 