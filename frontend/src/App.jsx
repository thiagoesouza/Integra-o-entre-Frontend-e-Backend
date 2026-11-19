/* ARQUIVO: App.jsx */
import React, { useState, useEffect } from "react";
import axios from "axios";
// Import dos nossos componentes visuais
import UserList from "./components/UserList"; // Note o caminho da pasta
import UserForm from "./components/UserForm"; // Note o caminho da pasta
// Import de componentes visuais do Material UI
import {
  Container,
  Grid,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Box,
} from "@mui/material";
// Import da configuração da API (URL do backend)
// OBS: Certifique-se que o arquivo config.js está na pasta correta ou ajuste o import
import { API_BASE_URL } from "./utils/config";
const App = () => {
  // --- ESTADOS (Variáveis Globais da Tela) ---
  const [users, setUsers] = useState([]); // Lista de usuários
  const [selectedUser, setSelectedUser] = useState(null); // Usuário sendo editado (se houver)
  // Controle de Feedback (Mensagens na tela)
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  // Controle dos Modais de Confirmação (Popups)
  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    type: "",
    data: null,
  });
  // --- FUNÇÕES DE API (Comunicação com o Backend) ---
  // 1. READ (Ler): Busca dados assim que a tela carrega
  useEffect(() => {
    fetchUsers();
  }, []);
  const fetchUsers = async () => {
    try {
      // 'await' espera o servidor responder antes de continuar
      const response = await axios.get(`${API_BASE_URL}/users`);
      setUsers(response.data);
    } catch (error) {
      showSnackbar("Erro ao carregar usuários.", "error");
    }
  };
  // 2. CREATE (Criar): Envia novo usuário
  const handleCreate = async (user) => {
    try {
      await axios.post(`${API_BASE_URL}/users`, user);
      await fetchUsers(); // Recarrega a lista para mostrar o novo
      showSnackbar("Usuário cadastrado com sucesso!", "success");
    } catch (error) {
      showSnackbar("Falha ao cadastrar.", "error");
    }
  };
  // 3. UPDATE (Atualizar): Altera usuário existente
  const handleUpdate = async () => {
    const user = confirmDialog.data; // Pega os dados salvos no estado do diálogo
    try {
      await axios.put(`${API_BASE_URL}/users/${user.id}`, user);
      await fetchUsers();
      setSelectedUser(null); // Sai do modo de edição
      showSnackbar("Dados atualizados.", "success");
    } catch (error) {
      showSnackbar("Erro ao atualizar.", "error");
    } finally {
      closeDialog(); // Fecha o popup
    }
  };
  // 4. DELETE (Excluir): Remove usuário
  const handleDelete = async () => {
    const userId = confirmDialog.data; // Pega o ID salvo no estado do diálogo
    try {
      await axios.delete(`${API_BASE_URL}/users/${userId}`);
      await fetchUsers();
      showSnackbar("Usuário removido.", "success");
    } catch (error) {
      showSnackbar("Erro ao remover.", "error");
    } finally {
      closeDialog();
    }
  };
  // --- FUNÇÕES AUXILIARES (Lógica da Tela) ---
  // Decide se vai salvar (novo) ou abrir confirmação (editar)
  const handleFormSubmit = (user) => {
    if (user.id) {
      // Se tem ID, é edição. Abre confirmação.
      setConfirmDialog({ open: true, type: "UPDATE", data: user });
    } else {
      // Se não tem ID, cria direto.
      handleCreate(user);
    }
  };
  // Prepara a deleção (abre o popup de confirmação)
  const confirmDelete = (id) => {
    setConfirmDialog({ open: true, type: "DELETE", data: id });
  };
  // Exibe mensagens flutuantes
  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };
  const closeDialog = () => {
    setConfirmDialog({ ...confirmDialog, open: false });
  };
  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      {/* Título da Página */}
      <Box sx={{ textAlign: "center", mb: 5 }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>
          Painel de Controle
        </h1>
        <p style={{ color: "#64748b" }}>
          Gerencie os membros da sua equipe de forma simples.
        </p>
      </Box>
      {/* Grid Layout: Lado a Lado em telas grandes, empilhado em celulares */}
      <Grid container spacing={4}>
        {/* Coluna Esquerda: Formulário */}
        <Grid item xs={12} md={4}>
          <UserForm
            onSubmit={handleFormSubmit}
            initialValues={selectedUser}
            onCancel={() => setSelectedUser(null)}
          />
        </Grid>
        {/* Coluna Direita: Tabela */}
        <Grid item xs={12} md={8}>
          <UserList
            users={users}
            onDelete={confirmDelete}
            onSelect={setSelectedUser}
          />
        </Grid>
      </Grid>
      {/* --- COMPONENTES INVISÍVEIS (Popups e Alertas) --- */}
      {/* Snackbar: Mensagem de sucesso/erro no canto da tela */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity} variant="filled">
          {snackbar.message}
        </Alert>
      </Snackbar>
      {/* Diálogo Genérico de Confirmação (Serve para Delete e Update) */}
      <Dialog open={confirmDialog.open} onClose={closeDialog}>
        <DialogTitle>
          {confirmDialog.type === "DELETE"
            ? "Excluir Registro?"
            : "Salvar Alterações?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {confirmDialog.type === "DELETE"
              ? "Essa ação não poderá ser desfeita. O usuário será removido permanentemente."
              : "Deseja confirmar a atualização dos dados deste usuário?"}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>Cancelar</Button>
          <Button
            onClick={
              confirmDialog.type === "DELETE" ? handleDelete : handleUpdate
            }
            color={confirmDialog.type === "DELETE" ? "error" : "primary"}
            variant="contained"
            autoFocus
          >
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};
export default App;
