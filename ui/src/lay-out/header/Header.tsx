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


import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

import { Link as RouterLink } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import {
  checkAuth,
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
  const [drawerState, setDrawerState] = useState(false);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const [loggedMenu, setLoggedMenu] = useState<any>({
    settings: [],
    main: []
  });

  const toggleDrawer = (open:boolean) => (event: any) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerState(open);    
  };

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
    dispatch(checkAuth());        
  }, []);

  useEffect(() => {
    if(token && token.token) {
      if(token.token?.role_id == 1){
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
              title: 'Blogs',
              url: '/admin/blogs'
            },
            {
              title: 'Settings',
              url: '/admin/settings'
            },
          ]
        });
      }else{
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
          ]
        });
      }
      
    }else{
      setLoggedMenu({
        settings: [],
        main: [
          {
            title: 'Sign In',
            url: '/sign-in'
          }
        ]
      });
    }
  }, [token]);

  
  return (
    <AppBar position="sticky">
       

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
              onClick={toggleDrawer(true)}
              // onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Drawer
                  anchor="left"
                  open={drawerState}
                  onClose={toggleDrawer(false)}
                >
                  <List sx={{ minWidth: '120px'}}>
                  {[...pages, ...loggedMenu?.main].map((page, idx) => (
                    <ListItem key={idx} onClick={toggleDrawer(false)} component={RouterLink} to={page.url}  >                      
                      <ListItemText primary={page.title} />
                    </ListItem>
                  ))}
                  </List>
            </Drawer> 
            
            
          </Box>
          <Typography
            variant="h6"
            noWrap            
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
            component={RouterLink} to='/' >
            Job Protal
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