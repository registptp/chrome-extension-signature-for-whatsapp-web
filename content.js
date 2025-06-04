// CODED BY REGIS

function observarMudancas() {
    const observer = new MutationObserver(() => {
        const textarea = document.querySelector("#main div[contenteditable='true']");
        if (textarea && document.activeElement === textarea && textarea.innerText.trim() === "") {
            verificarToggleEInserir(textarea);
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });
}

function verificarToggleEInserir(textarea) {
    chrome.storage.sync.get(["textValue", "toggleState"], (data) => {
        if (data.toggleState && data.textValue && data.textValue.trim() !== "") { 
            // Só executa se o toggle estiver ativado e houver um texto salvo
            textarea.focus();
            textarea.dispatchEvent(new InputEvent('input', { 
                bubbles: true, 
                inputType: 'insertText', 
                data: `*${data.textValue}:*\n\n` 
            }));
        }
    });
}

observarMudancas();
