// Carrossel reutilizável: poemas ativo e introdução disponível ao descomentar o HTML.
document.querySelectorAll(".carousel-section").forEach((section) => {
    const viewport = section.querySelector(".carousel-viewport");
    const previous = section.querySelector(".carousel-btn.prev");
    const next = section.querySelector(".carousel-btn.next");
    if (!viewport || !previous || !next) return;

    const scrollAmount = () => Math.max(viewport.clientWidth * 0.8, 160);
    previous.addEventListener("click", () => {
        viewport.scrollBy({ left: -scrollAmount(), behavior: "smooth" });
    });
    next.addEventListener("click", () => {
        viewport.scrollBy({ left: scrollAmount(), behavior: "smooth" });
    });
});
