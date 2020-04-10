import React from "react";
import { Link } from "react-router-dom";

function About() {
  return (
    <div>
      <h1>Com funciona?</h1>
      <p>
        <i>
          Durant el confinament per la pandèmia del COVID-19, molts venedors i
          venedores dels nostres barris han vist com disminuien les seves ventes
          de forma preocupant.
        </i>
      </p>
      <p>
        <b>Comencia</b> és una plataforma molt senzilla destinada a facilitar el
        comerç de les botigues de barri.
      </p>
      <p>
        El venedor crea un <b>anunci</b> per la seva botiga i afegeix una sèrie
        de <b>lots de productes</b> disponibles.
      </p>
      <p>
        Mitjançant un <b>mapa interactiu</b>, els veins i veines de la zona
        poden trobar els anuncis dels comerços més propers que necessiten ajuda.
      </p>
      <h2 style={{ color: "#88B04B" }}>Si ets venedor:</h2>
      <ol>
        <li>
          <Link to="/login">Accedeix</Link> o{" "}
          <Link to="/signup">Registra't</Link>
        </li>
        <p>Necessitarem un telèfon per validar el teu negoci</p>
        <li>Afegeix un anunci</li>
        <p>
          Et demanarem que introdueixis els lots de productes que ofereix el teu
          comerç
        </p>
      </ol>
      <h2 style={{ color: "#FF6F61" }}>Si ets comprador:</h2>
      <ol>
        <li>
          <Link to="/login">Accedeix</Link> o{" "}
          <Link to="/signup">Registra't</Link>
        </li>
        <li>
          Troba els comerços del teu barri al{" "}
          <Link to="/">mapa interactiu</Link>
        </li>{" "}
        <li>
          Selecciona un anunci i escull el lot que t'interessa.{" "}
          <u>
            Et posarem en contacte amb la botiga perquè podeu efectuar la
            compra.
          </u>
        </li>
      </ol>
    </div>
  );
}

export default About;
