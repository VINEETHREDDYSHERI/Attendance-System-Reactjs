import React from 'react';
import Navbar from './Navbar';
import {withStyles} from '@material-ui/core';
import PropTypes from 'prop-types';
import { maxHeight } from '@material-ui/system';
import {Switch,Route,Redirect} from 'react-router-dom';
import {LECTURES} from '../shared/lecture';
import {SECTIONS} from '../shared/sections';
import Lecture from './Lecture';
import Testing from './test'
const useStyles = () => ({
    root:{
        height:maxHeight,
    },
    shift:{
        marginLeft:240,
    },
})
class Main extends React.Component{
    constructor(props)
    {
        super(props);
        this.state={
            open:false,
            lectures:LECTURES,
            sections:SECTIONS
        }
        this.LectureWithId = this.LectureWithId.bind(this)
        
    }
    setOpen(val)
    {
        this.setState({open:val})
    }
    LectureWithId({match})
    {
        //console.log(match.params.id);
        return(
            <Lecture lecture={this.state.lectures.filter((lecture)=>
                lecture.id===parseInt(match.params.id,10)
                )[0]} />
        );

    }
    render()
    {
        return(
            <div>
                <Navbar drawerShift={(val)=>this.setOpen(val)} open={this.state.open} lectures={this.state.lectures}/>
                <Switch>
                    <Route path='/login/:id' component={this.LectureWithId} />}/>
                    <Redirect default to='/home'/>
                </Switch>
                <Testing />
            </div>
        );
    }

}

Main.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(useStyles)(Main);