export function handleInputChange(event, currentState, setState) {
  const { name, value, type, checked } = event.target;

  setState({
    ...currentState,
    [name]: type === "checkbox" ? checked : value, 
  });
}

export function limparFormulario(setState, camposIniciais) {
  setState(camposIniciais);
}

const baseUrl = "https://my-json-server.typicode.com/MCyssa/Aluraflix-Challenge_2025/videos";

export async function salvarVideo(video) {
  const response = await fetch(`${baseUrl}`, {
    method: 'POST',
    body: JSON.stringify(video),
    headers: { 'Content-Type': 'application/json' },
  });
  if (!response.ok) {
    throw new Error('Erro ao salvar o vídeo');
  }
  return await response.json();
}

export async function editarVideo(video) {
  const response = await fetch(`${baseUrl}/${video.id}`, {
    method: 'PUT',
    body: JSON.stringify(video),
    headers: { 'Content-Type': 'application/json' },
  });
  if (!response.ok) {
    throw new Error('Erro ao editar o vídeo');
  }
  return await response.json();
}
