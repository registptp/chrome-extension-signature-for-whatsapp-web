// CODED BY REGIS

let config = { textValue: "", toggleState: false };
let isSending = false;

// 1. Carrega as configurações assim que a página abre
chrome.storage.sync.get(["textValue", "toggleState"], (data) => {
    if (data.textValue) config.textValue = data.textValue;
    if (data.toggleState !== undefined) config.toggleState = data.toggleState;
});

// 2. Mantém atualizado em tempo real com o popup
chrome.storage.onChanged.addListener((changes, namespace) => {
    if (namespace === 'sync') {
        if (changes.textValue) config.textValue = changes.textValue.newValue;
        if (changes.toggleState) config.toggleState = changes.toggleState.newValue;
    }
});

// 3. Intercepta no nível 'window' para ter prioridade máxima sobre o React
window.addEventListener('keydown', function(e) {
    const textarea = document.querySelector("#main div[contenteditable='true']");
    
    // Verifica se apertou Enter no chat (sem Shift) e se a extensão está ligada
    if (e.key === 'Enter' && !e.shiftKey && e.target === textarea) {
        if (config.toggleState && config.textValue.trim() !== "" && !isSending) {
            let currentText = textarea.innerText.trim();
            
            if (currentText !== "") {
                // VERIFICAÇÃO DE EMOJIS CORRIGIDA: Checa letras e números
                const temTextoNormal = /[a-zA-Z0-9À-ÿ]/u.test(currentText);
                const apenasEmojis = /^[\p{Emoji}\s]+$/u.test(currentText) && !temTextoNormal;
                
                if (apenasEmojis) { 
                    return; // Se for SÓ emoji puro, ignora a assinatura
                }

                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation(); // Impede que o WhatsApp veja este Enter
                
                enviarComAssinatura(textarea);
            }
        }
    }
}, true);

// 4. Intercepta o clique no botão de "Aviãozinho" (Enviar)
window.addEventListener('click', function(e) {
    const btnEnviar = e.target.closest('button[aria-label="Enviar"]') || e.target.closest('span[data-icon="send"]');
    
    if (btnEnviar) {
        const textarea = document.querySelector("#main div[contenteditable='true']");
        if (textarea && config.toggleState && config.textValue.trim() !== "" && !isSending) {
            let currentText = textarea.innerText.trim();
            
            if (currentText !== "") {
                // VERIFICAÇÃO DE EMOJIS CORRIGIDA: Checa letras e números
                const temTextoNormal = /[a-zA-Z0-9À-ÿ]/u.test(currentText);
                const apenasEmojis = /^[\p{Emoji}\s]+$/u.test(currentText) && !temTextoNormal;
                
                if (apenasEmojis) { 
                    return; // Se for SÓ emoji puro, ignora a assinatura
                }

                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();
                
                enviarComAssinatura(textarea);
            }
        }
    }
}, true);

// 5. A Lógica Definitiva: Cursor no topo + Fake Shift+Enter
function enviarComAssinatura(textarea) {
    isSending = true; // Trava o gatilho
    
    textarea.focus();
    
    // 1. Coloca o cursor piscando exatamente no INÍCIO da mensagem
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(textarea);
    range.collapse(true); 
    selection.removeAllRanges();
    selection.addRange(range);
    
    // 2. Digita a assinatura no topo
    document.execCommand('insertText', false, `*${config.textValue}:*`);
    
    // 3. Primeira quebra de linha (Comando + Evento Falso para o WhatsApp acreditar)
    document.execCommand('insertParagraph', false, null);
    textarea.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', code: 'Enter', keyCode: 13, which: 13, shiftKey: true, bubbles: true }));
    
    // 4. Segunda quebra de linha
    document.execCommand('insertParagraph', false, null);
    textarea.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', code: 'Enter', keyCode: 13, which: 13, shiftKey: true, bubbles: true }));
    
    // Dá 150ms para o React "digerir" a montagem antes de clicar em enviar
    setTimeout(() => {
        const btnEnviar = document.querySelector('button[aria-label="Enviar"]') || document.querySelector('span[data-icon="send"]')?.closest('button');
        
        if (btnEnviar) {
            btnEnviar.click(); // Clica de verdade
        } else {
            // Plano B
            textarea.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, cancelable: true, key: 'Enter', code: 'Enter', keyCode: 13, shiftKey: false }));
        }
        
        setTimeout(() => { isSending = false; }, 200);
    }, 150);
}