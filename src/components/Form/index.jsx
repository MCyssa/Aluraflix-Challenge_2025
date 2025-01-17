import { useState } from "react";
import CampoInput from "./CampoInput";
import Categoria from "./Categoria";
import styles from "./Form.module.css";
import { salvarVideo, limparFormulario } from "./FormUtils";

const validarExtensaoImagem = (url) => {
  const extensoesValidas = ['.png', '.jpg', '.jpeg', '.gif', '.bmp', '.webp'];
  return extensoesValidas.some(extensao => url.toLowerCase().endsWith(extensao));
};

function Form() {
  const times = ["Frontend", "Backend", "Mobile"];
  const [formData, setFormData] = useState({
    titulo: "",
    categoria: "",
    imagem: "",
    video: "",
    descricao: "",
  });
  const [errors, setErrors] = useState({});

  const camposIniciais = {
    titulo: "",
    categoria: "",
    imagem: "",
    video: "",
    descricao: "",
  }

  const baseUrl = "https://my-json-server.typicode.com/MCyssa/Aluraflix-Challenge_2025/videos";

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: '',
    });
  };

  const handleSave = async () => {
    let valid = true;
    let newErrors = {};

    // Validação de campos vazios
    if (!formData.titulo) {
      valid = false;
      newErrors.titulo = 'Campo obrigatório';
    }
    if (!formData.categoria) {
      valid = false;
      newErrors.categoria = 'Selecione uma categoria válida';
    }
    if (!formData.imagem) {
      valid = false;
      newErrors.imagem = 'Campo obrigatório';
    } else if (!validarExtensaoImagem(formData.imagem)) {
      valid = false;
      newErrors.imagem = 'Formato inválido. Permitido: .png, .jpg, .jpeg, .gif, .bmp, .webp';
    }
    if (!formData.video) {
      valid = false;
      newErrors.video = 'Campo obrigatório';
    }
    
    if (!valid) {
      setErrors(newErrors);
      return;
    }

    try {
      await salvarVideo(formData, baseUrl);
      limparFormulario(setFormData, camposIniciais);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.titulo}>
        <h2>NOVO VÍDEO</h2>
        <p>COMPLETE O FORMULÁRIO PARA CRIAR UM NOVO CARD DE VÍDEO.</p>
      </div>
      <div className={styles.campos}>
        <CampoInput
          className={styles.campo}
          label="Título"
          placeholder="Digite o título"
          name="titulo"
          value={formData.titulo}
          onChange={handleInputChange}
          error={errors.titulo}
          errorMessageClass={styles.errorMessage}
        />
        <Categoria
          className={styles.campo}
          label="Categoria"
          itens={times}
          name="categoria"
          value={formData.categoria}
          onChange={handleInputChange}
          error={errors.categoria}
          errorMessageClass={styles.errorMessage}
        />
      </div>
      <div className={styles.campos}>
        <CampoInput
          className={styles.campo}
          label="Imagem"
          placeholder="Digite o link da imagem"
          name="imagem"
          value={formData.imagem}
          onChange={handleInputChange}
          error={errors.imagem}
          errorMessageClass={styles.errorMessage}
        />
        <CampoInput
          className={styles.campo}
          label="Vídeo"
          placeholder="Digite o link do vídeo"
          name="video"
          value={formData.video}
          onChange={handleInputChange}
          error={errors.video}
          errorMessageClass={styles.errorMessage}
        />
      </div>
      <div className={styles.campos}>
        <CampoInput
          className={styles.campo}
          label="Descrição"
          placeholder="Digite a descrição"
          name="descricao"
          value={formData.descricao}
          isTextArea={true} 
          rows={4}
          cols={50}
          onChange={handleInputChange}
          error={errors.descricao}
          errorMessageClass={styles.errorMessage}
        />
      </div>
      <div className={styles.botoes}>
        <button 
        className={styles.botaoSalvar} 
        onClick={handleSave}>SALVAR</button>
        <button 
        className={styles.botao}
        onClick={() => limparFormulario(setFormData, camposIniciais)}>LIMPAR</button>
      </div>
    </div>
  );
}

export default Form;
