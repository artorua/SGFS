# Modelagem de Dados - SGFS (Sistema de Gestão de Faltas e Sobras)

## 1. Tabela: Usuarios
Responsável por armazenar os dados dos colaboradores, suas credenciais de acesso e permissões no sistema.

| Coluna | Tipo de Dado (PostgreSQL) | Descrição | Regras |
| :--- | :--- | :--- | :--- |
| `id_usuario` | `VARCHAR` | Matrícula ou ID interno do colaborador | Chave Primária, Único, Not Null |
| `nome_completo` | `VARCHAR` | Nome real do colaborador | Not Null |
| `senha_hash` | `VARCHAR` | Senha criptografada (gerada pelo sistema) | Not Null, Oculto no Front-end |
| `cargo` | `VARCHAR` | Define o que o usuário pode fazer na tela | Ex: 'VENDEDOR', 'GERENTE', 'VENDAS', 'ADMIN' |
| `ativo` | `BOOLEAN` | Define se o funcionário ainda tem acesso | Padrão: `true` |
| `data_criacao` | `TIMESTAMP` | Data de cadastro do usuário | Gerado Automaticamente |

---

## 2. Tabela: Registros_Auditoria (Rascunho Futuro)
Responsável por armazenar os lançamentos diários de faltas ou sobras de cada vendedor.

| Coluna | Tipo de Dado (PostgreSQL) | Descrição | Regras |
| :--- | :--- | :--- | :--- |
| `id_registro` | `UUID` | Identificador único do lançamento | Chave Primária, Gerado Automaticamente |
| `id_usuario` | `VARCHAR` | Quem sofreu a auditoria (Link com Usuarios) | Chave Estrangeira |
| `tipo_ocorrencia` | `VARCHAR` | Se foi falta de mercadoria ou sobra | Ex: 'FALTA', 'SOBRA' |
| `valor` | `DECIMAL` | O valor financeiro da diferença | Not Null |
| `data_ocorrencia` | `DATE` | O dia em que a diferença foi constatada | Not Null |