import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import { useGetEmployersQuery, useDeleteEmployerMutation } from '../../../api/rtk/Employer'

import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';

export default function ListTable(props: any) {
    const [snakMessage, setSnakMessage] = React.useState<string>('');

    const dispatch = useDispatch();
    const { data, error, isLoading } = useGetEmployersQuery(props.filters)
    const [deleteEmployer] = useDeleteEmployerMutation();



    //   React.useEffect(() => {
    //     dispatch(fetchCategories());    
    // }, []);
    const delEmployer = (employer: any) => {
        const conf = window.confirm(`Are you sure you want to delete ${employer.name}?`);
        if (conf) {
            deleteEmployer(employer).unwrap().then(res => {
                console.log(res);
                setSnakMessage('employer deleted successfully');
            }).catch(err => {
                console.log(err);
            });
        }

    }


    return (
        <Table aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell>Id</TableCell>
                    <TableCell align="right">Name</TableCell>
                    <TableCell align="right">Status</TableCell>
                    <TableCell align="right">Options</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {data && data?.data && data?.data?.data && data?.data?.data.map((row: any) => (
                    <TableRow
                        key={row.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell component="th" scope="row">
                            {row.id}
                        </TableCell>
                        <TableCell align="right">
                            <Link href='#' onClick={() => props.editEmployer(row)}>{row.name}</Link>
                        </TableCell>
                        <TableCell align="right">{row.status_text}</TableCell>
                        <TableCell align="right">
                            <Button onClick={() => delEmployer(row)}>Delete</Button>
                        </TableCell>
                    </TableRow>
                ))}
                {
                    (!data || !data?.data?.data.length) && <TableRow><TableCell colSpan={4}><Alert severity="info">No result found!</Alert></TableCell></TableRow>
                }
            </TableBody>
        </Table>
    );
}
