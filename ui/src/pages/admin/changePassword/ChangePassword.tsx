import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

export default function ChangePassword(){
    return (
        <div>
            <Typography gutterBottom variant="h5" component="div">
                Change Password
            </Typography>
            <form>
                <TextField
                    id="standard-basic"
                    label="Old Password"
                    type="password"
                    margin="normal"
                />
                <TextField
                    id="standard-basic"
                    label="New Password"
                    type="password"
                    margin="normal"
                />
                <TextField
                    id="standard-basic"
                    label="Confirm Password"
                    type="password"
                    margin="normal"
                />
                <Button variant="contained" color="primary">
                    Change Password
                </Button>
            </form>
        </div>        
    )
}    