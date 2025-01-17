import React, { useState, useEffect } from 'react';
import styles from './CardVideo.module.css';
import deletar from '../../../assets/deletar.png';
import editar from '../../../assets/editar.png';

const validarImagem = (url) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;

    img.onload = () => resolve(true);
    img.onerror = () => reject(false);
  });
};

function CardVideo({ nome, imagem, corDeFundo, onDelete, onEdit }) {
  const [imageSrc, setImageSrc] = useState('https://via.placeholder.com/300x150?text=Imagem+Inválida');

  useEffect(() => {
    validarImagem(imagem)
      .then(() => {
        setImageSrc(imagem);
      })
      .catch(() => {
        console.error('Erro ao carregar a imagem:', imagem);
      });
  }, [imagem]);

  return (
    <div className={styles.card}>
      <div
        className={styles.imageWrapper}
        style={{
          '--sombra-cor': corDeFundo,
        }}
      >
        <img src={imageSrc} alt={nome} className={styles.image} />
      </div>
      <div 
        className={styles.rodape}
        style={{ '--sombra-cor': corDeFundo }}
      >
        <button 
          onClick={onDelete}
          aria-label="Deletar vídeo"
        >
          <img className={styles.icone} src={deletar} alt="ícone de deletar" />
          DELETAR
        </button>
        <button 
          onClick={onEdit}
          aria-label="Editar vídeo"
        >
          <img className={styles.icone} src={editar} alt="ícone de editar" />
          EDITAR
        </button>
      </div>
    </div>
  );
}

export default CardVideo;
