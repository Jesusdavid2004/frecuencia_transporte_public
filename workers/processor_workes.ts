self.onmessage = (event) => {
  const data = event.data;

  const procesados = data.map((bus: any) => {
    return {
      ...bus,
      procesado: true,
    };
  });

  self.postMessage(procesados);
};