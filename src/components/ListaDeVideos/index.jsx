import React, { useEffect, useState } from "react";
import CardVideo from "./CardVideo"; 
import styles from "./ListaDeVideos.module.css";
import ModalEditarVideo from "../Modal";

function ListaDeVideos() {
  const [videos, setVideos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [videoEdit, setVideoEdit] = useState(null);

  const baseUrl = "https://my-json-server.typicode.com/MCyssa/Aluraflix-Challenge_2025/videos";

  useEffect(() => {
    fetch(baseUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao buscar vídeos");
        }
        return response.json();
      })
      .then((data) => setVideos(data))
      .catch((error) => console.error("Erro ao carregar os dados:", error));
  }, []);

  // Função para abrir o modal de edição
  const abrirModal = (video) => {
    setVideoEdit(video);
    setModalVisible(true);
  };

  // Função para fechar o modal
  const fecharModal = () => {
    setModalVisible(false);
    setVideoEdit(null);
  };

  // Função para salvar a edição do vídeo
  const salvarEdicao = (videoEditado) => {
    fetch(`${baseUrl}/${videoEditado.id}`, {
      method: "PUT",
      body: JSON.stringify(videoEditado),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setVideos((prevVideos) =>
          prevVideos.map((video) => (video.id === data.id ? data : video))
        );
        fecharModal();
      })
      .catch((error) => console.error("Erro ao editar o vídeo:", error));
  };

  // Função para deletar o vídeo
  const deletarVideo = (id) => {
    fetch(`${baseUrl}/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          setVideos((prevVideos) => prevVideos.filter((video) => video.id !== id));
        } else {
          console.error("Erro ao deletar o vídeo");
        }
      })
      .catch((error) => console.error("Erro ao deletar o vídeo:", error));
  };

  // Organiza os vídeos por categoria
  const videosPorCategoria = videos.reduce((acc, video) => {
    acc[video.categoria] = acc[video.categoria] || [];
    acc[video.categoria].push(video);
    return acc;
  }, {});

  return (
    <div className={styles.lista}>
      {Object.keys(videosPorCategoria).map((categoria) => {
        const corDeFundo = getCorPorCategoria(categoria);
        return (
          <div key={categoria}>
            <h2
              className={styles.tituloCategoria}
              style={{ backgroundColor: corDeFundo }}
            >
              {categoria}
            </h2>
            <div className={styles.cardsContainer}>
              {videosPorCategoria[categoria].map((video) => (
                <CardVideo
                  key={video.id}
                  nome={video.titulo}
                  imagem={video.imagem}
                  corDeFundo={corDeFundo}
                  onDelete={() => deletarVideo(video.id)}
                  onEdit={() => abrirModal(video)}
                />
              ))}
            </div>
          </div>
        );
      })}

      {modalVisible && videoEdit && (
        <ModalEditarVideo
          video={videoEdit}
          onClose={fecharModal}
          onSave={salvarEdicao}
        />
      )}
    </div>
  );
}

function getCorPorCategoria(categoria) {
  const cores = {
    Frontend: "#6BD1FF",
    Backend: "#00C86F",
    Mobile: "#FFBA05",
  };
  return cores[categoria];
}

export default ListaDeVideos;
