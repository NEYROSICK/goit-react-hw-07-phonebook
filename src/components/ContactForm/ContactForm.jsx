import { useState } from 'react';
import cl from './contactForm.module.css';
import Plus from 'components/ui/icons/Plus';
import clsx from 'clsx';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { useDispatch, useSelector } from 'react-redux';
import {
  getCheckedContactName,
  getCheckedContactNumber,
} from 'redux/selectors';
import { addContact } from 'redux/operations';

Notify.init({
  useIcon: false,
  timeout: 5000,
  fontSize: '14px',
  borderRadius: '20px',
  className: cl.message,
  warning: {
    background: '#ff0066',
  },
});

export default function ContactForm() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const dispatch = useDispatch();

  const nameClone = useSelector(getCheckedContactName(name));
  const numberClone = useSelector(getCheckedContactNumber(number));

  const reset = () => {
    setName('');
    setNumber('');
  };

  const checkDuplicates = (nameClone, numberClone) => {
    if (nameClone && numberClone && nameClone.name === numberClone.name) {
      Notify.warning(
        `Maaan, do you lost your eyeballs? Exact same!!! Ok I'll give you another chance ;)`
      );
    } else if (nameClone || numberClone) {
      if (nameClone) {
        Notify.warning(
          `Warning! Contact with name "${nameClone.name}" is already in your phonebook`
        );
      }

      if (numberClone) {
        Notify.warning(
          `Warning! Contact "${numberClone.name}" in your phonebook already has this number: "${numberClone.number}"`
        );
      }
    } else {
      return true;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (!checkDuplicates(nameClone, numberClone)) {
      return;
    }

    const newContact = {
      name: name
        .trim()
        .split(' ')
        .filter(word => word !== '')
        .join(' '),
      number: number,
    };

    dispatch(addContact(newContact));
    reset();
  };

  const handleChange = e => {
    e.target.name === 'name'
      ? setName(e.target.value)
      : setNumber(e.target.value);
  };

  return (
    <form className={cl.form} onSubmit={handleSubmit}>
      <div className={cl.inputContainer}>
        <div className={cl.inputField}>
          <input
            className={clsx(cl.input, cl['name'])}
            type="text"
            name="name"
            id="name"
            pattern="^[a-zA-Zа-яА-ЯІіЇїҐґ' \-\u0400-\u04FF]+$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            onChange={handleChange}
            value={name}
            placeholder="Stepan Bandera"
          />
          <label className={cl.label} htmlFor="name">
            Name
          </label>
        </div>

        <div className={cl.inputField}>
          <input
            className={clsx(cl.input, cl['number'])}
            type="tel"
            name="number"
            id="number"
            pattern="[0-9+\-\(\) ]*"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            onChange={handleChange}
            value={number}
            placeholder="(063) 967-21-44"
          />
          <label className={cl.label} htmlFor="number">
            Number
          </label>
        </div>
      </div>
      <button className={cl.button}>
        <Plus />
      </button>
    </form>
  );
}
