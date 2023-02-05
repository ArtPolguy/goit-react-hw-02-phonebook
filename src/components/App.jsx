import { Component } from 'react';
import css from './App.module.css';
import { nanoid } from 'nanoid';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import ContactForm from './ContactForm/ContactForm';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };
  handleFilterChange = e => {
    this.setState({ [e.currentTarget.name]: e.currentTarget.value });
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

  handleSubmit = ({ name, number }) => {
    this.setState(prevState => {
      const { contacts } = prevState;
      if (this.isDublicate(name, number)) {
        return alert(`${name} is already in contacts`);
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
  isDublicate = (name, number) => {
    const normalizedName = name.toLowerCase();
    const { contacts } = this.state;
    const isSameContact = contacts.find(contact => {
      return (
        contact.name.toLowerCase() === normalizedName &&
        contact.number === number
      );
    });
    return Boolean(isSameContact);
  };

  render() {
    const { filter } = this.state;
    const contacts = this.filterContacts();

    return (
      <div className={css.container}>
        <h1 className={css.title}>Phonebook</h1>
        <ContactForm onSubmit={this.handleSubmit} />
        <Filter filter={filter} handleFilterChange={this.handleFilterChange} />
        <ContactList contacts={contacts} />
      </div>
    );
  }
}
