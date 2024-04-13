const url = "";

console.log('estou aqui')

const form = document.getElementById("login-form"); //acessando métodos e propriedades do formulário, não acessa de fato é com se fosse um atalho para aquele elemento
const message = document.getElementById("error-message");

//criando um método que escuta um evento e apartir de um evento executa uma ação
form.addEventListener("submit", async function (event) {
  event.preventDefault(); // Evita que a página recarregue

  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;

  if (username === "" || email === "") {
    message.textContent = "Usuário ou email está vazio";
    return;
  }

  console.log("helo")

  await fetch(`https://poupe-mais-api.vercel.app/user/sign-in`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // Example content type
    },
    body: JSON.stringify({ username, email }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json(); //convertendo a resposta em json para um objeto js
    }) // Parse the response as JSON
    .then((data) => {
      console.log(data);
      console.log(data.body)

      console.log("ola")
      const userData = {
        username: data.body.username,
        monthlyIncome: data.body.monthlyIncome,
      };

      sessionStorage.setItem("token", data.body.token);
      sessionStorage.setItem("username", JSON.stringify(data.body.username));

      window.location.href = "dashboard.html";
    })
    .catch((error) => {
      message.textContent = "Usuário ou email já foram cadastrados.";
      console.error("this", error); // Handle errors
    });
});