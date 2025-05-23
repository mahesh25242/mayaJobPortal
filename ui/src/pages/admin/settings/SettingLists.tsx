import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import EditSetting from './EditSetting';
import { useDispatch, useSelector } from 'react-redux';
import { useGetSettingsQuery } from '../../../api/rtk/Setting'


import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import CustomSnackbar from '../../../components/snakBar/CustomSnackbar';
import { Helmet } from 'react-helmet-async';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

export default function SettingLists() {

  const [setting, setSetting] = React.useState<any>(null);
  const [snakMessage, setSnakMessage] = React.useState<string>('');
  const dispatch = useDispatch();
  const { data, error, isLoading } = useGetSettingsQuery('')



  //   React.useEffect(() => {
  //     dispatch(fetchCategories());    
  // }, []);

  return (<>
    <Helmet>
      <title>Settings</title>
    </Helmet>
    <Typography gutterBottom variant="h5" component="div">
      <Grid container spacing={2}>
        <Grid item md={10}>
        Settings
        </Grid>        
      </Grid>


    </Typography>

    <TableContainer component={Paper}>

      {
        setting && <EditSetting setting={setting} setSetting={setSetting} setSnakMessage={setSnakMessage} />
      }
      <Table aria-label="simple table" size='small'>
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data && data.map((row: any) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="right">
                <Link href='#' onClick={() => setSetting(row)}>{row.name}</Link>
              </TableCell>
              <TableCell align="right">{row.value}</TableCell>
            </TableRow>
          ))}
          {
            (!data || !data.length) && <TableRow><TableCell colSpan={4}><Alert severity="info">No result found!</Alert></TableCell></TableRow>
          }
        </TableBody>
      </Table>
      {
        snakMessage && snakMessage.length > 0 && <CustomSnackbar message={snakMessage} setSnakMessage={setSnakMessage} />
      }
    </TableContainer>
  </>
  );
}
