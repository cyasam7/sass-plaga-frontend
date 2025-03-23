import React from 'react'
import { Paper, Grid, Box, Typography, Skeleton } from '@mui/material'
import { AreaHeaderProps } from './types'

const AreaHeaderSkeleton = () => {
  return (
    <Paper sx={{ p: 3, mb: 4, background: "linear-gradient(to bottom, rgba(25, 118, 210, 0.05), transparent)" }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2, mb: 2 }}>
            <Skeleton variant="text" width={200} height={32} />
          </Box>
          <Skeleton variant="text" width="80%" height={20} />
        </Grid>
      </Grid>
    </Paper>
  )
}

const AreaHeader = ({ area, isLoading }: AreaHeaderProps) => {
  if (isLoading) {
    return <AreaHeaderSkeleton />
  }

  return (
    <Paper sx={{ p: 3, mb: 4, background: "linear-gradient(to bottom, rgba(25, 118, 210, 0.05), transparent)" }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2, mb: 2 }}>
            <Typography variant="h5" sx={{ fontWeight: "bold", color: "primary.main" }}>
              {area.name}
            </Typography>
          </Box>
          {area.description && (
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {area.description}
            </Typography>
          )}
        </Grid>
      </Grid>
    </Paper>
  )
}

export default AreaHeader 