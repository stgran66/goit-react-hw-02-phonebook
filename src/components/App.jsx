import { Component } from 'react';
import { nanoid } from 'nanoid';
import { Notify } from 'notiflix';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import { Container, MainHeading, Content } from './Common.styled';

Notify.init({
  position: 'center-top',
  width: '460px',
  useIcon: false,
  fontFamily: 'Garamond',
  fontSize: '28px',
  failure: {
    background: 'transparent',
    textColor: '#ac3235',
  },
});

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  addContact = values => {
    const { contacts } = this.state;
    const { name, number } = values;

    if (contacts.some(contact => contact.name === name)) {
      return Notify.failure(`${name} is already in contacts`);
    }

    this.setState(({ contacts }) => ({
      contacts: [...contacts, { name: name, id: nanoid(), number: number }],
    }));
  };

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  onFilter = e => {
    this.setState({ filter: e.currentTarget.value.toLowerCase().trim() });
  };

  render() {
    const { contacts } = this.state;
    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(this.state.filter)
    );
    return (
      <Container>
        <Content>
          <MainHeading>Phonebook</MainHeading>
          <ContactForm onSubmit={this.addContact} />
          <h2>Contacts</h2>
          <Filter onFilter={this.onFilter} />
          <ContactList
            filteredContacts={filteredContacts}
            onDelete={this.deleteContact}
          />
        </Content>
      </Container>
    );
  }
}
