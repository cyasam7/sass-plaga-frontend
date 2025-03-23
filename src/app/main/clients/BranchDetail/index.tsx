import type React from "react"
import { useState } from "react"
import {
  Box,
  Typography,
  Button,
  Menu,
  MenuItem,
} from "@mui/material"
import {
  ArrowBack,
  Add,
  Edit,
  Delete,
  MeetingRoom,
} from "@mui/icons-material"
import { Area } from "../types"
import { AreaForm } from "../Forms/AreaForm"
import { useNavigate, useParams } from "react-router"
import { useQuery } from "react-query"
import { BranchService } from "src/app/shared/services/BranchService"
import { BranchInfo } from "./BranchInfo/BranchInfo"
import ListCard from "./ListCards/ListCard"
import { openDialog } from "app/shared-components/GlobalDialog/openDialog"
import { AreaService } from "src/app/shared/services/AreaService"
import PageHeader from "../PageHeader"
import { FormAreaType } from "../Forms/AreaForm/types"

export function BranchDetail() {
  const navigate = useNavigate()
  const { branchId, clientId } = useParams()

  const { data: branch, isLoading: isLoadingBranch } = useQuery({
    queryKey: ['branch', branchId],
    queryFn: () => BranchService.byId(branchId)
  })

  const { data: areas = [], isLoading: isLoadingAreas, refetch: refetchAreas } = useQuery({
    queryKey: ['areas', branchId],
    queryFn: () => AreaService.getByBranch(branchId)
  })

  const [showAreaForm, setShowAreaForm] = useState(false)
  const [currentArea, setCurrentArea] = useState<Area | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [selectedAreaId, setSelectedAreaId] = useState<string | null>(null)
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null)

  const handleAddArea = () => {
    setCurrentArea(null)
    setIsEditing(false)
    setShowAreaForm(true)
  }

  const handleEditArea = (area: Area) => {
    setCurrentArea(area)
    setIsEditing(true)
    setShowAreaForm(true)

  }

  const handleDeleteArea = (areaId: string) => {
    openDialog({
      title: "Eliminar Área",
      text: "¿Estás seguro de querer eliminar esta área?",
      onAccept: async () => {
        await AreaService.remove(areaId)
        await refetchAreas()
        handleMenuClose()
      }
    })
  }

  const handleSaveArea = async (area: FormAreaType) => {
    await AreaService.save(area)
    await refetchAreas()
    setShowAreaForm(false);
    handleMenuClose();
  }

  const handleOnCloseAreaForm = async () => {
    setShowAreaForm(false)
    handleMenuClose();
  }

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, areaId: string) => {
    setMenuAnchorEl(event.currentTarget)
    setSelectedAreaId(areaId)
  }

  const handleMenuClose = () => {
    setMenuAnchorEl(null)
    setSelectedAreaId(null)
  }

  return (
    <Box paddingTop={2}>
      <PageHeader
        title="Detalle de Sucursal"
        onBack={() => navigate(-1)}
        breadcrumbs={[
          { label: "Clientes", onClick: () => navigate("/clients") },
          { label: "Sucursal", onClick: () => navigate(`/clients/${clientId}/branches/${branchId}`) },
          { label: "Detalle de Sucursal", onClick: () => navigate(`/clients/${clientId}/branches/${branchId}`) }
        ]}
      />
      <BranchInfo branch={branch} isLoading={isLoadingBranch} />
      <ListCard
        areas={areas}
        isLoading={isLoadingAreas}
        handleMenuClick={handleMenuClick}
        headerComponent={
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 3 }}>
            <Typography variant="h6" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <MeetingRoom color="primary" /> Áreas de la Sucursal
            </Typography>
            <Button
              variant="contained"
              color="primary"
              startIcon={<Add />}
              onClick={handleAddArea}
            >
              Agregar Área
            </Button>
          </Box>
        }
      />
      <AreaForm
        area={currentArea}
        onSave={handleSaveArea}
        onClose={handleOnCloseAreaForm}
        open={showAreaForm}
        isEditing={isEditing}
        branchId={branchId}
        clientId={clientId}
      />
      <Menu
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => handleEditArea(areas.find((a) => a.id === selectedAreaId)!)}>
          <Edit sx={{ mr: 1 }} /> Editar
        </MenuItem>
        <MenuItem onClick={() => handleDeleteArea(selectedAreaId!)}>
          <Delete sx={{ mr: 1 }} /> Eliminar
        </MenuItem>
      </Menu>
    </Box>
  )
}

export default BranchDetail; 