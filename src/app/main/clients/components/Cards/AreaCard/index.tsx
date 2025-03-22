import { Card, CardHeader, CardContent, List, ListItem, ListItemIcon, ListItemText, IconButton, Button, CardActions, Chip, Box } from "@mui/material"
import { MeetingRoom, CalendarMonth, MoreVert } from "@mui/icons-material"
import { Area } from "../../../types"
import { useNavigate } from "react-router"

interface AreaCardProps {
  area: Area
  onMenuClick: (event: React.MouseEvent<HTMLElement>, areaId: string) => void
}

const getRiskLevelColor = (level: "high" | "medium" | "low") => {
  switch (level) {
    case "high":
      return "error"
    case "medium":
      return "warning"
    case "low":
      return "success"
  }
}

export function AreaCard({ area, onMenuClick }: AreaCardProps) {
  const riskColor = getRiskLevelColor(area.riskLevel)
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
        },
        "&:before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "4px",
          bgcolor: `${riskColor}.main`,
        }
      }}
    >
      <CardHeader
        title={area.name}
        action={
          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            <Chip
              label={area.riskLevel.toUpperCase()}
              size="small"
              color={riskColor}
              sx={{ fontWeight: "bold" }}
            />
            <IconButton
              size="small"
              onClick={(event) => onMenuClick(event, area.id)}
            >
              <MoreVert />
            </IconButton>
          </Box>
        }
      />
      <CardContent sx={{ flexGrow: 1, pb: 1 }}>
        <List dense>
          <ListItem>
            <ListItemIcon>
              <MeetingRoom fontSize="small" color={riskColor} />
            </ListItemIcon>
            <ListItemText
              primary={area.description || "Sin descripción"}
              primaryTypographyProps={{
                sx: { fontWeight: area.description ? "normal" : "light", fontStyle: area.description ? "normal" : "italic" }
              }}
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CalendarMonth fontSize="small" color={riskColor} />
            </ListItemIcon>
            <ListItemText
              primary={area.nextInspection || "Sin inspección programada"}
              secondary="Próxima Inspección"
              primaryTypographyProps={{
                sx: { fontWeight: area.nextInspection ? "normal" : "light", fontStyle: area.nextInspection ? "normal" : "italic" }
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
          color={riskColor}
          variant="outlined"
          fullWidth
        >
          Ver Detalles
        </Button>
      </CardActions>
    </Card>
  )
}

