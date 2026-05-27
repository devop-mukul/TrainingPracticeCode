import React from 'react'

import {
  Box,
  Typography,
  Paper,
  Button
} from '@mui/material'

export default function PaperMUI() {

  return (

    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        p: 4
      }}
    >

      <Typography variant="h4">

        Paper MUI

      </Typography>

      {/* Basic Paper */}

      <Paper sx={{ p: 2 }}>

        <Typography>

          Basic Paper

        </Typography>

      </Paper>

      {/* Elevation */}

      <Paper
        elevation={5}
        sx={{ p: 2 }}
      >

        <Typography>

          Elevated Paper

        </Typography>

      </Paper>

      {/* Outlined Variant */}

      <Paper
        variant="outlined"
        sx={{ p: 2 }}
      >

        <Typography>

          Outlined Paper

        </Typography>

      </Paper>

      {/* Square Corners */}

      <Paper
        square
        elevation={4}
        sx={{ p: 2 }}
      >

        <Typography>

          Square Paper

        </Typography>

      </Paper>

      {/* Real Card Style */}

      <Paper
        elevation={6}
        sx={{
          p: 3,
          width: 300
        }}
      >

        <Typography variant="h6">

          Product Card

        </Typography>

        <Typography sx={{ mt: 1 }}>

          iPhone 16 Pro

        </Typography>

        <Button
          variant="contained"
          sx={{ mt: 2 }}
        >
          Buy Now
        </Button>

      </Paper>

    </Box>
  )
}