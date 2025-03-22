import { Card, CardHeader, CardContent, List, ListItem, ListItemIcon, ListItemText, IconButton, Button, CardActions } from "@mui/material"
import { MeetingRoom, Warning, CalendarMonth, MoreVert } from "@mui/icons-material"
import { Area } from "../../../types"
interface AreaCardProps {
  area: Area
  onMenuClick: (event: React.MouseEvent<HTMLElement>, areaId: string) => void
  onAreaClick: (areaId: string) => void
}

export function AreaCard({ area, onMenuClick, onAreaClick }: AreaCardProps) {
  return <Card>
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
    <CardContent>
      <List dense>
        <ListItem>
          <ListItemIcon>
            <MeetingRoom fontSize="small" />
          </ListItemIcon>
          <ListItemText primary={area.description} />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <Warning fontSize="small" />
          </ListItemIcon>
          <ListItemText
            primary={area.riskLevel.toUpperCase()}
            secondary="Nivel de Riesgo"
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <CalendarMonth fontSize="small" />
          </ListItemIcon>
          <ListItemText
            primary={area.nextInspection || "Sin inspección programada"}
            secondary="Próxima Inspección"
          />
        </ListItem>
      </List>
    </CardContent>
    <CardActions>
      <Button
        size="small"
        startIcon={<MeetingRoom />}
        onClick={() => onAreaClick(area.id)}
      >
        Ver Detalles
      </Button>
    </CardActions>
  </Card>
}

