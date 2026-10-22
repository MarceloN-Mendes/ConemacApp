const cards = document.querySelectorAll(".cards");

function showCard(cardID) {
    const cardShow = document.getElementById(cardID);
    if (!cardShow) return;
    cardShow.classList.remove("hide");
    document.body.classList.add("modal-open");
}

cards.forEach((card) => {
    card.addEventListener("click", () => {
        const poemID = card.id.slice(0, -4);
        showCard(poemID);
    });
});

function closePoem(modal) {
    modal.classList.add("hide");
    if (!document.querySelector(".cardExibir:not(.hide)")) {
        document.body.classList.remove("modal-open");
    }
}

document.querySelectorAll(".cardExibir .close").forEach((button) => {
    button.addEventListener("click", () => closePoem(button.closest(".cardExibir")));
});

document.querySelectorAll(".cardExibir").forEach((modal) => {
    modal.addEventListener("click", (event) => {
        if (event.target === modal) closePoem(modal);
    });
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        document.querySelectorAll(".cardExibir:not(.hide)").forEach(closePoem);
    }
});
