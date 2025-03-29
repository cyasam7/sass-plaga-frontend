import { Box, Typography } from '@mui/material'
import React from 'react'

interface SimpleHeaderProps {
	title: string
	subtitle: string
}

const SimpleHeader = ({ title, subtitle }: SimpleHeaderProps) => {
	return (
		<Box sx={{ px: 3, pt: 3, pb: 2 }}>
			<Typography variant="h4" component="h1" gutterBottom>
				{title}
			</Typography>
			<Typography variant="subtitle1" color="text.secondary">
				{subtitle}
			</Typography>
		</Box>
	)
}

export default SimpleHeader