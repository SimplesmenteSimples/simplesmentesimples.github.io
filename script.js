/*
 script.js
 Responsável por comportamentos e validações do formulário.
 - Seleciona elementos do DOM (form e campo de email)
 - No submit do formulário valida o formato do email com uma regex simples
 - Se inválido: impede o envio, define uma mensagem personalizada
	 com setCustomValidity() e exibe essa mensagem com reportValidity()
 - Ao editar o campo a mensagem personalizada é removida automaticamente
	 (para que a validação nativa volte a funcionar normalmente)

*/

/* Oi Prof, essa parte do código foi majoritariamente escrito com ajuda de inteligência artificial, pedi que fizesse comentários explicativos, tenho tudo anotado 
e revisado nas minhas anotações pessoais, ainda estou estudando essa parte do JS e destrinchando o funcionamento do código.

estava bastante tempo preso nessa parte do JavaScript, então pedi ajuda para conseguir avançar no projeto, depois terei mais tempo para estudar e entender melhor.
*/

// Seleciona o input de email e o formulário pelo id atribuído em index.html
const emailInput = document.getElementById('email');
const form = document.getElementById('signupForm');
// Seleciona o campo nome para aplicar prevenção de números em tempo real
const nomeInput = document.getElementById('nome');



// Garante que ambos elementos existam antes de anexar listeners
if (form && emailInput) {
	// Adiciona listener no envio do formulário
	form.addEventListener('submit', function (e) {
		
		const value = emailInput.value.trim();

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

		if (!emailRegex.test(value)) {
			e.preventDefault(); // impede o envio do formulário

			emailInput.setCustomValidity('Por favor insira um email válido (ex: nome@dominio.com)');
			emailInput.reportValidity();

			const clearHandler = () => {
				emailInput.setCustomValidity('');
				emailInput.removeEventListener('input', clearHandler);
			};
			emailInput.addEventListener('input', clearHandler);
		} else {
			// aqui o email é válido 
			e.preventDefault(); // opcional, mas bom pra garantir que não recarregue a mesma página

			emailInput.setCustomValidity('');
			sessionStorage.setItem("emaildigitado", emailInput.value);

			// redireciona para a outra página
			window.location.href = "tema.html";
		}
	});
}

// PREVENÇÃO EM TEMPO REAL: impede que o usuário digite números no campo Nome
// PREVENÇÃO EM TEMPO REAL: impede que o usuário digite números ou símbolos no campo Nome
if (nomeInput) {
	/*
		Estratégia:
		- No evento `input` removemos qualquer caractere que não esteja na lista
			de permitidos (letras — incluindo acentuadas — espaços, hífen e apóstrofo).
		- No evento `keydown` prevenimos teclas que não representam caracteres
			permitidos (mas deixamos passar teclas de edição/navegação como Backspace,
			Delete, Tab, Arrow keys e shortcuts como Ctrl/Cmd+C).
	*/

	// regex de caracteres permitidos (uma vez por caractere)
	const allowedChar = /[A-Za-zÀ-ÖØ-öø-ÿ\s'\-]/;

	// Remove quaisquer caracteres não permitidos (útil para colagem)
	nomeInput.addEventListener('input', function () {
		const cleaned = this.value.replace(/[^A-Za-zÀ-ÖØ-öø-ÿ\s'\-]/g, '');
		if (this.value !== cleaned) this.value = cleaned;
	});

	// Bloqueia a digitação de teclas que gerariam caracteres não permitidos
	nomeInput.addEventListener('keydown', function (e) {
		// Permitir teclas de controle/edição/navigation
		const controlKeys = ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Tab", "Home", "End"];
		if (controlKeys.includes(e.key)) return;

		// Permitir atalhos com Ctrl/Cmd (Copiar/colar etc.)
		if (e.ctrlKey || e.metaKey) return;

		// Se for um caractere (key.length === 1), checar se é permitido
		if (e.key && e.key.length === 1 && !allowedChar.test(e.key)) {
			e.preventDefault();
		}
	});
}

