import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Content from '../../components/Content';

import NavigatorProfesor from '../../components/NavigatorProfesor';
import {
  Button,
  Card,
  CardHeader,
  CardContent,
  Divider,
  Grid,
  TextField,
  TextareaAutosize,
  Typography,
  MenuItem
} from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import Swal from "sweetalert2";
import { UserContext } from '../../Contexts/UserContext';
import { crearClaseNueva } from '../../controller/clases.controller';
import { actualizarUser, buscarUsuarioPorId } from '../../controller/usuarios.controller';



/*function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}.
    </Typography>
  );
}**/

let theme = createTheme({
  palette: {
    primary: {
      light: '#63ccff',
      main: '#009be5',
      dark: '#006db3',
    },
  },
  typography: {
    h5: {
      fontWeight: 500,
      fontSize: 26,
      letterSpacing: 0.5,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiTab: {
      defaultProps: {
        disableRipple: true,
      },
    },
  },
  mixins: {
    toolbar: {
      minHeight: 48,
    },
  },
});

theme = {
  ...theme,
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#081627',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
        contained: {
          boxShadow: 'none',
          '&:active': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          marginLeft: theme.spacing(1),
        },
        indicator: {
          height: 3,
          borderTopLeftRadius: 3,
          borderTopRightRadius: 3,
          backgroundColor: theme.palette.common.white,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          margin: '0 16px',
          minWidth: 0,
          padding: 0,
          [theme.breakpoints.up('md')]: {
            padding: 0,
            minWidth: 0,
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          padding: theme.spacing(1),
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          borderRadius: 4,
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgb(255,255,255,0.15)',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            color: '#4fc3f7',
          },
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          fontSize: 14,
          fontWeight: theme.typography.fontWeightMedium,
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: 'inherit',
          minWidth: 'auto',
          marginRight: theme.spacing(2),
          '& svg': {
            fontSize: 20,
          },
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          width: 32,
          height: 32,
        },
      },
    },
  },
};

const drawerWidth = 256;

const frecuencias = [
  {
    value: "Unica",
    label: 'Única',
  },
  {
    value: 'Semanal',
    label: 'Semanal',
  },
  {
    value: 'Mensual',
    label: 'Mensual',
  },
];

const tipos = [
  {
    value: "Individual",
    label: 'Individual',
  },
  {
    value: 'Grupal',
    label: 'Grupal',
  }
];


