import { Box, Card, CardContent, CardHeader, Chip, IconButton, Typography, Stack } from '@mui/material';
import { BugReport, MoreVert, CalendarMonth, Notes } from '@mui/icons-material';
import { DeviceCardProps } from './types';
import { getDeviceTypeLabel, getStatusColor, getStatusLabel } from './utils';

export function DeviceCard({
  device,
  onMenuClick,
}: DeviceCardProps) {
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        "&:hover": {
          boxShadow: 6,
          "& .MuiCardHeader-root": {
            background: "linear-gradient(to bottom, #2B6858, #235446)",
          }
        },
      }}
    >
      <CardHeader
        sx={{
          background: "#2B6858",
          color: "white",
          transition: "background 0.3s ease",
          "& .MuiCardHeader-title": {
            fontSize: "1.1rem",
            fontWeight: 500,
          },
          "& .MuiIconButton-root": {
            color: "white",
          },
        }}
        avatar={
          <Box sx={{ color: "white" }}>
            <BugReport sx={{ fontSize: 32 }} />
          </Box>
        }
        action={
          <Stack direction="row" spacing={1} alignItems="center">
            <IconButton
              size="small"
              onClick={(e) => onMenuClick(e, device.id)}
            >
              <MoreVert />
            </IconButton>
          </Stack>
        }
        title={`Estación # ${device.stationNumber}`}
      />
      <CardContent sx={{ pt: 2, pb: 2, flexGrow: 1 }}>
        <Stack spacing={2}>
          <Box>
            <Typography
              variant="subtitle2"
              sx={{
                color: "#2B6858",
                display: "flex",
                alignItems: "center",
                gap: 1,
                mb: 1,
              }}
            >
              <CalendarMonth fontSize="small" />
              Información del Dispositivo
            </Typography>
            <Stack spacing={1}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  Estado
                </Typography>
                <Chip
                  label={getStatusLabel(device.status)}
                  color={getStatusColor(device.status) as any}
                  size="small"
                />
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  Tipo de Dispositivo
                </Typography>
                <Chip
                  label={getDeviceTypeLabel(device.type)}
                  size="small"
                />
              </Box>
            </Stack>
          </Box>

        </Stack>
      </CardContent>
    </Card>
  );
} 