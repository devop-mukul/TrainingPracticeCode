import React from 'react'

import {
  Box,
  Typography,
  Paper,
  Button,
} from '@mui/material'

import {
  Table, TableContainer, TableCell, TableHead, TableBody, TableRow,
} from '@mui/material'

export default function TableMUI() {
  const tableData = [{
      "id": 1,
      "first_name": "Shelden",
      "last_name": "Aicheson",
      "email": "saicheson0@dyndns.org",
      "gender": "Polygender",
      "ip_address": "0.244.124.213"
    }, {
      "id": 2,
      "first_name": "Merwin",
      "last_name": "Adamthwaite",
      "email": "madamthwaite1@google.it",
      "gender": "Male",
      "ip_address": "35.26.22.167"
    }, {
      "id": 3,
      "first_name": "Mike",
      "last_name": "Woodage",
      "email": "mwoodage2@etsy.com",
      "gender": "Male",
      "ip_address": "192.208.5.197"
    }, {
      "id": 4,
      "first_name": "Beckie",
      "last_name": "Aikett",
      "email": "baikett3@soup.io",
      "gender": "Female",
      "ip_address": "136.180.79.16"
    }, {
      "id": 5,
      "first_name": "Tammy",
      "last_name": "Northridge",
      "email": "tnorthridge4@walmart.com",
      "gender": "Genderqueer",
      "ip_address": "124.46.104.183"
    }, {
      "id": 6,
      "first_name": "Vilhelmina",
      "last_name": "Antczak",
      "email": "vantczak5@vimeo.com",
      "gender": "Female",
      "ip_address": "57.34.63.191"
    }, {
      "id": 7,
      "first_name": "Colan",
      "last_name": "Bonds",
      "email": "cbonds6@uiuc.edu",
      "gender": "Male",
      "ip_address": "195.141.14.67"
    }, {
      "id": 8,
      "first_name": "Leopold",
      "last_name": "Crannach",
      "email": "lcrannach7@last.fm",
      "gender": "Male",
      "ip_address": "149.130.163.11"
    }, {
      "id": 9,
      "first_name": "Rodrigo",
      "last_name": "Mulhall",
      "email": "rmulhall8@taobao.com",
      "gender": "Male",
      "ip_address": "57.214.103.196"
    }, {
      "id": 10,
      "first_name": "Lia",
      "last_name": "Hakonsen",
      "email": "lhakonsen9@cisco.com",
      "gender": "Genderqueer",
      "ip_address": "203.146.25.25"
    }]
  
  return (
    <TableContainer component={Paper} elevation={10} sx={{maxHeight:'400px'}}>
      <Table stickyHeader>
        <TableHead>
          <TableRow >
            <TableCell align='left'>ID</TableCell>
            <TableCell align='left'>First Name</TableCell>
            <TableCell align='left'>Last Name</TableCell>
            <TableCell align='left'>Email</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((row) => (
            <TableRow key={row.id}
              // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.first_name}</TableCell>
              <TableCell>{row.last_name}</TableCell>
              <TableCell>{row.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
  
}
