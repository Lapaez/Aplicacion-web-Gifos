
import "./App.css";
import React, { Component,useState, useEffect }  from 'react';
import Filtros from './components/Filtros';
import Encabezado from "./components/Encabezado";
import Principal from "./components/Principal";
function App(props) {
  const [modo, acutalizarModo] = useState(true);
  const [busqueda, acutalizarBusqueda] = useState("");
  const [buscarBtn, actualizarBuscarBtn] = useState(false);
  const [dataGif, actualizarDataGif] = useState([]);
  const [enviar, actualizarEnviar] = useState("");
  const [dataAuto, actualizarDataAuto] = useState([]);
  const manejarModo = () => {
    acutalizarModo(!modo);
  };
  const manejarBusqueda = (e) => {
    const busqueda = e.target.value;
    acutalizarBusqueda(busqueda);
  };
  const manejarCancelarBusqueda = () => {
    acutalizarBusqueda("");
  };
  const manejarBuscarBtn = (e) => {
    e.preventDefault();
    actualizarBuscarBtn(true);
    actualizarEnviar(busqueda);
  };
  useEffect(() => {
    if (buscarBtn === true) {
      let key = "ujI1Zuy6lPUNN7wR2oRBEUEnYC7BaqXW";
      let urlSearch = "https://api.giphy.com/v1/gifs/search";
      let petision = fetch(
        `${urlSearch}?api_key=${key}&q=${busqueda}&limit=15&offset=0&rating=g&lang=en`
      );
      petision
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          actualizarBuscarBtn(false);
          acutalizarBusqueda("");
          actualizarDataGif(data.data);
        });
    }
  }, [buscarBtn, busqueda]);
  useEffect(() => {
    let key = "ujI1Zuy6lPUNN7wR2oRBEUEnYC7BaqXW";
    let petision = fetch(
      `https://api.giphy.com/v1/gifs/search/tags?api_key=${key}&q=${busqueda}&limit=5&offset=0&rating=g&lang=en`
    );
    petision
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        actualizarDataAuto(data.data);
      });
  }, [busqueda]);
  return (
    <div
      className={`${
        modo
          ? "App flex flex-direction align-items-center"
          : " App flex flex-direction align-items-center modo-dark "
      }`}
    >
      <Encabezado manejarModo={manejarModo} modo={modo} />
      <Filtros
        modo={modo}
        manejarBusqueda={manejarBusqueda}
        busqueda={busqueda}
        manejarBuscarBtn={manejarBuscarBtn}
        dataGif={dataGif}
        dataAuto={dataAuto}
        manejarCancelarBusqueda={manejarCancelarBusqueda}
      />
      <Principal
        dataGif={dataGif}
        actualizarDataGif={actualizarDataGif}
        buscarBtn={buscarBtn}
        busqueda={busqueda}
        modo={modo}
        enviar={enviar}
      />
    </div>
  );
}

export default App;