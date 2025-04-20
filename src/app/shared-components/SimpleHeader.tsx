import { Box, Typography, Button, Stack } from '@mui/material'
import React from 'react'

interface SimpleHeaderProps {
	title: string
	subtitle: string
	actions?: React.ReactNode
}

const SimpleHeader = ({ title, subtitle, actions }: SimpleHeaderProps) => {
	return (
		<Box sx={{ px: 3, pt: 3, pb: 2 }}>
			<Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
				<Box>
					<Typography variant="h4" component="h1" gutterBottom>
						{title}
					</Typography>
					<Typography variant="subtitle1" color="text.secondary">
						{subtitle}
					</Typography>
				</Box>
				{actions && (
					<Box>
						{actions}
					</Box>
				)}
			</Stack>
		</Box>
	)
}

export default SimpleHeader