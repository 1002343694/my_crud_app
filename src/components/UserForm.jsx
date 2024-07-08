import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import styled from 'styled-components';
import Swal from 'sweetalert2';

const FormContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #fff;
  width: 300px;
  @media (min-width: 768px) {
    width: 400px;
  }

  /* Centrado vertical y horizontal */
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const StyledTextField = styled(TextField)`
  && {
    margin-bottom: 15px;
  }
`;

const StyledButton = styled(Button)`
  && {
    margin-top: 20px;
    background-color: #3436A2;
    color: #fff;
    font-weight: bold;
    &:hover {
      background-color: #2c2e8a;
    }
  }
`;

const UserForm = ({ addUser, editUser, currentUser }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [ageError, setAgeError] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name);
      setEmail(currentUser.email);
      setAge(currentUser.age);
    } else {
      setName('');
      setEmail('');
      setAge('');
    }
  }, [currentUser]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar campos no vacíos
    if (name.trim() === '') {
      setNameError(true);
      return;
    }
    if (email.trim() === '') {
      setEmailError(true);
      return;
    }
    if (age.trim() === '') {
      setAgeError(true);
      return;
    }

    if (currentUser) {
      editUser(currentUser.id, name, email, age);
      Swal.fire({
        icon: 'success',
        title: 'Usuario Actualizado!',
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
        window.location.reload(); // Actualizar página después de editar para reflejar los cambios
      });
    } else {
      addUser(name, email, age);
      Swal.fire({
        icon: 'success',
        title: 'Usuario Agregado!',
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
        setName('');
        setEmail('');
        setAge('');
        setNameError(false);
        setEmailError(false);
        setAgeError(false);
      });
    }
  };

  const handleNameChange = (e) => {
    const value = e.target.value.replace(/[^a-zA-Z\s]/g, '').substring(0, 20);
    setName(value);
    setNameError(value.trim() === '');
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError(e.target.value.trim() === '');
  };

  const handleAgeChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').substring(0, 10);
    setAge(value);
    setAgeError(value.trim() === '');
  };

  return (
    <FormContainer>
      <Typography variant="h5" style={{ fontFamily: 'Roboto', color: '', marginBottom: '20px' }}>Agregar Usuario</Typography>
      <form onSubmit={handleSubmit}>
        <StyledTextField
          label="Nombre y Apellido"
          variant="outlined"
          value={name}
          onChange={handleNameChange}
          fullWidth
          inputProps={{
            maxLength: 20,
          }}
          error={nameError}
          helperText={nameError ? 'Este campo no puede estar vacío' : ''}
        />
        <StyledTextField
          label="Correo"
          variant="outlined"
          value={email}
          onChange={handleEmailChange}
          fullWidth
          error={emailError}
          helperText={emailError ? 'Este campo no puede estar vacío' : ''}
        />
        <StyledTextField
          label="Año"
          variant="outlined"
          value={age}
          onChange={handleAgeChange}
          fullWidth
          inputProps={{
            maxLength: 10,
          }}
          error={ageError}
          helperText={ageError ? 'Este campo no puede estar vacío' : ''}
        />
        <StyledButton type="submit" variant="contained" fullWidth>
          {currentUser ? 'Actualizar Usuario' : 'Añadir Usuario'}
        </StyledButton>
      </form>
    </FormContainer>
  );
};

export default UserForm;
