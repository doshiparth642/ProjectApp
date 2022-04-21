import React, { useState, useEffect } from "react";
import './App.css';
import Header from './Header';
import AddContact from './AddContact';
import ContactList from './ContactList';
import ContactDetail from "./ContactDetail";
import { uuid } from "uuidv4";
import { Route, Switch, Redirect } from "react-router-dom";
import api from '../api/contacts'
import EditContact from "./EditContact";


function App() {
  const [contacts, setContacts] = useState([]);
  const [searchTearm,setSearchTearm] = useState('') 
  const [searchResults,setSearchResults] =useState([])

//retrieve contacts
         
const retriveContacts = async() =>{
  const response = await api.get('/contact');
  return response.data
}
     
  
  const addContactHandler = async (contact) => {
    console.log(contact);
    const request = {
      id: uuid(),
      ...contact
    };
    
    const response = await api.post('/contact', contact)
    setContacts([...contacts, response.data]);
   // console.log(contacts)
  }
         
  const editContactHandler = async(contact)=>{
        const response = await api.put(`/contact/${contact.id}`,contact)
        console.log(response.data);
        const {id,name,email}= response.data
        setContacts(contacts.map((contact)=>{
             return contact.id === id ? {...response.data} : contact;
        }))
  }  

  const deleteContactHandler = async (id) => {
    await api.delete(`/contact/${id}`)
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });

  
    setContacts(newContactList);
  }           
      
  const searchHandler = (searchTearm)=>{
   setSearchTearm(searchTearm)
   if(searchTearm !== ''){
     const newContactList = contacts.filter((contact)=>{
     return  Object.values(contact).join('').toLowerCase().includes(searchTearm.toLowerCase())
    
     })
     setSearchResults(newContactList)
   }
   else{
     setSearchResults(contacts)
   }
  }

  useEffect(() => {
  //  const retriveContacts = JSON.parse(localStorage.getItem('contacts'));
    //setContacts(retriveContacts)
    const getAllContacts = async()=>{
       const allContacts =await retriveContacts();
       if(allContacts) setContacts(allContacts);
  
    }

    getAllContacts();
  }, [])

  /*useEffect(() => {
  //  localStorage.setItem('contacts', JSON.stringify(contacts))
  }, [contacts])*/
  return (

    <div className="ui container">
      
      <Header />
      <Switch>
        <Route path='/' render={(props) => (
          <ContactList
            {...props}
            contacts={searchTearm.length < 1 ? contacts: searchResults}
            deleteContact={deleteContactHandler}
            term={searchTearm}
            searchKeyward = {searchHandler}
          />
        )} exact
         />  
                     
        <Route path='/add' render={(props) => (<AddContact
          {...props}
          addConatctHandler={addContactHandler}
        />
        )} 
        />
                
    <Route path='/edit' render={(props) => (<EditContact
          {...props}
          editContactHandler={editContactHandler}
        />
        )} 
        />
        <Route path='/contact/:id' component={ContactDetail} />
        <Redirect to='/' />
      </Switch>
    

    </div>
  )
}

export default App;
