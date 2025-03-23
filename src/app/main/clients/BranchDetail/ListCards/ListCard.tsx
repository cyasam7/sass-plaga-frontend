import React from 'react'
import { Grid, Box, Typography, Paper, Skeleton } from '@mui/material'
import { ListCardsProps } from './types'
import { AreaCard } from '../../Cards/AreaCard'
import { MeetingRoom } from '@mui/icons-material'

const ListCardSkeleton = () => {
  return (
    <Box sx={{ mb: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Skeleton variant="text" width={200} height={32} />
        <Skeleton variant="rectangular" width={120} height={36} />
      </Box>
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
    </Box>
  )
}

const ListCard = (props: ListCardsProps) => {
  const { areas, headerComponent, handleMenuClick, isLoading } = props

  if (isLoading) {
    return <ListCardSkeleton />
  }

  if (!areas?.length) {
    return (
      <Box sx={{ mb: 3 }}>
        {headerComponent}
        <Paper
          sx={{
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center'
          }}
        >
          <MeetingRoom sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No hay áreas registradas
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Agrega una nueva área para comenzar
          </Typography>
        </Paper>
      </Box>
    )
  }

  return (
    <Box sx={{ mb: 3 }}>
      {headerComponent}
      <Grid container spacing={2}>
        {areas.map((area) => (
          <Grid item xs={12} sm={6} md={4} key={area.id}>
            <AreaCard area={area} onMenuClick={handleMenuClick} />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default ListCard