import { Card, CardHeader, CardContent, List, ListItem, ListItemIcon, ListItemText, IconButton, Button, CardActions, Typography, Box, Chip, Stack } from "@mui/material"
import { MoreVert, Phone, Apartment, LocationOn, Person, Store, Business, ArrowForward } from "@mui/icons-material"
import { useNavigate } from "react-router"
import { BranchCardProps } from "./types"

export function BranchCard({ branch, onMenuClick }: BranchCardProps) {
  const navigate = useNavigate()
  console.log(branch);
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
          <Box sx={{ color: "primary.main" }}>
            <Store sx={{ fontSize: 40 }} />
          </Box>
        }
        action={
          <Stack direction="row" spacing={1} alignItems="center">
            <Chip
              icon={<Business sx={{ fontSize: 16 }} />}
              label="Sucursal"
              size="small"
              color="primary"
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
              onClick={(event) => onMenuClick(event, branch.id)}
              color="primary"
            >
              <MoreVert />
            </IconButton>
          </Stack>
        }
        title={
          <Typography variant="h6" component="div">
            {branch.name}
          </Typography>
        }
      />
      <CardContent sx={{ flexGrow: 1, pb: 1 }}>
        <List dense>
          {branch.address && (
            <ListItem>
              <ListItemIcon>
                <LocationOn fontSize="small" color="primary" />
              </ListItemIcon>
              <ListItemText
                primary={branch.address}
                primaryTypographyProps={{
                  sx: { fontWeight: "normal" }
                }}
              />
            </ListItem>
          )}
          {branch.contactPerson && (
            <ListItem>
              <ListItemIcon>
                <Person fontSize="small" color="primary" />
              </ListItemIcon>
              <ListItemText
                primary={branch.contactPerson}
                secondary="Contacto"
                primaryTypographyProps={{
                  sx: { fontWeight: "normal" }
                }}
              />
            </ListItem>
          )}
          {branch.contactPhone && (
            <ListItem>
              <ListItemIcon>
                <Phone fontSize="small" color="primary" />
              </ListItemIcon>
              <ListItemText
                primary={branch.contactPhone}
                primaryTypographyProps={{
                  sx: { fontWeight: "normal" }
                }}
              />
            </ListItem>
          )}
        </List>
      </CardContent>
      <CardActions sx={{ p: 2, pt: 0 }}>
        <Button
          size="small"
          endIcon={<ArrowForward />}
          onClick={() => navigate(`/clients/${branch.clientId}/branches/${branch.id}`)}
          color="primary"
          variant="contained"
          fullWidth
        >
          Ver Áreas
        </Button>
      </CardActions>
    </Card>
  )
}

