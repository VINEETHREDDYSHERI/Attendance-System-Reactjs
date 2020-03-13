import React from 'react';
import clsx from 'clsx';
import { AppBar,Toolbar,IconButton,Typography,Divider,List,ListItem,ListItemIcon,ListItemText,Drawer,Button } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import InfoIcon from '@material-ui/icons/Info';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import HelpIcon from '@material-ui/icons/Help';
import HomeIcon from '@material-ui/icons/Home';
import Login from './Login'
import {NavLink,withRouter} from 'react-router-dom';

const drawerWidth=240;
const useStyles =() => ({
    root: {
      display:'flex',
      flexDireaction:'row',
      width:'100%'
    },
    title: {
      flexGrow: 1,
      fontFamily:'-apple-system'
    },
    menu:{
      display:'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
    },
    hide: {
    display: 'none',
    },
    drawer: {
    width: drawerWidth,
    flexShrink: 0,
    },
    drawerPaper: {
    width: drawerWidth,
    },
    drawerHeader: {
    height:'64px',
    display: 'flex',
    justifyContent: 'flex-end',
    },
});
function Navbar(props)
{
    const [loginVal,openLogin]=React.useState(false);
    const [logged,setLog]=React.useState(-1);
    const handleDrawerOpen = () => {
        props.drawerShift(true);
    };
    
    const handleDrawerClose = () => {
        props.drawerShift(false);
    };
    const login=()=>{
        openLogin(true);
    }
    const setLogged=(val)=>{
        if(val===-1)
        {
            let path=`/home`;
            props.history.push(path);
        }
        setLog(val);
        console.log(val);
    }
    const logout=()=>{
        if(logged!==-1)
        {
            props.drawerShift(false);
        }
        openLogin(false);
        
    }
        const classes=props.classes;
        return(
            <div className={clsx(classes.root,props.open && classes.appBarShift)}>
                <AppBar position='static' color='secondary' >
                    <Toolbar>
                        <IconButton color='default' onClick={handleDrawerOpen} className={clsx(props.open && classes.hide)}>
                            <MenuIcon/>
                        </IconButton>
                        <Typography className={classes.title} align='center' variant='h6'>
                        Welcome To Attendance System
                        </Typography>
                        {logged===-1?(<Login value={loginVal} logout={()=>logout()} lectures={props.lectures}
                        setLogged={(val)=>setLogged(val)}/>):
                        (<Button color='primary' variant='contained' onClick={()=>setLogged(-1)}>Logout</Button>)}
                    </Toolbar>
                </AppBar>
                <Drawer
                    className={classes.drawer}
                    variant="temporary"
                    anchor="left"
                    open={props.open}
                    classes={{
                    paper: classes.drawerPaper,
                    }}
                    ModalProps={{ onBackdropClick: handleDrawerClose }}
                >
                    <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                    </div>
                    <Divider />
                    <List>
                        <NavLink to='/home' style={{textDecoration:'none'}}>
                            <ListItem button>
                                <ListItemIcon><HomeIcon color='primary'/></ListItemIcon>
                                <ListItemText>Home</ListItemText>
                            </ListItem>
                        </NavLink>
                        <NavLink to='/login' style={{textDecoration:'none'}}>
                            <ListItem button onClick={()=>login()}>
                                <ListItemIcon><AccountCircleIcon color='primary'/></ListItemIcon>
                                <ListItemText>Login</ListItemText>
                            </ListItem>
                        </NavLink>
                        <NavLink to='/signup' style={{textDecoration:'none'}}>
                            <ListItem button>
                                <ListItemIcon><ExitToAppIcon color='primary'/></ListItemIcon>
                                <ListItemText>Signup</ListItemText>
                            </ListItem>
                        </NavLink>
                        <NavLink to='/aboutUs' style={{textDecoration:'none'}}>
                            <ListItem button>
                                <ListItemIcon><InfoIcon color='primary'/></ListItemIcon>
                                <ListItemText>AboutUs</ListItemText>
                            </ListItem>
                        </NavLink>
                        <NavLink to='/help' style={{textDecoration:'none'}}>
                            <ListItem button>
                                <ListItemIcon><HelpIcon color='primary'/></ListItemIcon>
                                <ListItemText >Help</ListItemText>
                            </ListItem>
                        </NavLink>
                    </List>
                </Drawer>
            </div>
        );
    }
Navbar.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(useStyles)((withRouter)(Navbar));