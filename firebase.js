
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";

import {
    getDatabase,
    ref,
    push,
    set,
    serverTimestamp,
    onValue,
    query,
    orderByChild,
    limitToLast
} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyAzPxz2gmEYr_sEvE-oMVx-gX2cAMv_3Kk",
    authDomain: "conemaccomentarios.firebaseapp.com",
    databaseURL: "https://conemaccomentarios-default-rtdb.firebaseio.com",
    projectId: "conemaccomentarios",
    storageBucket: "conemaccomentarios.firebasestorage.app",
    messagingSenderId: "719459152096",
    appId: "1:719459152096:web:fced018793b243ebaa6085",
    measurementId: "G-FNXS49YEQY"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Conectar ao Realtime Database
const db = getDatabase(app);

// Elementos HTML
const form = document.getElementById("formComentario");
const nome = document.getElementById("nomeComentario");
const texto = document.getElementById("textoComentario");
const mensagem = document.getElementById("mensagemComentario");
const botao = document.getElementById("enviarComentario");
const listaComentarios = document.getElementById("comentariosPublicados");

// Enviar comentário
form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const comentario = texto.value.trim();
    const autor = nome.value.trim();

    if (!comentario) {
        mensagem.textContent = "Escreva um comentário primeiro.";
        return;
    }

    botao.disabled = true;
    mensagem.textContent = "Enviando...";

    try {
        const comentariosRef = ref(db, "comentarios");
        const novoComentario = push(comentariosRef);

        await set(novoComentario, {
            nome: autor || "Anônimo",
            texto: comentario,
            data: serverTimestamp()
        });

        mensagem.textContent = "Seu comentário foi enviado!";
        form.reset();

    } catch (erro) {
        console.error("Erro ao enviar:", erro);
        mensagem.textContent = "Não foi possível enviar. Tente novamente.";
    }

    botao.disabled = false;
});

// Mostrar comentários automaticamente
const comentariosRef = ref(db, "comentarios");

const consultaComentarios = query(
    comentariosRef,
    orderByChild("data"),
    limitToLast(50)
);

onValue(consultaComentarios, (snapshot) => {
    listaComentarios.innerHTML = "";

    if (!snapshot.exists()) {
        listaComentarios.textContent = "Ainda não existem comentários. Seja o primeiro!";
        return;
    }

    const comentarios = [];

    snapshot.forEach((item) => {
        comentarios.push(item.val());
    });

    // Os mais recentes primeiro
    comentarios.reverse();

    comentarios.forEach((comentario) => {
        const card = document.createElement("article");
        card.classList.add("cardComentario");

        const autor = document.createElement("h3");
        autor.textContent = comentario.nome || "Anônimo";

        const conteudo = document.createElement("p");
        conteudo.textContent = comentario.texto || "";

        const data = document.createElement("small");

        if (comentario.data) {
            data.textContent = new Date(comentario.data)
                .toLocaleString("pt-BR");
        }

        card.appendChild(autor);
        card.appendChild(conteudo);
        card.appendChild(data);

        listaComentarios.appendChild(card);
    });

}, (erro) => {
    console.error("Erro ao carregar comentários:", erro);
    listaComentarios.textContent = "Não foi possível carregar os comentários.";
});
