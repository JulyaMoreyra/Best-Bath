import React, { useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState("");
  const [pequenos, setPequenos] = useState(0);
  const [grandes, setGrandes] = useState(0);
  const [resultado, setResultado] = useState(null);
  const [erro, setErro] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");
    setResultado(null);

    try {
      const response = await fetch("http://localhost:3005/melhor-petshop", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data,
          pequenos: Number(pequenos),
          grandes: Number(grandes),
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao buscar o melhor petshop");
      }

      const resultado = await response.json();
      setResultado(resultado);
    } catch (error) {
      setErro(error.message);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="bg-marrom px-5 pt-2 pb-4">
          <h2 className="poppins-semibold mt-5 mb-5 petshop-title">
            Petshop Ideal
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="input-group mb-3 poppins-regular ">
              <span
                className="input-group-text poppins-regular petshop-title"
                id="addon-wrapping"
              >
                Data
              </span>
              <input
                type="text"
                className="form-control "
                value={data}
                onChange={(e) => setData(e.target.value)}
                placeholder="dd/mm/aaaa"
                aria-label="Username"
                aria-describedby="input data"
                required
              />
            </div>
            <div className="input-group mb-3 poppins-regular">
              <span
                className="input-group-text poppins-regular"
                id="addon-wrapping"
              >
                Quantidade de Cães Pequenos
              </span>
              <input
                className="form-control"
                type="number"
                value={pequenos}
                onChange={(e) => setPequenos(e.target.value)}
                aria-label="Username"
                aria-describedby="input data"
                required
              />
            </div>
            <div className="input-group mb-3 poppins-regular pb-4">
              <span
                className="input-group-text poppins-regular"
                id="addon-wrapping"
              >
                Quantidade de Cães Grandes
              </span>
              <input
                className="form-control"
                type="number"
                value={grandes}
                onChange={(e) => setGrandes(e.target.value)}
                required
              />
            </div>

            <div className="d-grid gap-2 d-md-flex justify-content-md-end pb-3">
              <button
                type="submit"
                className="btn btn-primary"
                style={{ backgroundColor: "#372B27", border: "none" }}
              >
                Buscar Melhor Petshop
              </button>
            </div>
          </form>
        </div>

        <div className="resultado mt-5 poppins-regular text-light pt-4">
          {erro && <p style={{ color: "red" }}>{erro}</p>}
          {resultado ? (
            <div className="mt-3">
              <h2 className="pb-3 poppins-bold">
                Melhor Petshop: {resultado.melhorPetshop.nome}
              </h2>
              <h4 className="text-center pb-3 poppins-light ">
                Preço Total: R$ {resultado.melhorPetshop.preco.toFixed(2)}
              </h4>

              <div className="container">
                <div className="row m-3 pb-5">
                  <div className="col rounded-5 border border-4 mx-4 pt-4">
                    <h5 className="pb-3 poppins-bold">
                      Preço Intermediário: {resultado.precoIntermediario.nome}
                    </h5>
                    <p className="text-center pb-3 text-light">
                      Preço Total: R${" "}
                      {resultado.precoIntermediario.preco.toFixed(2)}
                    </p>
                  </div>
                  <div className="col rounded-5 border border-4 mx-4 pt-4">
                    <h5 className="pb-3 poppins-bold">
                      Pior preço: {resultado.piorPetshop.nome}
                    </h5>
                    <p className="text-center pb-3 text-light">
                      Preço Total: R$ {resultado.piorPetshop.preco.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-center pb-5 poppins-light px-4">
              Insira as informações dos seus amiguinhos peludos e clique em
              "Buscar Melhor Petshop" para encontrar o lugar perfeito para eles!
            </p>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
