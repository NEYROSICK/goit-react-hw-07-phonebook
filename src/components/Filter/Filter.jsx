import cl from './filter.module.css';
import Search from 'components/ui/icons/Search';
import { useDispatch } from 'react-redux';
import debounce from 'lodash.debounce';
import { changeFilter } from 'redux/filterSlice';

const Filter = () => {
  const dispatch = useDispatch();

  const handleFilterChange = e => {
    dispatch(changeFilter(e.target.value));
  };

  const debouncedChange = debounce(handleFilterChange, 300);

  return (
    <div className={cl.filter}>
      <label className={cl.label} htmlFor="filter">
        Find contacts by name || number
      </label>
      <div className={cl.inputField}>
        <input
          className={cl.input}
          type="text"
          name="filter"
          id="filter"
          onChange={debouncedChange}
        />
        <Search />
      </div>
    </div>
  );
};

export default Filter;
