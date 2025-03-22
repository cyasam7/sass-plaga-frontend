"use client"

import type React from "react"

import { useState } from "react"
import {
  Box,
  Button,
  Divider,
  Menu,
  MenuItem,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  type SelectChangeEvent,
  Popover,
  Paper,
} from "@mui/material"
import { Add, FilterList, CalendarMonth } from "@mui/icons-material"
import { format, parse } from "date-fns"
import { es } from "date-fns/locale"
import { NewClientForm } from "./new-client-form"

export function ClientFilters() {
  const [date, setDate] = useState<string>("")
  const [showNewClientForm, setShowNewClientForm] = useState(false)
  const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement>(null)
  const [calendarAnchorEl, setCalendarAnchorEl] = useState<null | HTMLElement>(null)
  const [sortBy, setSortBy] = useState("")
  const [serviceStatus, setServiceStatus] = useState("")

  const handleFilterClick = (event: React.MouseEvent<HTMLElement>) => {
    setFilterAnchorEl(event.currentTarget)
  }

  const handleFilterClose = () => {
    setFilterAnchorEl(null)
  }

  const handleCalendarClick = (event: React.MouseEvent<HTMLElement>) => {
    setCalendarAnchorEl(event.currentTarget)
  }

  const handleCalendarClose = () => {
    setCalendarAnchorEl(null)
  }

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value)
    // Cerrar el popover después de seleccionar la fecha
    if (calendarAnchorEl) {
      handleCalendarClose()
    }
  }

  const handleSortChange = (event: SelectChangeEvent) => {
    setSortBy(event.target.value)
  }

  const handleStatusChange = (event: SelectChangeEvent) => {
    setServiceStatus(event.target.value)
  }

  // Formatear la fecha para mostrar en el botón
  const formattedDate = date
    ? format(parse(date, "yyyy-MM-dd", new Date()), "PPP", { locale: es })
    : "Fecha de servicio"

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        gap: 2,
        alignItems: { xs: "stretch", sm: "center" },
      }}
    >
      <Button
        variant="contained"
        startIcon={<Add />}
        onClick={() => setShowNewClientForm(true)}
        fullWidth
        sx={{ maxWidth: { sm: "auto" } }}
      >
        Nuevo Cliente
      </Button>

      <Divider orientation="vertical" flexItem sx={{ display: { xs: "none", sm: "block" } }} />

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, width: "100%" }}>
        <Button
          variant="outlined"
          startIcon={<FilterList />}
          onClick={handleFilterClick}
          fullWidth
          sx={{ maxWidth: { sm: "auto" } }}
        >
          Filtros
        </Button>

        <Button
          variant="outlined"
          startIcon={<CalendarMonth />}
          onClick={handleCalendarClick}
          fullWidth
          sx={{ maxWidth: { sm: "auto" } }}
        >
          {formattedDate}
        </Button>
      </Box>

      {/* Menú de filtros */}
      <Menu
        anchorEl={filterAnchorEl}
        open={Boolean(filterAnchorEl)}
        onClose={handleFilterClose}
        PaperProps={{
          sx: { width: 280, p: 2 },
        }}
      >
        <Typography variant="subtitle2" gutterBottom>
          Estado del servicio
        </Typography>
        <FormControl fullWidth size="small" sx={{ mb: 2 }}>
          <InputLabel>Seleccionar estado</InputLabel>
          <Select value={serviceStatus} label="Seleccionar estado" onChange={handleStatusChange}>
            <MenuItem value="all">Todos</MenuItem>
            <MenuItem value="pending">Pendiente</MenuItem>
            <MenuItem value="completed">Completado</MenuItem>
            <MenuItem value="scheduled">Programado</MenuItem>
          </Select>
        </FormControl>

        <Typography variant="subtitle2" gutterBottom>
          Ordenar por
        </Typography>
        <FormControl fullWidth size="small">
          <InputLabel>Seleccionar orden</InputLabel>
          <Select value={sortBy} label="Seleccionar orden" onChange={handleSortChange}>
            <MenuItem value="name-asc">Nombre (A-Z)</MenuItem>
            <MenuItem value="name-desc">Nombre (Z-A)</MenuItem>
            <MenuItem value="date-asc">Fecha de servicio (Más antiguo)</MenuItem>
            <MenuItem value="date-desc">Fecha de servicio (Más reciente)</MenuItem>
          </Select>
        </FormControl>
      </Menu>

      {/* Selector de fecha simple */}
      <Popover
        open={Boolean(calendarAnchorEl)}
        anchorEl={calendarAnchorEl}
        onClose={handleCalendarClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Paper sx={{ p: 2 }}>
          <TextField
            label="Seleccionar fecha"
            type="date"
            value={date}
            onChange={handleDateChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Paper>
      </Popover>

      {/* Formulario de nuevo cliente */}
      <NewClientForm
        open={showNewClientForm}
        onClose={() => setShowNewClientForm(false)}
        onSubmit={(data) => {
          console.log("Nuevo cliente:", data)
          // Aquí se implementaría la lógica para guardar el cliente
          setShowNewClientForm(false)
        }}
      />
    </Box>
  )
}

