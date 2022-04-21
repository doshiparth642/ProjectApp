import React from 'react';
import history from '../history';

class AddContact extends React.Component {
 
      state={
        name: '',
        email: ''
      }

handleChange = (e)=>{
    this.setState({
       [e.target.name]: e.target.value
    })
}

handleSubmit =(e)=>{
e.preventDefault();
if(this.state.name == '' || this.state.email == ''){
    alert('All the field are mandotary')
    return
}

      this.props.addConatctHandler(this.state);
    
      this.setState({name: '',email:''})
     this.props.history.push('/')

//console.log(this.props)
 
}
    render() {

        const {name,email} = this.state
        return (
            <div className='ui main'>
                <h2>Add Contact</h2>
                <form className='ui form' onSubmit={this.handleSubmit}>
                    <div className='field'>
                        <label>Name</label>
                        <input type='text' name='name' value={name} placeholder='Enter Name' onChange={this.handleChange} />
                    </div>
                    <div className='field'>
                        <label>Email</label>
                        <input type='text' name='email' value={email}  placeholder='Enter Email' onChange={this.handleChange} />
                    </div>
                    <button className='ui button blue' type='submit' >Add</button>
                </form>
            </div>
        )
    }
}

export default AddContact