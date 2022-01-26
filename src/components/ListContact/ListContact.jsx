import React from "react";
import PropTypes from "prop-types";

import { List, ListItem, Button } from "./ListContact.styled";
export const ListContact = ({ contacts, deleteContact }) => {
  return (
    <List>
      {contacts.map((contact) => {
        return (
          <ListItem key={contact.id}>
            {contact.name}: {contact.number}
            <Button onClick={() => deleteContact(contact.id)}> Delete </Button>
          </ListItem>
        );
      })}
    </List>
  );
};
ListContact.propTypes = {
  contacts: PropTypes.array,
  deleteContact: PropTypes.func,
};
