# 🚀 Signature for WhatsApp Web

[![Versão](https://img.shields.io/badge/version-1.5-blue.svg)](https://github.com/)
[![Plataforma](https://img.shields.io/badge/Plataforma-Google_Chrome-yellow.svg)](https://www.google.com/chrome/)

Uma extensão simples para o Chrome que adiciona automaticamente uma assinatura nas suas mensagens do WhatsApp Web. 

Uma solução para multiatendimento via WhatsApp Web, identificando o atendente com seu nome antes da mensagem.

A ideia aqui é automatizar aquele "copia e cola" chato, mas sem poluir a interface do whatsapp.

---

## O problema que isso resolve

**a extensão é invisível**. 
Você digita normalmente na caixa vazia. Quando você aperta `Enter` (ou clica no aviãozinho), o script intercepta o envio, joga o cursor pro começo do texto, injeta a assinatura, força as quebras de linha (simulando um Shift+Enter para driblar o bloqueio do motor do WhatsApp, que usa React/Lexical) e dispara o envio. 

Tudo acontece em milissegundos, então parece uma função nativa.

---

## O que tem no projeto

*   **Injeção no momento do envio:** A assinatura não fica presa como rascunho.
*   **Dois gatilhos:** Funciona tanto apertando Enter no teclado quanto clicando no botão verde de enviar.
*   **Sincronização:** Salva no `chrome.storage.sync`, então se logar no Chrome em outro PC, sua configuração já vai estar lá.
*   **Liga/Desliga rápido:** Um toggle simples no popup pra quando você quiser mandar mensagens normais, sem precisar desinstalar a extensão.

---

## Como instalar rodando local (Modo Desenvolvedor)

Como é um projeto pessoal e não está na Web Store, você pode instalar direto no seu navegador assim:

1. Baixe os arquivos deste repositório (Clone ou faça o download do ZIP e extraia numa pasta).
2. Abra o Chrome e digite na barra de endereços: `chrome://extensions/`
3. No canto superior direito, ative o **"Modo do desenvolvedor"**.
4. Clique no botão **"Carregar sem compactação"** (canto superior esquerdo) e selecione a pasta onde você extraiu os arquivos.
5. Pronto, já tá rodando. 

*Dica: fixa a extensão ali na barra do Chrome pra ficar mais fácil de abrir o popup.*

---

## Como usar

1. Abre o WhatsApp Web.
2. Clica no ícone da extensão.
3. Digita o nome que você quer na assinatura. A extensão vai automaticamente colocar em negrito e adicionar os dois pontos (`*Nome:*`).
4. Ativa a chavinha (vai ficar verde).
5. Manda uma mensagem pra testar.

---

## Estrutura básica

*   `manifest.json`: Configurações e permissões (Manifest V3).
*   `content.js`: Onde a brincadeira acontece (interceptação de evento de teclado/mouse e manipulação do texto).
*   `popup.html` / `css` / `js`: A interface gráfica da extensão.

---

**Criado por Regis da Cruz Roberto**

---

---

## ☕ Apoie o Projeto

Se essa extensão facilitou o seu dia a dia no trabalho ou economizou o seu tempo, considere pagar um café para o desenvolvedor! Qualquer valor é bem-vindo e ajuda a manter o projeto atualizado 😊.

<details>
  <summary><b>💙 Clique aqui para doar via Pix (QR Code)</b></summary>
  
  <img src="qr_code.png" alt="QR Code Pix" width="200"/>
</details>

<br>

**💙 PayPal:** [Clique aqui para doar via PayPal](https://www.paypal.com/donate/?hosted_button_id=5XUE5THKU8JQU)

---
