"use client";

import { useEffect, useState } from "react";
import { detectarBunching } from "../lib/bunching";

export default function Home() {
  const [buses, setBuses] = useState<any[]>([]);
  const [alertas, setAlertas] = useState<any[]>([]);

  useEffect(() => {
    // simulación simple pero realista
    const simulacion = [
      { id: 1, ruta: "R01", position: 100 },
      { id: 2, ruta: "R01", position: 130 },
      { id: 3, ruta: "R01", position: 135 }, // bunching
      { id: 4, ruta: "R01", position: 500 }, // hueco
    ];

    setBuses(simulacion);

    const resultado = detectarBunching(simulacion, 120);
    setAlertas(resultado);
  }, []);

  return (
    <main className="container">
      <h1>Control de Frecuencia</h1>

      <section>
        <h2>Buses en Ruta</h2>
        <div className="grid">
          {buses.map((bus) => (
            <div key={bus.id} className="card">
              <span className="id">Bus {bus.id}</span>
              <span>Ruta: {bus.ruta}</span>
              <span>Posición: {bus.position} m</span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2>Alertas Detectadas</h2>
        <div className="grid">
          {alertas.length === 0 && <p>No hay problemas</p>}

          {alertas.map((a, i) => (
            <div
              key={i}
              className={`card alerta ${
                a.tipo === "BUNCHING" ? "rojo" : "amarillo"
              }`}
            >
              <strong>{a.tipo}</strong>
              <span>Bus: {a.bus}</span>
              <span>Diferencia: {a.diferencia.toFixed(2)}</span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}