import { Box, Card, CardContent, CardHeader, Chip, IconButton, Typography } from '@mui/material';
import { BugReport, MoreVert } from '@mui/icons-material';
import { DeviceCardProps } from './types';

export function DeviceCard({
  device,
  onMenuClick,
  onEditDevice,
  getDeviceTypeLabel,
  getStatusLabel,
  getStatusColor
}: DeviceCardProps) {
  return (
    <Card variant="outlined">
      <CardHeader
        avatar={<BugReport color="primary" />}
        action={
          <IconButton
            aria-label="opciones"
            onClick={(e) => onMenuClick(e, device.id)}
          >
            <MoreVert />
          </IconButton>
        }
        title={`${getDeviceTypeLabel(device.type)} - ${device.code}`}
      />
      <CardContent sx={{ pt: 0 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography
            variant="body2"
            color="text.secondary"
          >
            Estado:
          </Typography>
          <Chip
            label={getStatusLabel(device.status)}
            color={getStatusColor(device.status) as any}
            size="small"
          />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography
            variant="body2"
            color="text.secondary"
          >
            Instalación:
          </Typography>
          <Typography variant="body2">{device.installDate}</Typography>
        </Box>
        {device.notes && (
          <Box sx={{ mt: 1 }}>
            <Typography
              variant="body2"
              color="text.secondary"
            >
              Notas:
            </Typography>
            <Typography variant="body2">{device.notes}</Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
} 