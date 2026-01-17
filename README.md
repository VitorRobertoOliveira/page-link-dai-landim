# Página de Links - Dai Landim Cachos

![Preview da Página](./assets/img/Preview.png)

## 📖 Sobre o Projeto

Este é um projeto de uma página de links no estilo "link-in-bio", desenvolvida para a cabeleireira **Dai Landim**, especialista em cabelos cacheados. O objetivo é centralizar todos os seus links importantes — como agendamentos, redes sociais e localização — em um único lugar, facilitando o acesso para seus clientes.

A página possui um design limpo e moderno, com um carrossel de vídeos que exibe o trabalho da profissional e botões de acesso rápido para as principais ações que um cliente pode querer realizar.

## ✨ Funcionalidades

- **Carrossel de Vídeos**: Exibe cortes de cabelo e outros trabalhos em um carrossel interativo.
- **Links Rápidos**: Botões diretos para as principais ações que um cliente pode querer realizar.
- **Modal de Agendamento**: Um pop-up para direcionar o cliente para a agenda correta (Corte ou Mechas).
- **Responsividade**: Layout adaptado para funcionar bem em celulares e desktops.
- **Integração com Google Analytics**: Rastreamento de visitas e cliques em todos os botões para análise de métricas de engajamento.

## 🔧 Melhorias e Correções

- **Otimização do Carrossel**: O carrossel de vídeos foi ajustado para garantir uma interação suave em todos os navegadores, especialmente no Safari, corrigindo um problema que podia causar travamentos durante o gesto de arrastar.

## 📊 Rastreamento e Analytics

Este projeto está configurado para enviar dados de navegação e eventos de clique para o Google Analytics, permitindo uma análise completa do engajamento dos usuários.

**Métricas Rastreadas:**
- **Visitas na Página**: Contagem total de acessos.
- **Cliques nos Botões**: Rastreamento individual de cada link, incluindo:
    - Botão principal de "Agendar Horário"
    - Links para o Instagram e TikTok
    - Link para contato via WhatsApp
    - Link para deixar Feedback
    - Link para a Localização no mapa
    - Links de agendamento de serviços no modal (Corte e Mechas)

#### Como Ativar o Rastreamento

Para que o Analytics funcione, é necessário vincular seu ID de métrica pessoal ao site.

1.  **Crie ou acesse** sua conta no [Google Analytics](https://analytics.google.com).
2.  **Obtenha seu "ID DE MÉTRICA"** de um "Fluxo de dados da Web". O ID terá o formato `G-XXXXXXXXXX`.
3.  **Abra o arquivo `index.html`** e encontre o seguinte trecho de código no final da seção `<head>`:
    ```html
    <!-- Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-SEU_ID_DE_METRICA_AQUI"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'G-SEU_ID_DE_METRICA_AQUI');
    </script>
    ```
4.  **Substitua** os dois locais onde aparece `G-SEU_ID_DE_METRICA_AQUI` pelo seu ID real.

Após salvar a alteração, os dados começarão a ser coletados e exibidos no seu painel do Google Analytics na seção de relatórios de "Engajamento > Eventos".

## 🚀 Tecnologias Utilizadas

O projeto foi construído utilizando tecnologias web padrões:

- **HTML5**: Para a estrutura semântica da página.
- **CSS3**: Para estilização, animações e responsividade.
- **JavaScript**: Para a funcionalidade do carrossel e do modal de agendamento.
- **Google Fonts**: Para a tipografia da página.
- **Bootstrap Icons**: Para os ícones utilizados no projeto.

## 📁 Estrutura do Projeto

O código-fonte está organizado da seguinte forma:

```
/
├── assets/
│   ├── css/
│   │   ├── reset.css      # Normalização dos estilos
│   │   └── styles.css     # Estilos principais
│   ├── font/
│   │   └── roca-one-regular.ttf # Fonte customizada
│   ├── img/               # Imagens, vídeos e logos
│   └── js/
│       └── script.js      # Scripts de interatividade
├── .gitignore
├── index.html             # Arquivo principal da página
└── README.md              # Documentação do projeto
```

## 💻 Como Visualizar o Projeto

1.  **Clone o repositório** (ou baixe os arquivos):
    ```bash
    git clone https://github.com/VitorRobertoOliveira/page-link-dai-landim.git
    ```
2.  **Navegue até o diretório** do projeto:
    ```bash
    cd page-link-dai-landim
    ```
3.  **Abra o arquivo `index.html`** no seu navegador de preferência.

E pronto! A página será exibida localmente.