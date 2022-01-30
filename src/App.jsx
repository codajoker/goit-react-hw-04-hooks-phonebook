import { useEffect, Component, useState } from 'react';
import { Section, Form, ListContact, Filter } from './components';
import { nanoid } from 'nanoid';
function App() {
  let [contacts, setContacts] = useState(() => {
    return JSON.parse(window.localStorage.getItem('contacts'));
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

class Opp extends Component {
  state = {
    contacts: [],
    filter: '',
  };
  addContact = data => {
    if (
      this.state.contacts.find(contact => {
        return (
          contact.name.toLocaleLowerCase() === data.name.toLocaleLowerCase()
        );
      })
    ) {
      return alert(`${data.name} is already in contacts`);
    }

    this.setState({
      contacts: [
        { name: data.name, id: nanoid(), number: data.number },
        ...this.state.contacts,
      ],
    });
  };
  addFilter = e => {
    this.setState({ filter: e.target.value });
  };
  findContact = () => {
    const filterContact = this.state.contacts.filter(contact => {
      return contact.name
        .toLocaleLowerCase()
        .includes(this.state.filter.toLocaleLowerCase());
    });
    return filterContact;
  };
  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };
  componentDidMount() {
    const local = localStorage.getItem('contacts');

    const parse = JSON.parse(local);
    if (parse) {
      this.setState({ contacts: parse });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      window.localStorage.setItem(
        'contacts',
        JSON.stringify(this.state.contacts)
      );
    }
  }
  render() {
    return (
      <>
        <Section title="Phonebook">
          <Form onSubmit={this.addContact} />
        </Section>
        <Section title="Contact">
          {this.state.contacts && (
            <>
              <Filter onChange={this.addFilter}></Filter>
              <ListContact
                deleteContact={this.deleteContact}
                contacts={this.findContact()}
              ></ListContact>
            </>
          )}
        </Section>
      </>
    );
  }
}
// export default Opp;
