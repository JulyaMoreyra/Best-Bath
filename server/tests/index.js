// URL do endpoint da API
const url = "http://localhost:3005/melhor-petshop";

// Dados de entrada para o teste
const data = "03/08/2018";
const pequenos = 3;
const grandes = 5;

// Definir os resultados esperados
const resultadoEsperado = {
  melhorPetshop: { nome: "Meu Canino Feliz", preco: 260 },
  precoIntermediario: { nome: "Vai Rex", preco: 295 },
  piorPetshop: { nome: "ChowChawgas", preco: 315 },
};

// Definir as opções da requisição
const options = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ data, pequenos, grandes }),
};

console.log("Iniciando teste...", options);

// Fazer a requisição à API
fetch(url, options)
  .then((res) => {
    // Verificar se a requisição foi bem-sucedida
    if (res.ok) {
      // Parsear a resposta como JSON
      return res.json();
    } else {
      // Rejeitar a promessa com o status de erro
      return Promise.reject(`Erro: ${res.status}`);
    }
  })
  .then((data) => {
    console.log("Dados retornados pela API:", data);
    console.log("Resultados esperados:", resultadoEsperado);
    // Comparar os resultados esperados com os resultados retornados pela API
    if (JSON.stringify(data) === JSON.stringify(resultadoEsperado)) {
      console.log("Teste passou: os resultados estão corretos!");
    } else {
      console.log("Teste falhou: os resultados estão incorretos!");
    }
  })
  .catch((error) => {
    // Lidar com erros de requisição
    console.error("Erro ao fazer a requisição:", error);
  });
