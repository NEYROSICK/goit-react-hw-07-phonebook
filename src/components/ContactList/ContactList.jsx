import ContactItem from 'components/ContactItem';
import cl from 'components/ContactList/contactList.module.css';
import { useSelector } from 'react-redux';
import { getfilteredContacts } from 'redux/selectors';

const ContactList = () => {
  const filteredContacts = useSelector(getfilteredContacts);

  return (
    <>
      {!filteredContacts.length && (
        <p className={cl.emptyMessage}>
          Sorry, there is no such contact in your phonebook
        </p>
      )}

      {filteredContacts.length > 0 && (
        <ul className={cl.list}>
          {filteredContacts.map(contact => {
            return (
              <ContactItem
                key={contact.id}
                id={contact.id}
                name={contact.name}
                number={contact.number}
                url={'https://cdn-icons-png.flaticon.com/128/1177/1177568.png'}
              />
            );
          })}
        </ul>
      )}
    </>
  );
};

export default ContactList;
