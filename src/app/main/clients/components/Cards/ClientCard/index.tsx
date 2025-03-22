import React from "react"
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Typography,
  Box,
  Chip,
  Button,
  Divider,
} from "@mui/material"
import {
  Business,
  Person,
  MoreVert,
  Schedule,
  History,
} from "@mui/icons-material"
import { ClientCardProps } from "./types"

const ClientCard: React.FC<ClientCardProps> = ({
  client,
  onViewDetails,
  onMenuOpen,
}) => {
  const isBusiness = client.type === "business"
  const typeLabel = isBusiness ? "Empresa" : "Persona"
  const typeColor = isBusiness ? "primary" : "secondary"

  return (
    <Card variant="outlined" sx={{ height: "100%" }}>
      <CardHeader
        avatar={
          <Avatar src={client.image}>
            {isBusiness ? <Business /> : <Person />}
          </Avatar>
        }
        action={
          <IconButton
            aria-label="opciones"
            onClick={(e) => onMenuOpen(e, client.id)}
          >
            <MoreVert />
          </IconButton>
        }
        title={
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography
              variant="subtitle1"
              component="div"
              sx={{ fontWeight: "medium" }}
            >
              {client.name}
            </Typography>
            <Chip
              label={typeLabel}
              size="small"
              color={typeColor}
            />
          </Box>
        }
      />
      <Divider />
      <CardContent sx={{ py: 2 }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Business fontSize="small" color="action" />
            <Typography variant="body2" color="text.secondary">
              {client.email}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Person fontSize="small" color="action" />
            <Typography variant="body2" color="text.secondary">
              {client.phone}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Schedule fontSize="small" color="action" />
            <Typography variant="body2" color="text.secondary">
              {client.address}
            </Typography>
          </Box>
        </Box>

        {client.businessDetails && (
          <>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Contacto: {client.businessDetails.contactPerson}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Cargo: {client.businessDetails.position}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Empleados: {client.businessDetails.employeeCount}
              </Typography>
            </Box>
          </>
        )}
      </CardContent>
      <Divider />
      <CardActions sx={{ justifyContent: "flex-end", px: 2, py: 1 }}>
        <Button
          size="small"
          startIcon={<History />}
          onClick={() => onViewDetails(client.id)}
        >
          Ver detalles
        </Button>
      </CardActions>
    </Card>
  )
}

export default ClientCard 