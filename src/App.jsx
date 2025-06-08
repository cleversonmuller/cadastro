import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Tabs,
  Tab,
  Box,
  Container,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CssBaseline,
  ThemeProvider,
  createTheme,
  Alert
} from '@mui/material';
import { AddCircleOutline, PeopleOutline } from '@mui/icons-material';

// Tema básico do Material-UI
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f4f6f8', // Cor de fundo padrão, caso a imagem não carregue.
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h5: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
});

// Componente para a aba do formulário de cadastro
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

// Função auxiliar para IDs das abas
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

// Componente principal da aplicação
function App() {
  const [tabValue, setTabValue] = useState(0);
  const [users, setUsers] = useState([]);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [feedback, setFeedback] = useState({ type: '', message: '' });

  // Carregar usuários do Local Storage ao iniciar a aplicação
  useEffect(() => {
    try {
      const storedUsers = localStorage.getItem('registeredUsers');
      if (storedUsers) {
        setUsers(JSON.parse(storedUsers));
      }
    } catch (error) {
      console.error("Erro ao carregar usuários do Local Storage:", error);
      setFeedback({ type: 'error', message: 'Erro ao carregar dados salvos.' });
    }
  }, []);

  // Salvar usuários no Local Storage sempre que a lista de usuários mudar
  useEffect(() => {
    try {
      localStorage.setItem('registeredUsers', JSON.stringify(users));
    } catch (error) {
      console.error("Erro ao salvar usuários no Local Storage:", error);
      setFeedback({ type: 'error', message: 'Erro ao salvar dados.' });
    }
  }, [users]);

  // Manipulador para mudança de aba
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setFeedback({ type: '', message: '' }); // Limpar feedback ao mudar de aba
  };

  // Manipulador para submissão do formulário
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!nome || !email) {
      setFeedback({ type: 'error', message: 'Nome e Email são obrigatórios!' });
      return;
    }
    const newUser = { id: Date.now(), nome, email, telefone };
    setUsers([...users, newUser]);
    setNome('');
    setEmail('');
    setTelefone('');
    setFeedback({ type: 'success', message: 'Usuário cadastrado com sucesso!' });
  };

  // Manipulador para limpar o feedback
  const clearFeedback = () => {
    setFeedback({ type: '', message: '' });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          display: 'center',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          py: 4, // Padding vertical para que o card não cole no topo/base
          // --- Configurações da Imagem de Fundo ---
          // NOTA: A URL abaixo é temporária e pode deixar de funcionar.
          // Para uma solução permanente, use uma imagem local na pasta 'public'
          // ou uma URL de imagem estável. Exemplo local: 'url(/nome-da-sua-imagem.jpg)'
          backgroundImage: 'file:///D:/trabalhon2/nome-do-seu-projeto/public/Imagens%20gr%C3%A1tis%20de%20Instrumentos%20de%20escrita%20%E2%80%94%20Banco%20de%20imagens%20free.html',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          // --- Fim das Configurações da Imagem de Fundo ---
        }}
      >
        <Container maxWidth="md">
          {/* O Paper principal que envolve todo o conteúdo visível do formulário/tabela */}
          <Paper elevation={3} sx={{ borderRadius: 3, overflow: 'hidden' /* Garante que o AppBar interno respeite os cantos arredondados */ }}>
            <AppBar position="static" sx={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 /* Arredondamento agora é feito pelo Paper pai */ }}>
              <Typography variant="h5" component="h1" sx={{ textAlign: 'center', p: 2 }}>
                Cadastro de Usuários
              </Typography>
              <Tabs value={tabValue} onChange={handleTabChange} centered indicatorColor="secondary" textColor="inherit">
                <Tab icon={<AddCircleOutline />} label="Cadastrar Usuário" {...a11yProps(0)} />
                <Tab icon={<PeopleOutline />} label="Usuários Cadastrados" {...a11yProps(1)} />
              </Tabs>
            </AppBar>

            {/* Feedback Snackbar/Alert */}
            {feedback.message && (
              <Alert severity={feedback.type} onClose={clearFeedback} sx={{ m: 2, borderRadius: 2 }}>
                {feedback.message}
              </Alert>
            )}

            {/* Aba de Cadastro */}
            <TabPanel value={tabValue} index={0}>
              <Typography variant="h6" gutterBottom component="div" sx={{ mb: 2 }}>
                Formulário de Cadastro
              </Typography>
              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="nome"
                  label="Nome Completo"
                  name="nome"
                  autoComplete="name"
                  autoFocus
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  error={feedback.type === 'error' && !nome}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Endereço de Email"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={feedback.type === 'error' && !email}
                  type="email"
                />
                <TextField
                  margin="normal"
                  fullWidth
                  id="telefone"
                  label="Telefone (Opcional)"
                  name="telefone"
                  autoComplete="tel"
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
                  type="tel"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, py: 1.5 }}
                  startIcon={<AddCircleOutline />}
                >
                  Cadastrar
                </Button>
              </Box>
              <img src="D:\trabalhon2\nome-do-seu-projeto\public" alt="" srcset="" />
            </TabPanel>

            {/* Aba de Dados dos Usuários */}
            <TabPanel value={tabValue} index={1}>
              <Typography variant="h6" gutterBottom component="div" sx={{ mb: 2 }}>
                Lista de Usuários Cadastrados
              </Typography>
              {users.length === 0 ? (
                <Typography variant="body1" sx={{ textAlign: 'center', color: 'text.secondary', mt: 4 }}>
                  Nenhum usuário cadastrado ainda.
                </Typography>
              ) : (
                <TableContainer component={Paper} elevation={0} square sx={{ mt: 2 /* elevation={0} e square para melhor integração visual dentro do Paper principal */ }}>
                  <Table sx={{ minWidth: 650 }} aria-label="tabela de usuários">
                    <TableHead sx={{ backgroundColor: 'primary.main' }}>
                      <TableRow>
                        <TableCell sx={{ color: 'common.white', fontWeight: 'bold' }}>ID</TableCell>
                        <TableCell sx={{ color: 'common.white', fontWeight: 'bold' }}>Nome</TableCell>
                        <TableCell sx={{ color: 'common.white', fontWeight: 'bold' }}>Email</TableCell>
                        <TableCell sx={{ color: 'common.white', fontWeight: 'bold' }}>Telefone</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {users.map((user) => (
                        <TableRow
                          key={user.id}
                          sx={{ '&:nth-of-type(odd)': { backgroundColor: 'action.hover' }, '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                          <TableCell component="th" scope="row">
                            {user.id}
                          </TableCell>
                          <TableCell>{user.nome}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>{user.telefone || '-'}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </TabPanel>
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;