import React from 'react'
import { Box, Grid, Paper, Skeleton } from '@mui/material'
import { DeviceListProps } from './types'
import { DeviceCard } from '../../Cards/DeviceCard'

const DeviceListSkeleton = () => {
  return (
    <Grid container spacing={2}>
      {[1, 2, 3].map((index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Paper sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Skeleton variant="circular" width={40} height={40} sx={{ mr: 2 }} />
              <Skeleton variant="text" width={150} height={24} />
            </Box>
            <Skeleton variant="text" width="100%" height={20} sx={{ mb: 1 }} />
            <Skeleton variant="text" width="80%" height={20} />
          </Paper>
        </Grid>
      ))}
    </Grid>
  )
}

const DeviceList = ({
  devices,
  onMenuClick,
  isLoading
}: DeviceListProps) => {

  if (isLoading) {
    return <DeviceListSkeleton />
  }

  return (
    <Grid container spacing={2}>
      {devices.map((device) => (
        <Grid item xs={12} sm={6} md={4} key={device.id}>
          <DeviceCard
            device={device}
            onMenuClick={(event) => onMenuClick(event, device.id)}
          />
        </Grid>
      ))}
    </Grid>
  )
}

export default DeviceList 