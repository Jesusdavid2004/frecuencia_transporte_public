export function detectarBunching(buses: any[], frecuencia: number) {
  const ordenados = [...buses].sort((a, b) => a.position - b.position);

  const resultado: {
    tipo: string;
    bus: number;
    diferencia: number;
  }[] = [];

  for (let i = 1; i < ordenados.length; i++) {
    const actual = ordenados[i];
    const anterior = ordenados[i - 1];

    const diferencia = actual.position - anterior.position;

    if (diferencia < frecuencia * 0.4) {
      resultado.push({
        tipo: "BUNCHING",
        bus: actual.id,
        diferencia,
      });
    }

    if (diferencia > frecuencia * 1.6) {
      resultado.push({
        tipo: "HUECO",
        bus: actual.id,
        diferencia,
      });
    }
  }

  return resultado;
}