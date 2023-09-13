import ContactForm from './components/ContactForm';
import Filter from 'components/Filter';
import ContactList from 'components/ContactList';
import Section from 'components/Section';
import cl from 'components/ContactList/contactList.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchContacts } from 'redux/operations';
import { getContacts, getError, getIsLoading } from 'redux/selectors';
import ErrorMsg from 'components/ErrorMsg';

export default function App() {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);
  const isLoading = useSelector(getIsLoading);
  const error = useSelector(getError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <>
      <Section title="Phonebook" variant="phonebook">
        <ContactForm />
      </Section>

      <Section title="Contacts" variant="contacts">
        <Filter />

        {isLoading && <></>}

        {error && <ErrorMsg />}

        {contacts.length > 0 && <ContactList />}

        {!contacts.length && !error && (
          <p className={cl.emptyMessage}>
            Complete Emptiness {':('}
            <br /> Try to add some contacts to your phonebook
          </p>
        )}
      </Section>
    </>
  );
}
