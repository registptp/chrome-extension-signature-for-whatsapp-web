document.addEventListener("DOMContentLoaded", () => {
    const textInput = document.getElementById("textInput");
    const toggleSwitch = document.getElementById("toggleSwitch");
    const pixBtn = document.getElementById("pixBtn");
    const pixContainer = document.getElementById("pixContainer");

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

    // Salvar estado do switch
    toggleSwitch.addEventListener("change", () => {
        chrome.storage.sync.set({ toggleState: toggleSwitch.checked });
    });

    // Evento de clique seguro para o botão do Pix
    if (pixBtn && pixContainer) {
        pixBtn.addEventListener("click", () => {
            pixContainer.style.display = (pixContainer.style.display === 'none' || pixContainer.style.display === '') ? 'block' : 'none';
        });
    }
});