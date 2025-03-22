import { Card, CardHeader, CardContent, List, ListItem, ListItemIcon, ListItemText, IconButton, Button, CardActions, Box } from "@mui/material"
import { MeetingRoom, MoreVert } from "@mui/icons-material"
import { Area } from "../../../types"
import { useNavigate } from "react-router"
import { AreaCardProps } from "./types"

export function AreaCard({ area, onMenuClick }: AreaCardProps) {
  const navigate = useNavigate()

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        "&:hover": {
          boxShadow: 6,
          background: "linear-gradient(to bottom, rgba(25, 118, 210, 0.08), transparent)",
        },
        background: "linear-gradient(to bottom, rgba(25, 118, 210, 0.05), transparent)",
      }}
    >
      <CardHeader
        title={area.name}
        action={
          <IconButton
            size="small"
            onClick={(event) => onMenuClick(event, area.id)}
          >
            <MoreVert />
          </IconButton>
        }
      />
      <CardContent sx={{ flexGrow: 1, pb: 1 }}>
        <List dense>
          <ListItem>
            <ListItemIcon>
              <MeetingRoom fontSize="small" color="primary" />
            </ListItemIcon>
            <ListItemText
              primary={area.description || "Sin descripción"}
              primaryTypographyProps={{
                sx: { fontWeight: area.description ? "normal" : "light", fontStyle: area.description ? "normal" : "italic" }
              }}
            />
          </ListItem>
        </List>
      </CardContent>
      <CardActions sx={{ p: 2, pt: 0 }}>
        <Button
          size="small"
          startIcon={<MeetingRoom />}
          onClick={() => navigate(`/clients/${area.branchId}/branches/${area.id}/areas/${area.id}`)}
          color="primary"
          variant="outlined"
          fullWidth
        >
          Ver Detalles
        </Button>
      </CardActions>
    </Card>
  )
}

