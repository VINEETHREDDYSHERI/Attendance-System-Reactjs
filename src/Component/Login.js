import React from 'react';
import {Button,Dialog,DialogContent,DialogTitle
        ,TextField,FormControlLabel,Checkbox} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { withRouter } from 'react-router-dom';

const useStyle=makeStyles(theme=>({
    dialog:{
        boxShadow: '0 4px 10px 4px rgba(19, 35, 47, 0.3)',
        minWidth:'30%',
        padding:20,
        transition: '.5s ease',
        "&:hover":{
            boxShadow: '0px 0px 40px 16px rgba(18,18,18,.3)',
        },
    },
    title:{
        textAlign:'center',
    },
    form:{
        padding:20,
        display:'flex',
        flexDirection:'column',
    },
    fields:{
        marginBottom:20,
    },
    button:{
        marginTop:20
    }
}));
function Login(props) {
  const [open, setOpen] = React.useState(false);
  const classes=useStyle();
  const [val,setValue] = React.useState({
      username:"",
      password:'',
      remember:false
  });
  const handleChange=(name)=>(event)=>{
    if(event.target.value==='remember')
    {
        setValue({...val,[name]:event.target.checked});
    }
    else{
        setValue({...val,[name]:event.target.value});        
    } 
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    //console.log(val.username+" "+val.password+"   "+val.remember);
    const lecture = props.lectures.filter((lecture)=>lecture.emailid===val.username)[0];
    //console.log(lecture);
    if(lecture!=null)
    {
        let path=`/login/${lecture.id}`;
        props.history.push(path);
        props.setLogged(lecture.id);
    }
    //props.addComment(props.dishId,val.rating,val.author,val.comment);
    props.logout();
    setOpen(false);
  };
  return (
    <div>
      <Button variant='contained' color="primary" onClick={handleClickOpen}>
            Login
      </Button>
      <Dialog open={open || props.value} onClose={handleClose} maxWidth='md' classes={{paper:classes.dialog}}>
        <DialogTitle variant='h1' className={classes.title}><b>LOGIN</b></DialogTitle>
        <DialogContent >
            <form className={classes.form}>
                <TextField label="Username" value={val.username} onChange={handleChange('username')}  className={classes.fields}/>
                <TextField label='Password' type="password" value={val.password} onChange={handleChange('password')} className={classes.fields}/>
                <FormControlLabel
                    control={
                    <Checkbox
                        checked={val.remember}
                        onChange={handleChange('remember')}
                        value="remember"
                        color="primary"
                    />
                    }
                    label="Remember me"
                />
                <Button onClick={handleClose} color="primary"  variant='contained' className={classes.button}>
                  Login
                </Button>
            </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
export default withRouter(Login);