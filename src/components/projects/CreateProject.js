import React,{Component} from 'react';
import {createProject} from '../../../src/store/actions/projectActions';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

class CreateProject extends Component{
    state={
        title:'',
        content:'',
        emptyField:null
    }
    handleChange=(e)=>{
        this.setState({
            [e.target.id]:e.target.value
        });
        

    }
    handleSubmit=(e)=>{
        e.preventDefault();
        if(this.state.title&&this.state.content){
            this.props.createNewProject(this.state);
            this.setState({
                title:'',
                content:'',
                emptyField:null
            });
            this.props.history.push('/');
            
            }else{
                this.setState({
                    ...this.state,
                    emptyField:'No field can be empty.'
                })
            }
            
    }
    render(){
        const {auth}=this.props;
        if(!auth.uid) return <Redirect to='signin' />
        return(
            <div className="container">
            <form onSubmit={this.handleSubmit} className="white">
                <h5 className="grey-text darken-3">Create Project</h5>
                <div className="input-field">
                    <label htmlFor="title">Title</label>
                    <input value={this.state.title} onChange={this.handleChange} type="text" id='title'/>
         
                </div>
                <div className="input-field">
                    <label htmlFor="content">Project Content</label>
                    <textarea value={this.state.content} className='materialize-textarea' onChange={this.handleChange} id='content'></textarea>
                </div>
                <div className="input-field">
                    <button className="btn green lighten-1 z-depth-0">Submit</button>
                </div>
                <div className='container red-text center' >
                {this.state.emptyField? <p>{this.state.emptyField}</p>:null}
                </div>
            </form>
            </div>
        );
    }
}

const mapStateToProps=(state)=>{
    return{
        auth:state.firebase.auth
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        createNewProject:(project)=>{
            dispatch(createProject(project));
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(CreateProject);