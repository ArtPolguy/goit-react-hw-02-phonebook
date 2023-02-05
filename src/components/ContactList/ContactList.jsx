import css from './ContactList.module.css';
import PropTypes from 'prop-types';

const ContactList = ({ contacts, deleteContact }) => {
  const contactList = contacts.map(({ id, name, number }) => {
    return (
      <li className={css.contactListItem} key={id}>
        <span>{name}: </span>
        <span>{number}</span>
        <button
          className={css.deleteBtn}
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
  return <ul className={css.contactList}>{contactList}</ul>;
};

export default ContactList;

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      number: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    })
  ).isRequired,
};
