// src/components/UserList.jsx
import React from 'react';
import { List, ListItem, ListItemText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import styled from 'styled-components';


const StyledList = styled(List)`
  margin-top: 20px;
  width: 300px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 10px;
`;

const UserList = ({ users, deleteUser, editUser }) => (
  <StyledList>
    {users.map((user) => (
      <ListItem
        key={user.id}
        secondaryAction={
          <>
            <IconButton edge="end" aria-label="edit" onClick={() => editUser(user)}>
              <EditIcon />
            </IconButton>
            <IconButton edge="end" aria-label="delete" onClick={() => deleteUser(user.id)}>
              <DeleteIcon />
            </IconButton>
          </>
        }
      >
        <ListItemText primary={`${user.name} (${user.age})`} secondary={user.email} />
      </ListItem>
    ))}
  </StyledList>
);

export default UserList;
