import React,{useRef} from 'react'
import ContactCard from './ContactCard'
import { Link } from 'react-router-dom';

const ContactList = (props) => {
   //  console.log(props)
     const inputEl = useRef('')
    const deleteData = (id) => {
        props.deleteContact(id)
    }    
       
    const getSearchTearm =()=>{
      props.searchKeyward(inputEl.current.value)
    }   
       
    return (
        <div className='main'>
            <h2>
                Contact List
                <Link to='/add'>
                    <button className='ui button blue right'>Add Contact</button>
                </Link>
            </h2>
            <div className='ui search'>
                <div className='ui icon input'>
                    <input type='text' placeholder='Search Contacts' className='prompt' ref={inputEl}  value={props.term} onChange={getSearchTearm} />
                    <i className='search icon'></i>
                </div>

            </div>
            <div className='ui celled list'>
                {props.contacts.length > 0 ? props.contacts.map(contact => {
                    return (
                        <ContactCard contact={contact} handleClick={deleteData} key={contact.id} />

                    )

                }): "No Contacts Available" }
            </div>
        </div>
    )
}

export default ContactList