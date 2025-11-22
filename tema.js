//codigo comentado, também feito majoritariamente com ajuda de IA, revisado e anotado nas minhas anotações pessoais, JS estou com bastante dificuldade ainda, mas estou estudando para entender melhor 

// Esta função cria um cookie no navegador ou atualiza um que já existe.
// "name" é o nome do cookie.
// "value" é o valor que queremos salvar (por exemplo, "dark" ou "light").
// "days" é por quantos dias o cookie vai durar.


function setCookie(name, value, days) {

  // Criamos um objeto de data do JavaScript
  const d = new Date();

  // Aqui estamos definindo a data de expiração do cookie.
  // Pegamos a data atual e somamos os dias pedidos.
  d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));

  // Transformamos essa data em um texto no formato usado por cookies
  const expires = "expires=" + d.toUTCString();

  // Aqui o cookie é realmente criado no navegador.
  // document.cookie funciona como se estivéssemos escrevendo em uma "lista" de cookies.
  document.cookie = name + "=" + encodeURIComponent(value) + ";" + expires + ";path=/";
}

// Esta função serve para LER um cookie que já existe.
// Ela recebe o nome do cookie e devolve o valor dele.
function getCookie(name) {

  // document.cookie devolve todos os cookies como uma única string.
  // Aqui, estamos separando essa string em várias partes usando "; "
  const cookies = document.cookie.split("; ");

  // Agora vamos procurar cookie por cookie
  for (let c of cookies) {

    // Se o cookie atual começa com "name="
    if (c.startsWith(name + "=")) {

      // Pegamos só o valor depois do "=" e retornamos
      return decodeURIComponent(c.split("=")[1]);
    }
  }

  // Se não achou nenhum cookie com esse nome, devolvemos null
  return null;
}



// ================================
//        LÓGICA DO TEMA
// ================================

// Esse evento roda quando TODA a página já carregou.
// Ou seja, só executa quando tudo está pronto.
document.addEventListener("DOMContentLoaded", () => {

  // Pegamos o botãozinho do tema (aquele switch)
  const toggle = document.getElementById("themeToggle");

  // Pegamos o texto que mostra "Claro" ou "Escuro"
  const themeLabel = document.getElementById("themeLabel");

  // Pegamos o elemento <body>, pois é nele que colocamos o tema
  const body = document.body;



  // ------- Função que realmente aplica o tema -------
  function applyTheme(theme) {

    // Primeiro removemos as classes antigas do body
    body.classList.remove("light-theme", "dark-theme");

    // Se o tema escolhido for "escuro"
    if (theme === "dark") {

      // Coloca classe dark-theme, que troca as cores via CSS
      body.classList.add("dark-theme");
        
      // Marca o switch como ligado
      toggle.checked = true;

      // Atualiza o texto para o usuário saber qual tema está
      themeLabel.textContent = "Escuro";

    } else {
      // Se o tema não for escuro, então é claro

      body.classList.add("light-theme");
      toggle.checked = false;
      themeLabel.textContent = "Claro";
    }



    // E aqui salvamos essa escolha em um cookie que dura 30 dias
    setCookie("theme", theme, 30);
  }


  // Quando a página carrega, tentamos ler o cookie "theme".
  // Se não existir cookie, usamos o tema "light" como padrão.
  const savedTheme = getCookie("theme") || "light";

  // Aqui aplicamos o tema salvo!
  applyTheme(savedTheme);


  // ------- Quando o usuário clica no botão de tema -------
  toggle.addEventListener("change", () => {

    // Se a caixinha estiver marcada, tema escuro. Senão, claro.
    const newTheme = toggle.checked ? "dark" : "light";

    // Chamamos a função que troca o tema + salva no cookie
    applyTheme(newTheme);
  });

  // Expõe uma função global para alternar o tema via chamadas externas
  // (por exemplo: <button onclick="toggleTheme()">Toggle</button>)
  window.toggleTheme = function() {
    const current = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
  };
});

console.log("tema.js carregado"); // debug

const logoutButton = document.getElementById("logout");

if (!logoutButton) {
  console.warn("Botão de logout não encontrado — ignorando handler de logout.");
} else {
  console.log("Botão de logout encontrado, adicionando listener...");

  logoutButton.addEventListener("click", (event) => {
    event.preventDefault(); // bloqueia qualquer submit/acesso estranho

    console.log("Logout clicado, redirecionando para a página principal...");
    window.location.href = "index.html"; // confere se esse nome de arquivo está certo
  });
}



