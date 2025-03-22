import type React from "react"
import { Box, Tabs, Tab } from "@mui/material"
import {
  Store,
  CalendarMonth,
  Warning,
  MeetingRoom,
  BugReport,
} from "@mui/icons-material"

export interface DetailTabsProps {
  activeTab: number
  onTabChange: (event: React.SyntheticEvent, newValue: number) => void
  type: "client" | "branch" | "area"
}

export function DetailTabs({ activeTab, onTabChange, type }: DetailTabsProps) {
  const getTabs = () => {
    switch (type) {
      case "client":
        return [
          {
            icon: <Store />,
            label: "Sucursales",
            color: "primary.main",
          },
          {
            icon: <CalendarMonth />,
            label: "Historial",
            color: "success.main",
          },
          {
            icon: <Warning />,
            label: "Alertas",
            color: "warning.main",
          },
        ]
      case "branch":
        return [
          {
            icon: <MeetingRoom />,
            label: "Áreas",
            color: "primary.main",
          },
          {
            icon: <CalendarMonth />,
            label: "Historial",
            color: "success.main",
          },
          {
            icon: <Warning />,
            label: "Alertas",
            color: "warning.main",
          },
        ]
      case "area":
        return [
          {
            icon: <BugReport />,
            label: "Dispositivos",
            color: "primary.main",
          },
          {
            icon: <CalendarMonth />,
            label: "Historial",
            color: "success.main",
          },
          {
            icon: <Warning />,
            label: "Alertas",
            color: "warning.main",
          },
        ]
      default:
        return []
    }
  }

  return (
    <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
      <Tabs value={activeTab} onChange={onTabChange}>
        {getTabs().map((tab, index) => (
          <Tab
            key={index}
            icon={tab.icon}
            label={tab.label}
            iconPosition="start"
            sx={{ color: tab.color }}
          />
        ))}
      </Tabs>
    </Box>
  )
}

export default DetailTabs 