export default function CrearClase() {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const currentUser = React.useContext(UserContext)
  const [user,setUsuario]= React.useState(null)

  const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const [clase,setClase] = React.useState({
    titulo: "",
    imagen: "",
    descripcion: "",
    frecuecia: "",
    duracion: 0,
    precio: 0,
    tipo: "",
    rating: 0,
    Usuarios_id: currentUser
  })  

  let disabled = clase.titulo === "" || clase.imagen === "" || clase.descripcion === "" || clase.frecuecia === null || clase.duracion=== 0 || clase.precio === 0 || clase.tipo==="" ? true : false

  React.useEffect(() => {
    const getUsuario = async function () {
      const respuestaUsuario = await buscarUsuarioPorId(currentUser)
      console.log(
        "Console log de respuesta de back ",
        JSON.stringify(respuestaUsuario)
      );
      if (respuestaUsuario.rdo === 1) {
        alert("No existe el usuario");
      } else {
        console.log("este es el usuario recuperado",respuestaUsuario.user);
        setUsuario(respuestaUsuario.user)
        }
      }
    getUsuario();
  
  }, [currentUser])


  const handleChange = (event) => {
    setClase({
      ...clase,
      [event.target.name]: event.target.value
    })
  };


  const handleClassCreation = () => {
    Swal.fire({
      title: '¡Estas por Crear una Clase!',
      text: "¿Estas seguro?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si!',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        const createClase = async function () {
          const respuesta = await crearClaseNueva(clase)
          console.log(
            "Console log de respuesta de back ",
            JSON.stringify(respuesta)
          );
          if (respuesta.rdo === 1) {
            Swal.fire({
              icon: 'error',
              title: 'Ocurrio un error',
              showConfirmButton: false,
            })
          } else {
            user.clasesPublicadas.push({
              _id:respuesta.dataBack.createClase
            })
            const agregarClase = async function(){
              const respuestaActualizacion = await actualizarUser(user)
              console.log(
                "Console log de respuesta de back ",
                JSON.stringify(respuestaActualizacion.user)
              );
              if (respuestaActualizacion.rdo === 1) {
                alert("Ocurrio un error al guardar");
            }
          }
          agregarClase()
            Swal.fire({
              icon: 'success',
              title: 'Se creo correctamente',
              showConfirmButton: false,
            })
          }
        }
        createClase()
      }
    })
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex", minHeight: "100vh" }}>
        <CssBaseline />
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >
          {isSmUp ? null : (
            <NavigatorProfesor
              PaperProps={{ style: { width: drawerWidth } }}
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
            />
          )}

          <NavigatorProfesor
            PaperProps={{ style: { width: drawerWidth } }}
            sx={{ display: { sm: "block", xs: "none" } }}
          />
        </Box>
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <Box
            component="main"
            sx={{ flex: 1, py: 6, px: 4, bgcolor: "#eaeff1" }}
          >
            <Content />

            <form autoComplete="off" noValidate>
              <Card>
                <CardHeader title="Crear una Nueva Clase" />
                <Typography sx={{ marginLeft: 2 }} variant="body1">
                  Todos los campos son obligatorios
                </Typography>
                <Divider />
                <CardContent>
                  <Grid container spacing={3}>
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        label="Nombre"
                        name="titulo"
                        onChange={handleChange}
                        variant="standard"
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        label="Duracion"
                        type="number"
                        placeholder="Indica cuantas horas durara la sesion de la clase"
                        name="duracion"
                        onChange={handleChange}
                        variant="standard"
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        id="standard-select-tipo"
                        fullWidth
                        label="Tipo"
                        name="tipo"
                        value={clase.tipo}
                        select
                        onChange={handleChange}
                        helperText="Por favor elige la frecuencia"
                        variant="standard"
                      >
                        {tipos.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        id="standard-select-frequency-native"
                        fullWidth
                        label="Frecuencia"
                        name="frecuencia"
                        select
                        value={clase.frecuencia}
                        onChange={handleChange}
                        helperText="Por favor elige la frecuencia"
                        variant="standard"
                      >
                        {frecuencias.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <FormControl fullWidth variant="standard">
                        <InputLabel htmlFor="standard-adornment-amount">
                          Costo
                        </InputLabel>
                        <Input
                          id="standard-adornment-amount"
                          type="number"
                          name="precio"
                          onChange={handleChange}
                          placeholder={"Cuanto cuesta la clase en USD"}
                          startAdornment={
                            <InputAdornment position="start">$</InputAdornment>
                          }
                        />
                      </FormControl>
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        label="Imagen"
                        name="imagen"
                        placeholder="Pega aqui el url de tu imagen"
                        onChange={handleChange}
                        variant="standard"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Descripcion"
                        multiline
                        rows="3"
                        fullWidth
                        name="descripcion"
                        onChange={handleChange}
                        placeholder="Escribi la Descripcion de tu clase"  
                      />
                    </Grid>
                  </Grid>
                </CardContent>
                <Divider />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    p: 2,
                  }}
                >
                  <Button
                    disabled={disabled}
                    color="primary"
                    variant="contained"
                    onClick={() => handleClassCreation()}
                  >
                    Crear
                  </Button>
                </Box>
              </Card>
            </form>
          </Box>
          {/**<Box component="footer" sx={{ p: 2, bgcolor: '#eaeff1' }}>
            <Copyright />
          </Box>**/}
        </Box>
      </Box>
    </ThemeProvider>
  );
}