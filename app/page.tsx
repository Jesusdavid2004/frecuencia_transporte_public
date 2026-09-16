"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [buses, setBuses] = useState<any[]>([]);

  useEffect(() => {
    const worker = new Worker(
      new URL("../workers/processor.worker.ts", import.meta.url)
    );

    worker.onmessage = (e) => {
      setBuses(e.data);
    };

    const interval = setInterval(() => {
      worker.postMessage([
        {
          bus: 1,
          ruta: "R01",
          lat: 1.213,
          lon: -77.28,
        },
      ]);
    }, 1000);

    return () => {
      clearInterval(interval);
      worker.terminate();
    };
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Control de Transporte</h1>

      {buses.map((b, i) => (
        <div key={i}>
          Bus {b.bus} - activo
        </div>
      ))}
    </div>
  );
}