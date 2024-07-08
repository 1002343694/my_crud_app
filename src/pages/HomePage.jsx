import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Container from '@mui/material/Container';
import Header from '../components/Header';
import UserForm from '../components/UserForm';
import UserList from '../components/UserList';
import styled from 'styled-components';
import { Typography, Modal, Box, TextField, Button } from '@mui/material';
import Swal from 'sweetalert2';

const BackgroundContainer = styled.div`
  background-image: url('https://images2.alphacoders.com/589/thumb-1920-589399.jpg');
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const FormAndListContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

const ModalContainer = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  width: 300px;
`;

const HomePage = () => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [openModal, setOpenModal] = useState(false); // Estado para controlar la apertura del modal

  useEffect(() => {
    axios.get('http://localhost:5000/users')
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  const addUser = (name, email, age) => {
    axios.post('http://localhost:5000/users', { name, email, age })
      .then(response => {
        setUsers([...users, response.data]);
        Swal.fire({
          icon: 'success',
          title: 'Usuario agregado',
          showConfirmButton: false,
          timer: 1500
        });
      })
      .catch(error => console.error('Error adding user:', error));
  };

  const editUser = (id, name, email, age) => {
    axios.put(`http://localhost:5000/users/${id}`, { name, email, age })
      .then(() => {
        setUsers(users.map(user => (user.id === id ? { ...user, name, email, age } : user)));
        setCurrentUser(null);
        setOpenModal(false); // Cerrar el modal después de editar
        Swal.fire({
          icon: 'success',
          title: 'Usuario actualizado',
          showConfirmButton: false,
          timer: 1500
        });
      })
      .catch(error => console.error('Error updating user:', error));
  };

  const deleteUser = (id) => {
    axios.delete(`http://localhost:5000/users/${id}`)
      .then(() => {
        setUsers(users.filter(user => user.id !== id));
        Swal.fire({
          icon: 'success',
          title: 'Usuario eliminado',
          showConfirmButton: false,
          timer: 1500
        });
      })
      .catch(error => console.error('Error deleting user:', error));
  };

  const handleEditUser = (user) => {
    setCurrentUser(user);
    setOpenModal(true); // Abrir el modal para editar
  };

  const handleCloseModal = () => {
    setCurrentUser(null);
    setOpenModal(false); // Cerrar el modal sin guardar cambios
  };

  return (
    <BackgroundContainer>
      <Header />
      <FormAndListContainer>
        <UserForm addUser={addUser} editUser={editUser} currentUser={currentUser} />
        {/* Título de la lista de usuarios */}
        <Typography variant="h5" style={{ margin: '20px 0', color: '#ffffff' }}>Lista de Usuarios</Typography>
        <UserList users={users} deleteUser={deleteUser} editUser={handleEditUser} />
      </FormAndListContainer>
      {/* Modal para editar usuarios */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <ModalContainer>
          <Typography variant="h6" gutterBottom>Editar Usuario</Typography>
          <form onSubmit={(e) => {
            e.preventDefault();
            editUser(currentUser.id, currentUser.name, currentUser.email, currentUser.age);
          }}>
            <TextField
              label="Nombre y Apellido"
              variant="outlined"
              value={currentUser ? currentUser.name : ''}
              onChange={(e) => setCurrentUser({ ...currentUser, name: e.target.value })}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Correo"
              variant="outlined"
              value={currentUser ? currentUser.email : ''}
              onChange={(e) => setCurrentUser({ ...currentUser, email: e.target.value })}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Año"
              variant="outlined"
              value={currentUser ? currentUser.age : ''}
              onChange={(e) => setCurrentUser({ ...currentUser, age: e.target.value })}
              fullWidth
              margin="normal"
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Actualizar Usuario
            </Button>
          </form>
        </ModalContainer>
      </Modal>
    </BackgroundContainer>
  );
};

export default HomePage;
