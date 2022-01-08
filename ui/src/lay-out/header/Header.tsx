import { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';

import { Link as RouterLink } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import {
  checkLogin,
  getAuth
} from "../../api/users/AuthenticationSlice";

const pages = [    
    {
        title: 'About',
        url: '/about'
    },
    {
        title: 'Contact',
        url: '/contact'
    },
    {
        title: 'Terms',
        url: '/terms'
    }
];


const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const [loggedMenu, setLoggedMenu] = useState<any>({
    settings: [],
    main: []
  });

  const dispatch = useDispatch();
  const { token } = useSelector(getAuth);
  
  const handleOpenNavMenu = (event: any) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: any) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  useEffect(() => {     
    dispatch(checkLogin(null));        
  }, []);

  useEffect(() => {
    if(token && token.token) {
      setLoggedMenu({
        settings: [
            {
              title: 'Change Password',
              url: '/change-password'
            },
            {
              title: 'Sign Out',
              url: '/signOut'
            }
          ],
        main: [
          {
            title: 'Dashboard',
            url: '/admin'
          },         
          {
            title: 'Categories',
            url: '/admin/categories'
          },
          {
            title: 'Employers',
            url: '/admin/employers'
          },
          {
            title: 'Job Seekers',
            url: '/admin/job-seekers'
          },
          {
            title: 'Settings',
            url: '/admin/settings'
          }
        ]
      });
    }
  }, [token]);

  
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap            
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
            component={RouterLink} to='/' >
            Job Protal
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {[...pages, ...loggedMenu?.main].map((page, idx) => (
                <MenuItem key={idx} onClick={handleCloseNavMenu} component={RouterLink} to={page.url}  >
                  <Typography textAlign="center"   >{page.title}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {[...pages, ...loggedMenu?.main].map((page, idx) => (
              <Button
                key={idx}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}  
                component={RouterLink} to={page.url}              
              >                  
                {page.title}
              </Button>
            ))}
          </Box>
          {
            loggedMenu?.settings && loggedMenu?.settings.length > 0 && <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              { loggedMenu?.settings.map((setting:any, idx:number) => (<MenuItem key={idx} onClick={handleCloseNavMenu} component={RouterLink} to={setting.url}>
                  <Typography textAlign="center">{setting.title}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          }
          
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;