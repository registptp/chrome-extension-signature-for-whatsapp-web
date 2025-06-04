document.addEventListener("DOMContentLoaded", () => {
    const textInput = document.getElementById("textInput");
    const toggleSwitch = document.getElementById("toggleSwitch");

    // Carregar estado salvo
    chrome.storage.sync.get(["textValue", "toggleState"], (data) => {
        if (data.textValue) {
            textInput.value = data.textValue;
        }
        if (data.toggleState !== undefined) {
            toggleSwitch.checked = data.toggleState;
        }
    });

    // Salvar entrada de texto
    textInput.addEventListener("input", () => {
        chrome.storage.sync.set({ textValue: textInput.value });
    });
    
    document.addEventListener("DOMContentLoaded", () => {
        const textInput = document.getElementById("textInput");
    
        // Salvar entrada de texto em chrome.storage
        textInput.addEventListener("input", () => {
            chrome.storage.sync.set({ textValue: textInput.value });
        });
    });

    // Salvar estado do switch
    toggleSwitch.addEventListener("change", () => {
        chrome.storage.sync.set({ toggleState: toggleSwitch.checked });
    });
});
