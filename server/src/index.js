const express = require("express");
const cors = require("cors");
const app = express();
const port = 3005;

app.use(cors());
app.use(express.json());

function calcularPrecoPetshop(petshop, pequenos, grandes, diaSemana) {
  let precoTotal = 0;

  if (petshop.precoP !== undefined) {
    precoTotal = petshop.precoP * pequenos + petshop.precoG * grandes;
  } else if (diaSemana === 0 || diaSemana === 6) {
    if (petshop.precoFDSP !== undefined && petshop.precoFDSG !== undefined) {
      precoTotal = petshop.precoFDSP * pequenos + petshop.precoFDSG * grandes;
    } else if (petshop.precoFDSP !== undefined) {
      precoTotal = petshop.precoFDSP * pequenos + petshop.precoBaseG * grandes;
    } else if (petshop.precoFDSG !== undefined) {
      precoTotal = petshop.precoBaseP * pequenos + petshop.precoFDSG * grandes;
    } else {
      precoTotal =
        petshop.precoBaseP * petshop.percentualFDS * pequenos +
        petshop.precoBaseG * petshop.percentualFDS * grandes;
    }
  } else {
    precoTotal = petshop.precoBaseP * pequenos + petshop.precoBaseG * grandes;
  }

  return precoTotal;
}

function calcularMelhorPetshop(data, pequenos, grandes) {
  const [dia, mes, ano] = data.split("/").map(Number);
  const dataObj = new Date(ano, mes - 1, dia);
  const diaSemana = dataObj.getDay();
  const petshops = [
    {
      nome: "Meu Canino Feliz",
      distancia: 2,
      precoBaseP: 20,
      precoBaseG: 40,
      percentualFDS: 1.2,
    },
    {
      nome: "Vai Rex",
      distancia: 1.7,
      precoBaseP: 15,
      precoBaseG: 50,
      precoFDSP: 20,
      precoFDSG: 55,
    },
    {
      nome: "ChowChawgas",
      distancia: 0.8,
      precoP: 30,
      precoG: 45,
    },
  ];

  const precos = petshops.map((petshop) => ({
    nome: petshop.nome,
    distancia: petshop.distancia,
    preco: calcularPrecoPetshop(petshop, pequenos, grandes, diaSemana),
  }));

  // Ordenar os preços em ordem crescente
  precos.sort((a, b) => a.preco - b.preco);

  return precos;
}

function obterMelhorPreco(precos) {
  precos.sort((a, b) => a.preco - b.preco || a.distancia - b.distancia);
  return { nome: precos[0].nome, preco: precos[0].preco };
}

function obterPrecoIntermediario(precos) {
  precos.sort((a, b) => a.preco - b.preco || a.distancia - b.distancia);
  const intermediarioIndex = Math.floor(precos.length / 2);
  return {
    nome: precos[intermediarioIndex].nome,
    preco: precos[intermediarioIndex].preco,
  };
}

function obterPiorPreco(precos) {
  precos.sort((a, b) => a.preco - b.preco || a.distancia - b.distancia);
  const ultimoIndex = precos.length - 1;
  return { nome: precos[ultimoIndex].nome, preco: precos[ultimoIndex].preco };
}

app.post("/melhor-petshop", (req, res) => {
  console.log("Recebido:", req.body);
  const { data, pequenos, grandes } = req.body;
  const precos = calcularMelhorPetshop(data, pequenos, grandes);
  const melhorPetshop = obterMelhorPreco(precos);
  const precoIntermediario = obterPrecoIntermediario(precos);
  const piorPetshop = obterPiorPreco(precos);
  console.log(
    "Enviando:",
    JSON.stringify({ melhorPetshop, precoIntermediario, piorPetshop })
  );
  res.json({
    melhorPetshop,
    precoIntermediario,
    piorPetshop,
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
