"use client";

import { useEffect, useState } from "react";
import { detectBunching } from "@/lib/bunching";

export default function Home() {
  const [buses, setBuses] = useState<any[]>([]);
  const [alertas, setAlertas] = useState<any[]>([]);

  useEffect(() => {
    // simulación simple (NO worker)
    const data = [
      { id: 1, ruta: "R01", position: 100 },
      { id: 2, ruta: "R01", position: 120 }, 
      { id: 3, ruta: "R01", position: 400 },
    ];

    setBuses(data);

    const resultado = detectBunching(data, 100);
    setAlertas(resultado);
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Control de Transporte</h1>

      <h2>Buses:</h2>
      {buses.map((b, i) => (
        <div key={i}>
          Bus {b.id} - posición {b.position}
        </div>
      ))}

      <h2>Alertas:</h2>
      {alertas.map((a, i) => (
        <div key={i}>
          {a.tipo} en bus {a.bus}
        </div>
      ))}
    </div>
  );
}