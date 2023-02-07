import { Component } from 'react';
import { nanoid } from 'nanoid';

import css from './App.module.css';
import items from './items';

import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import ContactForm from './ContactForm/ContactForm';

export class App extends Component {
  state = {
    contacts: [...items],
    filter: '',
  };

  handleFilterChange = e => {
    this.setState({ [e.currentTarget.name]: e.currentTarget.value });
  };

  handleSubmit = ({ name, number }) => {
    this.setState(prevState => {
      const { contacts } = prevState;
      if (this.isDublicate(name, number)) {
        alert(`${name} is already in contacts`);
        return;
      }
      const objContact = {
        id: nanoid(),
        name,
        number,
      };
      return {
        contacts: [...contacts, objContact],
      };
    });
  };

  deleteContact = id => {
    this.setState(({ contacts }) => {
      const updateContacts = contacts.filter(contact => contact.id !== id);
      return { contacts: updateContacts };
    });
  };

  filterContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();
    if (!filter) {
      return contacts;
    }
    const result = contacts.filter(
      ({ name, number }) =>
        name.toLowerCase().includes(normalizedFilter) ||
        number.includes(normalizedFilter)
    );

    return result;
  };

  isDublicate = (name, number) => {
    const normalizedName = name.toLowerCase();
    const { contacts } = this.state;
    const sameContact = contacts.find(contact => {
      return (
        contact.name.toLowerCase() === normalizedName ||
        contact.number === number
      );
    });
    return Boolean(sameContact);
  };

  render() {
    const { filter } = this.state;
    const contacts = this.filterContacts();
    const isContacts = Boolean(contacts.length);

    return (
      <div className={css.container}>
        <h1 className={css.title}>Phonebook</h1>
        <ContactForm onSubmit={this.handleSubmit} />
        <Filter filter={filter} handleFilterChange={this.handleFilterChange} />
        {isContacts ? (
          <ContactList contacts={contacts} deleteContact={this.deleteContact} />
        ) : (
          <p>There are no contacts in list</p>
        )}
      </div>
    );
  }
}
