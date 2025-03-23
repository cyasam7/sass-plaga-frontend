import type React from "react"
import { Box, Grid, Typography, Skeleton } from "@mui/material"
import { Store } from "@mui/icons-material"
import { Branch } from "../../types"
import { BranchCard } from "../../Cards/BranchCard"

interface BranchesTabProps {
  branches: Branch[]
  isLoading?: boolean
  handleMenuClick: (event: React.MouseEvent<HTMLElement>, branchId: string) => void
  headerComponent?: React.ReactNode
}

function BranchesSkeleton() {
  return (
    <Grid container spacing={2}>
      {[1, 2, 3].map((item) => (
        <Grid item xs={12} sm={6} md={4} key={item}>
          <Box sx={{ p: 2, bgcolor: "background.paper", borderRadius: 1, boxShadow: 1 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Skeleton variant="circular" width={40} height={40} sx={{ mr: 2 }} />
              <Box sx={{ flex: 1 }}>
                <Skeleton variant="text" width="80%" height={24} />
                <Skeleton variant="text" width="60%" height={20} />
              </Box>
            </Box>
            <Box sx={{ mt: 2 }}>
              <Skeleton variant="text" width="100%" height={20} />
              <Skeleton variant="text" width="80%" height={20} />
              <Skeleton variant="text" width="60%" height={20} />
            </Box>
          </Box>
        </Grid>
      ))}
    </Grid>
  )
}

export function BranchesTab({ branches, isLoading, handleMenuClick, headerComponent }: BranchesTabProps) {
  if (isLoading) {
    return <BranchesSkeleton />
  }

  return (
    <>
      {headerComponent}
      <Grid container spacing={2}>
        {branches.length > 0 && branches.map((branch) => (
          <Grid item xs={12} sm={6} md={4} key={branch.id}>
            <BranchCard branch={branch} onMenuClick={handleMenuClick} />
          </Grid>
        ))}

        {branches.length === 0 && (
          <Grid item xs={12}>
            <Box sx={{ p: 2, textAlign: "center" }}>
              <Store sx={{ fontSize: 48, color: "primary.main", mb: 2 }} />
              <Typography variant="h6" color="primary.main" gutterBottom>
                No hay sucursales
              </Typography>
              <Typography color="text.secondary">
                Agregue una nueva sucursal para comenzar a gestionar las áreas y dispositivos.
              </Typography>
            </Box>
          </Grid>
        )}
      </Grid>
    </>
  )
}



