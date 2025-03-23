import React from 'react'
import {
  Paper,
  Grid,
  Box,
  Typography,
  Skeleton,
  Stack,
  Chip,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import { AreaHeaderProps } from './types'
import { Apps, Description, LocationOn } from '@mui/icons-material'

const AreaHeaderSkeleton = () => {
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
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Skeleton variant="circular" width={32} height={32} sx={{ bgcolor: 'rgba(255,255,255,0.1)' }} />
            <Box>
              <Skeleton variant="text" width={200} height={32} sx={{ bgcolor: 'rgba(255,255,255,0.1)' }} />
            </Box>
          </Stack>
          <Skeleton variant="rectangular" width={80} height={24} sx={{ bgcolor: 'rgba(255,255,255,0.1)', borderRadius: 1 }} />
        </Box>
      </Paper>

      <Card>
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

            }}
          >
            <LocationOn fontSize="small" />
            Detalles del Área
          </Typography>
          <List>
            <ListItem sx={{ px: 0, py: 2 }}>
              <ListItemIcon sx={{ minWidth: 40 }}>
                <Skeleton variant="circular" width={24} height={24} />
              </ListItemIcon>
              <ListItemText
                primary={<Skeleton variant="text" width="80%" />}
                secondary={<Skeleton variant="text" width="40%" sx={{ opacity: 0.7 }} />}
              />
            </ListItem>
          </List>
        </CardContent>
      </Card>
    </Box>
  )
}

const AreaHeader = ({ area, isLoading }: AreaHeaderProps) => {
  if (isLoading) {
    return <AreaHeaderSkeleton />
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
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Apps sx={{ fontSize: 32 }} />
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 500 }}>
                {area.name}
              </Typography>
            </Box>
          </Stack>
          <Chip
            label="Área"
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
      </Paper>

      <Card>
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
            }}
          >
            <LocationOn fontSize="small" />
            Detalles del Área
          </Typography>
          <List>
            {area.description && (
              <ListItem sx={{ px: 0, py: 2 }}>
                <ListItemIcon sx={{ minWidth: 40, color: '#2B6858' }}>
                  <Description sx={{ fontSize: 24 }} />
                </ListItemIcon>
                <ListItemText
                  primary={area.description}
                  secondary="Descripción"
                  primaryTypographyProps={{
                    sx: { fontWeight: "normal" }
                  }}
                  secondaryTypographyProps={{
                    sx: { opacity: 0.7 }
                  }}
                />
              </ListItem>
            )}
          </List>
        </CardContent>
      </Card>
    </Box>
  )
}

export default AreaHeader 