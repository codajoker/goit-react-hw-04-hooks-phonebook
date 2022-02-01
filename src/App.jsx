import { useEffect, useState } from 'react';
import { Section, Form, ListContact, Filter } from './components';
import { nanoid } from 'nanoid';
function App() {
  let [contacts, setContacts] = useState(() => {
    return JSON.parse(window.localStorage.getItem('contacts')) ?? [];
  });
  let [filter, setFilter] = useState('');
  const addContact = data => {
    if (
      contacts.find(contact => {
        return (
          contact.name.toLocaleLowerCase() === data.name.toLocaleLowerCase()
        );
      })
    ) {
      return alert(`${data.name} is already in contacts`);
    }
    setContacts(prevState => {
      return [
        { name: data.name, id: nanoid(), number: data.number },
        ...prevState,
      ];
    });
  };
  const addFilter = e => {
    setFilter(e.target.value);
  };
  const findContact = () => {
    const filterContact = contacts.filter(contact => {
      return contact.name
        .toLocaleLowerCase()
        .includes(filter.toLocaleLowerCase());
    });
    return filterContact;
  };
  const deleteContact = id => {
    setContacts(prevContacts => {
      return prevContacts.filter(contact => contact.id !== id);
    });
  };

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);
  return (
    <>
      <Section title="Phonebook">
        <Form onSubmit={addContact} />
      </Section>
      <Section title="Contact">
        {contacts && (
          <>
            <Filter onChange={addFilter}></Filter>
            <ListContact
              deleteContact={deleteContact}
              contacts={findContact()}
            ></ListContact>
          </>
        )}
      </Section>
    </>
  );
}

export default App;
