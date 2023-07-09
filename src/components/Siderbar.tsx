import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Header from './Header';
import Logo from './Logo';
import { TbLayoutBoardSplit } from "react-icons/tb";
import Toggler from './Toggler';
import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from '../store/store'
import { useEffect } from 'react';
// import './style/Toggler.css'
import './style/Mui.css'
import VisibilityIcon from '@mui/icons-material/Visibility';
import Add_board from './add_board';
import BoardsList from './Boards_list';

const drawerWidth = 240;
const appbarheight = 74;



const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));


type PersistentDrawerLeftProps = {
  children : React.ReactNode
}

export default function PersistentDrawerLeft({children} : PersistentDrawerLeftProps) {

 

  const BoardsCount =  useSelector((state: RootState) => state.Boards.boards_counter)
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const Current_Theme = useSelector((state: RootState) => state.Theme.Theme_mode)

  var color;
  if(Current_Theme == true){
    color = '#2B2C37';
  
  }
  else{
    color = 'white';
   
  }

  //true means darkmode
  useEffect(() => {
  
    const htmlElement = document.documentElement;
    htmlElement.style.setProperty("--bg-color", Current_Theme === true ? "#20212C" : "#E4EBFA");
    console.log(htmlElement.style);
  }, [Current_Theme]);

  useEffect(() => {
  
    const htmlElement = document.documentElement;
    htmlElement.style.setProperty("--text-color", Current_Theme === true ? "white" : "black");
    // console.log(htmlElement.style);
  }, [Current_Theme]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  //window.innerheight - (height of appbar) number like drawerwidth not px + margintop

  return (
<>
   
    <Box sx={{ display: 'flex' , height:'100vh'}}>
      <CssBaseline />

      {/* i removed the position fixed from the AppBar */}
      <AppBar open={open}
      
      sx={{
        height: appbarheight,
      }}
      
      > 


        <Toolbar sx={{display:'flex' ,flex:'1' , backgroundColor: `${color}`}}> 
       {/* background color of header here */}
          <Header open={open}/>
        </Toolbar>
      </AppBar>
    
      <Drawer
        sx={{

          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: `${color}`
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader sx={{marginBottom:'10px', alignItems:'start'}}>
            <Logo/>
        </DrawerHeader>
        <Divider />
        <Box sx={{textAlign:'start', marginTop:'20px',paddingLeft:'36px',fontWeight:'700'}}>
  
        <div className='allboards'> All Boards ({BoardsCount})</div>
       
    

        </Box>

        <Box sx={{display:'flex', flexDirection:'column' , justifyContent:'space-between', height: '100%'}}>

        <BoardsList />
        <Add_board/>
        <Divider />
        
        <Toggler/>
      
  
        </Box>
        
        <div className='sidebar-btn-parent'>
                  
        <button  onClick={handleDrawerClose} className='sidebar-btn' style={{ backgroundColor: `${color}` , color:'#828FA3' }}> 
          
          Hide Sidebar
        </button>

        </div>


      </Drawer>
      <Main open={open} sx={{ marginTop: `${appbarheight}px`,height:`100% - ${appbarheight}px`}}>
      {!open && 
       
       <button
       className='external-btn'
          style={{
            backgroundColor:'#635FC7',
            position: 'absolute',
            left:'0px',
            bottom: '5%',
            transform: 'translateY(-50%)',
            padding: '8px',
            border:'none',

          }}
          onClick={handleDrawerOpen}
        >
       <VisibilityIcon sx={{color:'white'}}/>
        </button>
    
        
        }
         {children }
     
      </Main>
    </Box>
    </>
  );

}