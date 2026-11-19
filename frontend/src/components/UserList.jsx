/* ARQUIVO: UserList.jsx */
import React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Typography,
    Box,
    Chip,
} from "@mui/material";
/*
Componente UserList
Responsável apenas por MOSTRAR os dados. Ele não edita nem deleta diretamente,
ele avisa o pai (App.jsx) que o botão foi clicado via 'onDelete' e 'onSelect'.
*/
const UserList = ({ users, onDelete, onSelect }) => {
    return (
        <Box className="custom-card" sx={{ mt: 4, padding: "0 !important" }}>
            {/* padding 0 no container para a tabela encostar nas bordas */}
            <Box sx={{ p: 3, borderBottom: "1px solid #f1f5f9" }}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    Listagem de Membros
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Total de registros: {users.length}
                </Typography>
            </Box>
            <TableContainer>
                <Table sx={{ minWidth: 650 }} aria-label="tabela de usuários">
                    {/* Cabeçalho da Tabela */}
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Nome do Usuário</TableCell>
                            <TableCell>Contato (Email)</TableCell>
                            <TableCell align="right">Gerenciar</TableCell>
                        </TableRow>
                    </TableHead>
                    {/* Corpo da Tabela */}
                    <TableBody>
                        {users.map((user) => (
                            // 'key' é obrigatório no React para listas (ajuda na performance)
                            <TableRow
                                key={user.id}
                                sx={{ "&:last-child td, &:last-child th": { border: 0 } }} // Remove borda da
                                última linha>
                                <TableCell
                                    component="th"
                                    scope="row"
                                    sx={{ color: "text.secondary" }}
                                >
                                    #{user.id}
                                </TableCell>
                                <TableCell sx={{ fontWeight: 500 }}>{user.name}</TableCell>
                                <TableCell>
                                    {/* Chip deixa o email com visual de "etiqueta" cinza */}
                                    <Chip label={user.email} size="small" variant="outlined" />
                                </TableCell>
                                <TableCell align="right">
                                    {/* Botão Editar */}
                                    <Button
                                        size="small"
                                        onClick={() => onSelect(user)}
                                        sx={{ mr: 1, fontWeight: "bold" }}
                                    >
                                        Editar
                                    </Button>
                                    {/* Botão Excluir */}
                                    <Button
                                        size="small"
                                        color="error" // Vermelho automático do Material UI
                                        onClick={() => onDelete(user.id)}>
                                        Remover
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                        {/* Se a lista estiver vazia, mostra aviso */}
                        {users.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={4} align="center" sx={{ py: 4 }}>
                                    <Typography color="text.secondary">
                                        Nenhum usuário encontrado na base de dados.
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box >
    );
};
export default UserList;
