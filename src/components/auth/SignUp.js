import React,{Component} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {signUp} from '../../store/actions/authActions'



class SignUp extends Component{
    state={
        email:'',
        password:'',
        firstName:'',
        lastName:'',
        emptyField:null
    }
    handleChange=(e)=>{
        this.setState({
            [e.target.id]:e.target.value
        });

    }
    handleSubmit=(e)=>{
        e.preventDefault();
        if(this.state.email&&this.state.password&&this.state.lastName&&this.state.firstName){
            this.props.signUp(this.state);
            this.setState({
                ...this.state,
                emptyField:null
            })
    
        }else{
            this.setState({
                ...this.state,
                emptyField:'No field can be empty.'
            })
        }
    }
    render(){
        const {auth,authError}=this.props;
        if(auth.uid) return <Redirect to='/'/>
        return(
            <div className="container">
            <form onSubmit={this.handleSubmit} className="white">
                <h5 className="grey-text darken-3">Sign Up</h5>
                <div className="input-field">
                    <label htmlFor="firstName">First Name</label>
                    <input onChange={this.handleChange} type="text" id='firstName'/>
                </div>
                <div className="input-field">
                    <label htmlFor="lastName">Last Name</label>
                    <input onChange={this.handleChange} type="text" id='lastName'/>
                </div>
                <div className="input-field">
                    <label htmlFor="email">Email</label>
                    <input onChange={this.handleChange} type="email" id='email'/>
                </div>
                <div className="input-field">
                    <label htmlFor="password">Password</label>
                    <input onChange={this.handleChange} type="password" id='password'/>
                </div>
                <div className="input-field">
                    <button className="btn green lighten-1 z-depth-0">Submit</button>
                </div>
                <div className="container center red-text">
                   {this.state.emptyField? <p>{this.state.emptyField}</p>:null}
                   {authError? <p>{authError}</p>:null}
            </div>
            </form>
            
            </div>
        );
    }
}
const mapStateToProps=(state)=>{
    return{
        auth:state.firebase.auth,
        authError:state.auth.authError
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        signUp:(newUsr)=>{
            dispatch(signUp(newUsr))
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(SignUp);