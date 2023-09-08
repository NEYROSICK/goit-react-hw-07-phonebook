import ContactItem from 'components/ContactItem';
import cl from 'components/ContactList/contactList.module.css';
import { useSelector } from 'react-redux';
import { getContacts, getFilter } from 'redux/selectors';

const ContactList = () => {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);

  const containsNumbers = inputString => {
    const regex = /\d/;
    return regex.test(inputString);
  };

  const containsOnlyNumbersRelated = inputString => {
    const regex = /^[\d()\-\s]+$/;
    return regex.test(inputString);
  };

  const containsOnlyNumbers = inputString => {
    const regex = /^\d+$/;
    return regex.test(inputString);
  };

  const filterContacts = () => {
    if (containsOnlyNumbersRelated(filter)) {
      const filteredList = contacts.filter(contact => {
        const temp =
          contact.number
            .split('')
            .filter(digit => {
              return containsOnlyNumbers(digit);
            })
            .join('')
            .includes(filter) ||
          contact.number
            .split(' ')
            .filter(num => num !== '')
            .join('')
            .includes(
              filter
                .split(' ')
                .filter(num => num !== '')
                .join('')
            );
        return temp;
      });
      return filteredList;
    } else if (containsNumbers(filter)) {
      return [];
    } else {
      const filteredList = contacts.filter(contact => {
        return contact.name.toLowerCase().includes(filter.toLowerCase());
      });
      return filteredList;
    }
  };

  const renderContactList = () => {
    if (!contacts.length) {
      return (
        <p className={cl.emptyMessage}>
          Complete Emptiness {':('}
          <br /> Try to add some contacts to your phonebook
        </p>
      );
    } else if (!filterContacts().length && filter) {
      return (
        <p className={cl.emptyMessage}>
          Sorry, there is no such contact in your phonebook
        </p>
      );
    } else {
      return (
        <ul className={cl.list}>
          {filterContacts().map(contact => {
            return (
              <ContactItem
                key={contact.id}
                name={contact.name}
                number={contact.number}
                url={'https://cdn-icons-png.flaticon.com/128/1177/1177568.png'}
              />
            );
          })}
        </ul>
      );
    }
  };

  return renderContactList();
};

export default ContactList;
