import css from './Filter.module.css';

const Filter = ({ filter, handleFilterChange }) => {
  return (
    <>
      <h2>Contacts</h2>
      <label className={css.findNameLabel}>
        Find contacts by name:
        <input
          className={css.inputFilter}
          type="text"
          name="filter"
          value={filter}
          onChange={handleFilterChange}
        />
      </label>
    </>
  );
};

export default Filter;
