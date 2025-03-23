import { Card, CardHeader, CardContent, List, ListItem, ListItemIcon, ListItemText, IconButton, Button, CardActions, Typography, Box, Chip, Stack } from "@mui/material"
import { MeetingRoom, MoreVert, Apps, ArrowForward, Description } from "@mui/icons-material"
import { useNavigate } from "react-router"
import { AreaCardProps } from "./types"

export function AreaCard({ area, onMenuClick }: AreaCardProps) {
  const navigate = useNavigate()
  console.log(area);

  return (
    <Card
      sx={{
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
      }}
    >
      <CardHeader
        avatar={
          <Box sx={{ color: "primary.main" }}>
            <MeetingRoom sx={{ fontSize: 40 }} />
          </Box>
        }
        action={
          <Stack direction="row" spacing={1} alignItems="center">
            <Chip
              icon={<Apps sx={{ fontSize: 16 }} />}
              label="Área"
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
              onClick={(event) => onMenuClick(event, area.id)}
              color="primary"
            >
              <MoreVert />
            </IconButton>
          </Stack>
        }
        title={
          <Typography variant="h6" component="div">
            {area.name}
          </Typography>
        }
      />
      <CardContent sx={{ flexGrow: 1, pb: 1 }}>
        <List dense>
          <ListItem>
            <ListItemIcon>
              <Description fontSize="small" color="primary" />
            </ListItemIcon>
            <ListItemText
              primary={area.description || "Sin descripción"}
              primaryTypographyProps={{
                sx: {
                  fontWeight: "normal",
                  fontStyle: area.description ? "normal" : "italic"
                }
              }}
            />
          </ListItem>
        </List>
      </CardContent>
      <CardActions sx={{ p: 2, pt: 0 }}>
        <Button
          size="small"
          endIcon={<ArrowForward />}
          onClick={() => navigate(`/clients/${area.clientId}/branches/${area.branchId}/areas/${area.id}`)}
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

