import css from './ContactList.module.css';

const ContactList = ({ contacts, deleteContact }) => {
  const contactList = contacts.map(({ id, name, number }) => {
    return (
      <li key={id}>
        <span>{name}: </span>
        <span>{number}</span>
        <button
          onClick={() => {
            deleteContact(id);
          }}
          type="button"
        >
          Delete
        </button>
      </li>
    );
  });
  return <ul>{contactList}</ul>;
};

export default ContactList;
