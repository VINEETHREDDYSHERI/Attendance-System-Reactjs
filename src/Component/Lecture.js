import React from 'react';
import {Typography,ExpansionPanel,ExpansionPanelSummary,ExpansionPanelDetails,Button} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles =makeStyles(theme => ({
    root: {
      display:'flex',
      flexDirection:'column',
      width:'40%',
      paddingLeft:'30%',
      paddingTop:'2%'
    },
    expane:{
        backgroundColor:'rgba(100,100,100,0.2)',
        display:'flex',
        flexDirection:'column',
        margin:5,
        justifyContent: 'center',
        alignItems:'center'
    },
    year:{
        display:'flex',
    }
}));

function Year(props)
{
    const val={
        1:"FIRST YEAR",
        2:"SECOND YEAR",
        3:"THIRD YEAR",
        4:"FOURTH YEAR"
    }
    const year=props.dept.map((y)=>{
        return(
            <Button variant="contained" color="primary" style={{margin:4}}>
                {val[y]}
            </Button>
        );
    })
    return(
        <div>{year}</div>
        
    );
}
export default function Lecture(props)
{
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = panel => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    };
    const classes=useStyles();
    const val={
        'cse':"COMPUTER SCIENCE AND ENGINEERING",
        'bio':"BIO TECHNOLOGY",
        'it':"INFORMATION TECHNOLOGY",
        'mech':"MECHINCAL ENGINEERING"
    }
    const teaching=props.lecture.teachingDept.map((dept)=>{
        return(
            <div className={classes.root}>
                <ExpansionPanel  expanded={expanded === dept} onChange={handleChange(dept)}
                    className={classes.expane} elevation={3}>
                    <ExpansionPanelSummary style={{textAlign:'center'}}>
                        <Typography>{val[dept]}</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails className={classes.year}>
                        <Year dept={props.lecture[dept]} />
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>
        );
    });
    return(
        <div>
            {teaching}
        </div>
    );
} 