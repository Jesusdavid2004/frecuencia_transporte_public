import { BusState } from "@/types/bus";

export function detectBunching(buses: BusState[], frecuencia: number) {
  const ordenados = [...buses].sort((a, b) => a.position - b.position);

  const alertas: any[] = [];

  for (let i = 1; i < ordenados.length; i++) {
    const gap = ordenados[i].position - ordenados[i - 1].position;

    if (gap < frecuencia * 0.4) {
      alertas.push({
        tipo: "bunching",
        bus: ordenados[i].id,
      });
    }

    if (gap > frecuencia * 1.6) {
      alertas.push({
        tipo: "hueco",
        bus: ordenados[i].id,
      });
    }
  }

  return alertas;
}