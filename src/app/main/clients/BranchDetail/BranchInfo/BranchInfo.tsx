import { Box, Grid, List, ListItem, ListItemIcon, ListItemText, Paper, Typography, Skeleton } from "@mui/material"
import { LocationOn, Person, Phone, Store } from "@mui/icons-material"
import { BranchInfoProps } from "./types"

function BranchInfoSkeleton() {
  return (
    <Paper sx={{ p: 3, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Box sx={{ mr: 2 }}>
              <Skeleton variant="circular" width={48} height={48} />
            </Box>
            <Box sx={{ flex: 1 }}>
              <Skeleton variant="text" width="60%" height={32} />
              <Skeleton variant="text" width="80%" height={24} />
            </Box>
          </Box>

          <List dense>
            <ListItem>
              <ListItemIcon>
                <Skeleton variant="circular" width={24} height={24} />
              </ListItemIcon>
              <ListItemText
                primary={<Skeleton variant="text" width="80%" />}
                secondary={<Skeleton variant="text" width="40%" />}
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Skeleton variant="circular" width={24} height={24} />
              </ListItemIcon>
              <ListItemText
                primary={<Skeleton variant="text" width="70%" />}
                secondary={<Skeleton variant="text" width="40%" />}
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Skeleton variant="circular" width={24} height={24} />
              </ListItemIcon>
              <ListItemText
                primary={<Skeleton variant="text" width="60%" />}
                secondary={<Skeleton variant="text" width="40%" />}
              />
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </Paper>
  )
}

export function BranchInfo({ branch, isLoading }: BranchInfoProps) {
  if (isLoading) {
    return <BranchInfoSkeleton />
  }

  return (
    <Paper sx={{ p: 3, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Box sx={{ mr: 2 }}>
              <Store sx={{ fontSize: 48, color: "primary.main" }} />
            </Box>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: "bold", color: "primary.main" }}>
                {branch.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                {branch.notes}
              </Typography>
            </Box>
          </Box>

          <List dense>
            <ListItem>
              <ListItemIcon>
                <LocationOn fontSize="small" color="primary" />
              </ListItemIcon>
              <ListItemText
                primary={branch.address}
                secondary="Dirección"
              />
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
              <ListItemText
                primary={branch.contactPhone}
                secondary="Teléfono"
              />
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </Paper>
  )
} 