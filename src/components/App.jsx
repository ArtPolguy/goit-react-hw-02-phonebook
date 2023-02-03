import { Component } from 'react';
import css from './App.module.css';
import { nanoid } from 'nanoid';

export class App extends Component {
  state = {
    contacts: [],
    name: '',
    number: '',
  };
  nameInputId = nanoid();
  numberInputId = nanoid();

  handleInputChange = e => {
    this.setState({ [e.currentTarget.name]: e.currentTarget.value });
  };

  handleBtnSubmit = e => {
    e.preventDefault();
    const { name, number } = this.state;

    this.setState(prevState => ({
      contacts: [...prevState.contacts, { name, number, id: nanoid() }],
    }));

    console.log(this.state);
  };

  render() {
    const { name, contacts, number } = this.state;
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
        <ul>
          {/* {contacts.map((contact, index) => {
            return <li key={name}>{contact}</li>;
          })} */}
        </ul>
      </div>
    );
  }
}
