# Documento de Commits
Este documento tem a finalidade de acompanhar e explicar o mais detalhadamente possível cada commit realizado. 

## Estrutura de commits
Cada commit (com exceção dos commits de criação) devem ter uma estrutura de texto específica seguindo a seguinte regra:

`Commit - Número / Texto / Versão`

Onde:

**Commit** - *Texto padrão de inicialização*;

**Número** - *Número sequencial deste commit*;

**Texto** - *Texto (preferencialmente palavras simples) que descreva o commit*;

**Versão** - *Versão do sistema a que esse commit mais se aproxima*.

Exemplo: 

`Commit - 015 / concerto falha do form x / 0.3.12`

## Histórico de commits:
Abaixo devem ser listados todos os commits realizados (com exceção dos commits de criação) seguindo o modelo da tabela:

| Commit | Versão | Descrição |
|:----------|:----------:|:----------|
| 000 | 0.0.0 | Commit fictício para exemplificação | 
| 001 | 0.1.0 | Navbar estilizada, mas não funcional; Footer estilizado; Head principal com fontes configuradas|
| 002 | 0.1.1 | Bug de hydratation do footer resolvido |
| 003 | 0.1.1 | Tela de registro de usuário estilizada, mas não funcional; store, service e slice de autenticação configurados para o caso de realmente utilizá-los |
| 004 | 0.1.1 | ValidateUser add ao authService, exclusão do redux, criação do hook de autenticação, criação do componente de mensagens, criação do utilitário de verificação de usuário logado e navbar atualizada para usuário logado ou deslogado. |
| 005 | 0.2.1 | Funcionalidade de login concluída (ainda não conectando a api) |
| 006 | 0.2.1 | Páginas de 404 e loading prontas; Página skeleton planejada, mas não executável |
| 007 | 0.2.1 | Banner e categorias da página principal estilizadas |
| 008 | 0.2.1 | Melhorias na estilização das categorias da página principal. |
| 009 | 0.2.1 | Estilização da página principal finalizada. |
| 010 | 0.2.1 | Página de produto criada e parcialmente estilizada. |
| 011 | 0.2.1 | Finalização da estilização da página de produtos. |
| 012 | 0.2.1 | Página de carrinho criada e estilização finalizada. |
| 013 | 0.2.1 | Search do navbar funcional e documento de Banco de Dados criado. |
| 014 | 0.2.1 | Página de profile criada e componentes de informações do usuário, produtos favoritos e pedidos realizados, ambos relacionados ao profile. Ainda não foi inicializada a estilização da página e de seus componentes. |
| 015 | 0.2.1 | Página de profile e seus componentes todos estilizados. |
| 016 | 0.2.1 | Página de search estilizada e componentes de produto e de categoria criados e estilizados. |
| 017 | 0.2.1 | Página de dashboard de administrador criada e estilizada; Componentes de pedidos no dashboard criado e estilizado; Componentes de categorias no dashboard criados, mas não estilizados; Componentes de produtos no dashboard ainda não estruturado. |
| 018 | 0.2.1 | Componente de produtos do dashboard estruturado, mas não estilizado; página criação e edição de produto do dashboard estruturado, mas não estilizado. |
| 019 | 0.2.1 | Componente de categorias e categoriaPanel do dashboard de adm estilizadas. |
| 020 | 0.2.1 | Componente de produtos do dashboard estilizada e página de criação/edição de produtos do dashboard estilizada. |
| 021 | 0.3.1 | Página inicial configurada com a api. |
| 022 | 0.3.1 | Criação do context de usuário para sessão. |
| 023 | 0.4.2 | Funcionalidades de login, register e logout implementadas com redux e localStorage. |
| 024 | 0.5.2 | Funcionalidade de search implementada. |
| 025 | 0.5.2 | Get profile na página de usuário implementado. |
| 026 | 0.5.2 | Update de profile funcionando, mas sem upload de imagem. |
| 027 | 0.6.2 | Função de envio de imagens para aws implementada, update profile de usuário implementado. |
| 028 | 0.6.2 | Atualização do README com as chaves necessárias no .env . | 
| 029 | 0.6.3 | Fixed: bug na imagem de profile. |
| 030 | 0.7.3 | Componentes de favoritos, infos e pedidos da página de profile finalizados. |
