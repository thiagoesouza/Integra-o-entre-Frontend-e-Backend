/* ARQUIVO: UserForm.jsx */
import React, { useState, useEffect } from "react";
import { TextField, Button, Box, Typography, Stack } from "@mui/material";
/* Componente UserForm
Recebe 3 "props" (propriedades/parâmetros):
1. onSubmit: Função para enviar os dados (salvar/criar).
2. initialValues: Dados do usuário se estivermos editando (ou vazio se for novo).
3. onCancel: Função para cancelar a edição.
*/
const UserForm = ({ onSubmit, initialValues, onCancel }) => {
    // --- HOOKS DE ESTADO (Memória do componente) ---
    // useState cria uma variável que o React "vigia". Se ela mudar, a tela atualiza.
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    // --- HOOK DE EFEITO (Automação) ---
    // useEffect roda código automaticamente quando algo muda.
    // Aqui: Toda vez que 'initialValues' mudar (ex: clicou em editar), preenchemos os campos.
    useEffect(() => {
        if (initialValues) {
            setName(initialValues.name || "");
            setEmail(initialValues.email || "");
        }
    }, [initialValues]);
    // Função disparada ao clicar em "Salvar/Cadastrar"
    const handleSubmit = (e) => {
        e.preventDefault(); // Evita que a página recarregue (comportamento padrão do HTML)
        // Monta o objeto usuário e envia para quem chamou este componente
        onSubmit({
            id: initialValues?.id, // Usa o ID se existir (edição)
            name: name,
            email: email,
        });
        // Limpa os campos visualmente
        setName("");
        setEmail("");
    };
    return (
        // 'Paper' ou 'Box' com nossa classe CSS personalizada para o visual de cartão branco
        <Box component="form" onSubmit={handleSubmit} className="custom-card">
            {/* Título do Formulário */}
            <Typography
                variant="h5"
                gutterBottom
                sx={{ color: "#6366f1", fontWeight: "bold" }}
            >
                {initialValues?.id ? "Editar Usuário" : "Novo Cadastro"}
            </Typography>
            <Typography variant="body2" sx={{ mb: 3, color: "text.secondary" }}>
                Preencha as informações abaixo para atualizar o sistema.
            </Typography>
            {/* Stack é um componente de layout que empilha itens verticalmente com espaçamento */}
            <Stack spacing={3}>
                {/* Campo Nome */}
                <TextField
                    label="Nome Completo"
                    variant="outlined"
                    fullWidth
                    value={name}
                    onChange={(e) => setName(e.target.value)} // Atualiza o estado ao digitar
                    required
                />
                {/* Campo Email */}
                <TextField
                    label="E-mail Corporativo"
                    variant="outlined"
                    type="email"
                    fullWidth
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                {/* Área dos Botões */}
                <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
                    {/* Botão Cancelar (Só aparece se estiver editando) */}
                    {initialValues?.id && (
                        <Button
                            onClick={onCancel}
                            color="inherit" // Cor cinza padrão
                            variant="text"
                        >
                            Cancelar
                        </Button>
                    )}
                    {/* Botão Principal */}
                    <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        sx={{
                            bgcolor: "var(--primary-color)", // Usa nossa variável CSS
                            "&:hover": { bgcolor: "var(--primary-hover)" },
                        }}
                    >
                        {initialValues?.id ? "Salvar Alterações" : "Cadastrar Usuário"}
                    </Button>
                </Box>
            </Stack>
        </Box>
    );
};
export default UserForm;