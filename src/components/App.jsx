import { Component } from 'react';
import css from './App.module.css';
import { nanoid } from 'nanoid';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
    name: '',
    number: '',
  };
  nameInputId = nanoid();
  numberInputId = nanoid();

  handleInputChange = e => {
    this.setState({ [e.currentTarget.name]: e.currentTarget.value });
    this.filterContacts(e.currentTarget.value);
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

  handleBtnSubmit = e => {
    e.preventDefault();

    this.setState(prevState => {
      const { name, number, contacts } = prevState;
      const objContact = {
        id: nanoid(),
        name,
        number,
      };
      return {
        contacts: [...contacts, objContact],
        name: '',
        number: '',
      };
    });
    console.log(this.state);
  };

  render() {
    const { name, number, filter } = this.state;
    const contacts = this.filterContacts();
    const contactList = contacts.map(({ id, name, number }) => {
      return (
        <li key={id}>
          <span>{name}: </span>
          <span>{number}</span>
        </li>
      );
    });
    return (
      <div className={css.container}>
        <h1 className={css.title}>Phonebook</h1>
        <form className={css.frame} onSubmit={this.handleBtnSubmit}>
          <label htmlFor={this.nameInputId}> Name</label>

          <input
            id={this.nameInputId}
            className={css.input}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            value={name}
            onChange={this.handleInputChange}
          />
          <label htmlFor={this.numberInputId}> Number</label>
          <input
            id={this.numberInputId}
            className={css.input}
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            value={number}
            onChange={this.handleInputChange}
          />
          <button className={css.submitBtn} type="submit">
            Add contact
          </button>
        </form>
        <h2>Contacts</h2>
        <label className={css.findNameLabel}>
          Find contacts by name:
          <input
            className={css.input}
            type="text"
            name="filter"
            value={filter}
            onChange={this.handleInputChange}
          />
        </label>
        <ul>{contactList}</ul>
      </div>
    );
  }
}
