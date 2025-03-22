import React from "react"
import {
  Box,
  Typography,
  Button,
  TextField,
  IconButton,
  Grid,
  Paper,
} from "@mui/material"
import { Add as AddIcon, Delete as DeleteIcon } from "@mui/icons-material"
import { Dose, DosesSectionProps } from "./types"

const DosesSection: React.FC<DosesSectionProps> = ({
  doses = [],
  onAddDose,
  onEditDose,
  onDeleteDose,
}) => {
  const handleAddRow = () => {
    onAddDose({ amount: "", unit: "" })
  }

  const handleChange = (index: number, field: keyof Dose, value: string) => {
    const updatedDose = { ...doses[index], [field]: value }
    onEditDose(index, updatedDose)
  }

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6">Dosis Disponibles</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleAddRow}
        >
          Agregar Dosis
        </Button>
      </Box>

      <Paper sx={{ p: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={5}>
                <Typography variant="subtitle2" color="textSecondary">
                  Cantidad
                </Typography>
              </Grid>
              <Grid item xs={5}>
                <Typography variant="subtitle2" color="textSecondary">
                  Unidad
                </Typography>
              </Grid>
              <Grid item xs={2} />
            </Grid>
          </Grid>

          {doses.map((dose, index) => (
            <Grid item xs={12} key={index}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={5}>
                  <TextField
                    fullWidth
                    size="small"
                    value={dose.amount}
                    onChange={(e) => handleChange(index, "amount", e.target.value)}
                    placeholder="Ej: 100"
                  />
                </Grid>
                <Grid item xs={5}>
                  <TextField
                    fullWidth
                    size="small"
                    value={dose.unit}
                    onChange={(e) => handleChange(index, "unit", e.target.value)}
                    placeholder="Ej: ml"
                  />
                </Grid>
                <Grid item xs={2}>
                  <IconButton
                    size="small"
                    onClick={() => onDeleteDose(index)}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Box>
  )
}

export default DosesSection 