import React, { useState } from "react";
import styles from "./Modal.module.css";
import Categoria from "../Form/Categoria";
import CampoInput from "../Form/CampoInput";
import fechar from "../../assets/fechar.png";
import { handleInputChange, limparFormulario, editarVideo } from "../Form/FormUtils";

const validarExtensaoImagem = (url) => {
  const extensoesValidas = ['.png', '.jpg', '.jpeg', '.gif', '.bmp', '.webp'];
  return extensoesValidas.some(extensao => url.toLowerCase().endsWith(extensao));
};

const baseUrl = "https://my-json-server.typicode.com/MCyssa/Aluraflix-Challenge_2025/videos";

function ModalEditarVideo({ video, onClose, onSave }) {
  const [editedVideo, setEditedVideo] = useState(video);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    handleInputChange(e, editedVideo, setEditedVideo);
    const { name, value } = e.target;

    // Validação em tempo real para imagem
    if (name === 'imagem' && value && !validarExtensaoImagem(value)) {
      setErrors({
        ...errors,
        [name]: 'Formato inválido. Permitido: .png, .jpg, .jpeg, .gif, .bmp, .webp',
      });
    } else {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  // Limpa o formulário
  const handleClear = () => {
    setEditedVideo(video); 
    setErrors({}); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let valid = true;
    let newErrors = {};

    // Validação da imagem
    if (!validarExtensaoImagem(editedVideo.imagem)) {
      valid = false;
      newErrors.imagem = 'Formato inválido. Permitido: .png, .jpg, .jpeg, .gif, .bmp, .webp';
    }

    if (!valid) {
      setErrors(newErrors);
      return;
    }

    try {
      const updatedVideo = await editarVideo(editedVideo, baseUrl);
      onSave(updatedVideo);
    } catch (error) {
      console.error(error.message);
    }
  };

  const times = ["Frontend", "Backend", "Mobile"];

  return (
    <div className={styles["modal-overlay"]}>
      <div className={styles.modal}>
        <button className={styles.fechar} onClick={onClose}>
          <img src={fechar} alt="botão de fechar o modal" />
        </button>
        <h2 className={styles.titulo}>EDITAR CARD</h2>
        <form className={styles.modalForm} onSubmit={handleSubmit}>
          <CampoInput
            className={styles.modalInput}
            label="Título"
            placeholder="Digite o título"
            name="titulo"
            onChange={handleChange}
            value={editedVideo.titulo || ""}
            error={errors.titulo}
          />
          <Categoria
            className={styles.campo}
            label="Categoria"
            itens={times}
            name="categoria"
            value={editedVideo.categoria || ""}
            onChange={handleChange}
            error={errors.categoria}
          />
          <CampoInput
            className={styles.modalInput}
            label="Link da Imagem"
            placeholder="Digite o link da imagem"
            name="imagem"
            onChange={handleChange}
            value={editedVideo.imagem || ""}
            error={errors.imagem}
            errorMessageClass={styles.errorMessage}
          />
          <CampoInput
            className={styles.modalInput}
            label="Link do Vídeo"
            placeholder="Digite o link do vídeo"
            name="link"
            onChange={handleChange}
            value={editedVideo.link || ""}
            error={errors.link}
          />
          <CampoInput
            className={styles.campo}
            label="Descrição"
            placeholder="Digite a descrição"
            name="descricao"
            isTextArea={true}
            rows={4}
            cols={50}
            onChange={handleChange}
            value={editedVideo.descricao || ""}
            error={errors.descricao}
          />
          <div className={styles.botoes}>
            <button type="submit" className={styles.botaoSalvar}>
              SALVAR
            </button>
            <button type="button" onClick={handleClear} className={styles.botao}>
              LIMPAR
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalEditarVideo;
