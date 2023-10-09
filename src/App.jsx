import React, { Component } from 'react';
import ContactForm from './components/ContactForm/ContactForm';
import { ContactList } from 'components/ContactList/ContactList';
import { Filter } from 'components/Filter/Filter';
import { Theme, TitleForm, TitleContact } from './App.styled';
// import contactData from '../src/contactData.json';

export default class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const storageContacts = localStorage.getItem('contact');
    const parsedContacts = JSON.parse(storageContacts) ?? [];
    this.setState({
      contacts: parsedContacts,
    });
  }

  componentDidUpdate(_, prevState) {
    if (this.state.contacts.length !== prevState.contacts.length) {
      const storageContacts = JSON.stringify(this.state.contacts);
      localStorage.setItem('contact', storageContacts);
    }
  }

  onAddContact = newContact => {
    const hasNameContact = this.state.contacts.some(
      contact => contact.name === newContact.name
    );
    if (hasNameContact) {
      alert(`${newContact.name} is already in contacts`);
      return;
    }
    this.setState(prevState => {
      return {
        contacts: [newContact, ...prevState.contacts],
      };
    });
  };

  onDeleteContact = contactId => {
    console.log(this.state.contacts);
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  onInputContact = event => {
    const searchContact = event.target.value.toLowerCase();
    this.setState({ filter: searchContact });
  };

  findContact = () => {
    return this.state.contacts.filter(({ name }) =>
      name.toLowerCase().includes(this.state.filter)
    );
  };

  render() {
    const filteredContacts = this.findContact();
    return (
      <Theme>
        <TitleForm>Phonebook</TitleForm>
        <ContactForm onAddContact={this.onAddContact} />
        <TitleContact>Contacts</TitleContact>
        <Filter
          filter={this.state.filter}
          onInputContact={this.onInputContact}
        />
        <ContactList
          contacts={filteredContacts}
          deleteContact={this.onDeleteContact}
        />
      </Theme>
    );
  }
}
