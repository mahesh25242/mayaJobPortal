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
import { alertTitleClasses, Pagination } from '@mui/material';
import instance from '../../../api/axios/Axios';
import saveAs from 'file-saver';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';

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
    const download = (employer: any) => {

        instance.get(`/downloadPDF/${employer.user_id}`, {
            params: {
                rand: Math.random()
            },
            responseType: 'blob'
        }).then(res => {
            saveAs(res?.data, `${employer?.name}.pdf`);
        });
    }


    return (
        <><TableContainer component={Paper}>
            <Table aria-label="simple table" size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Id</TableCell>
                        <TableCell align="left">Name</TableCell>
                        <TableCell align="left">Email</TableCell>
                        <TableCell align="left">Phone</TableCell>
                        <TableCell align="left">Country</TableCell>
                        <TableCell align="left">State</TableCell>
                        <TableCell align="left">City</TableCell>
                        <TableCell align="left">District</TableCell>
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
                            <TableCell align="left">
                                <Link href='#' onClick={() => props.editEmployer(row)}>{row.name}</Link>
                            </TableCell>
                            <TableCell align="left">
                                <Link href={`mailto:${row.user?.email}`} >{row.user?.email}</Link>
                            </TableCell>
                            <TableCell align="left">
                                <Link href={`tel://${row?.phone}`}>{row?.user.phone}</Link>                                
                            </TableCell>
                            <TableCell align="right">{row.country}</TableCell>
                            <TableCell align="right">{row.state}</TableCell>
                            <TableCell align="right">{row.city}</TableCell>
                            <TableCell align="right">{row.district}</TableCell>
                            <TableCell align="right">{row?.user?.status_text}</TableCell>
                            <TableCell align="right">
                                <Button onClick={() => delEmployer(row)}>Delete</Button>
                                <Button onClick={() => download(row)}>Download</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                    {
                        (!data || !data?.data?.data.length) && <TableRow><TableCell colSpan={10}><Alert severity="info">No result found!</Alert></TableCell></TableRow>
                    }
                </TableBody>
            </Table>
            </TableContainer>
            {
                data && data?.data && data?.data?.data &&
                <Pagination count={data.data?.last_page} variant="outlined" color="primary"
                    onChange={(event, val) => props.setFilters({ ...props.filters, page: val })} />
            }
            
        </>
    );
}
