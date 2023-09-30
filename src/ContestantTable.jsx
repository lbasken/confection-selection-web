import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(entryNumber, baker, confection) {
    return { entryNumber, baker, confection };
}

const rows = [
    createData(1, 'Lorelei', 'Chocolate Chip Cookies')
];

export default function ContestantTable() {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Entry Number</TableCell>
                        <TableCell align="right">Baker</TableCell>
                        <TableCell align="right">Confection</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.entryNumber}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.entryNumber}
                            </TableCell>
                            <TableCell align="right">{row.entryNumber}</TableCell>
                            <TableCell align="right">{row.baker}</TableCell>
                            <TableCell align="right">{row.confection}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}