import React from 'react';
import history from '../history';

class EditContact extends React.Component {
   constructor(props){
       super(props)
       const  {id,name,email} = props.location.state.contact;
       this.state= {
           id,
           email,
           name
       }
   }

handleChange = (e)=>{
    this.setState({
       [e.target.name]: e.target.value
    })
}

handleUpdate =(e)=>{
e.preventDefault();
if(this.state.name == '' || this.state.email == ''){
    alert('All the field are mandotary')
    return
}

      this.props.editContactHandler(this.state);
    
      this.setState({name: '',email:''})
     this.props.history.push('/')

 
}
    render() {

        const {name,email} = this.state
        return (
            <div className='ui main'>
                <h2>Edit Contact</h2>
                <form className='ui form' onSubmit={this.handleUpdate}>
                    <div className='field'>
                        <label>Name</label>
                        <input type='text' name='name' value={name} placeholder='Enter Name' onChange={this.handleChange} />
                    </div>
                    <div className='field'>
                        <label>Email</label>
                        <input type='text' name='email' value={email}  placeholder='Enter Email' onChange={this.handleChange} />
                    </div>
                    <button className='ui button blue' type='submit' >Update</button>
                </form>
            </div>
        )
    }
}

export default EditContact