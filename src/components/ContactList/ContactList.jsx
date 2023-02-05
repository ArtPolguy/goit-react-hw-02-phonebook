import css from './ContactList.module.css';

const ContactList = ({ contacts }) => {
  const contactList = contacts.map(({ id, name, number }) => {
    return (
      <li key={id}>
        <span>{name}: </span>
        <span>{number}</span>
      </li>
    );
  });
  return <ul>{contactList}</ul>;
};

export default ContactList;
