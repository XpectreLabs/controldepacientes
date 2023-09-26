import React from 'react';
import { styled } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import Grid from '@mui/joy/Grid';
import Box from '@mui/joy/Box';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';

const Item = styled(Sheet)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark' ? theme.palette.background.level1 : '#fff',
  ...theme.typography['body-sm'],
  padding: theme.spacing(1),
  textAlign: 'center',
  borderRadius: 4,
  color: theme.vars.palette.text.secondary,
}));

export const Inicio = () => {
  return (
    <Grid container spacing={3} sx={{ flexGrow: 1 }}>
      <Grid xs>
        <Item></Item>
      </Grid>
      <Grid xs={3}>
        <Item>
            <h1>Inicio de sesion</h1>

            <Box
              sx={{
                py: 2,
                display: 'grid',
                gap: 2,
                alignItems: 'center',
                flexWrap: 'wrap',
              }}
            >
              <Input name="txtUsuario" id="txtUsuario" placeholder="Usuario" />
              <Input type='password' name="txtContrasenia" id="txtContrasenia" placeholder="Contraseña" />

              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button>Iniciar sesión</Button>
              </Box>
              
            </Box>

        </Item>
      </Grid>
      <Grid xs>
        <Item></Item>
      </Grid>
    </Grid>
  )
}