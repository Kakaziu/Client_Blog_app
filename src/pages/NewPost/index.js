import React, { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "./style.css";
import {
  addPostRequest,
  editPostRequest,
} from "../../store/modules/post/postActions";
import api from "../../services/api";

const NewPost = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // eslint-disable-line
  const { id } = useParams();
  const posts = useSelector((state) => state.PostReducer);

  const [paragraphs, setParagraphs] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [photoInfo, setPhotoInfo] = useState({ photo_url: "", photo_file: "" });
  const [isFinish, setIsFinish] = useState(false);
  const [caughtPost, setCaughtPost] = useState(null);

  useEffect(() => {
    if (id) getPost();
  }, []);

  useEffect(() => {
    if (caughtPost) {
      setTitle(caughtPost.title);
      setPhotoInfo({
        photo_url: caughtPost.photo_post_url,
        photo_file: caughtPost.photo_post_url,
      });

      const caughtParagraphs = caughtPost.description.split("///");
      let setCaughtParagraphs = [];

      caughtParagraphs.forEach((paragraph) => {
        setCaughtParagraphs.push({ content: paragraph, saved: false });
      });

      setParagraphs(setCaughtParagraphs);
    }
  }, [caughtPost]);

  function handleChange(e) {
    const inputTarget = e.target;
    const file = inputTarget.files[0];

    if (file) {
      const reader = new FileReader();

      reader.addEventListener("load", (e) => {
        const readerTarget = e.target;

        setPhotoInfo({ photo_url: readerTarget.result, photo_file: file });
      });

      reader.readAsDataURL(file);
    } else {
      setPhotoInfo({ photo_url: "", photo_file: "" });
    }
  }

  function addParagraph(e) {
    e.preventDefault();

    setParagraphs([...paragraphs, { content: "", saved: false }]);
  }

  function onChangeTextarea(index, e) {
    const paragraphsRef = [...paragraphs];

    paragraphsRef.splice(index, 1, { content: e.target.value, saved: false });

    setParagraphs(paragraphsRef);
  }

  function saveParagraph(e, index) {
    if (isFinish) {
      toast.warn("Os parágrafos foram finalizados.");
      return;
    }

    e.preventDefault();
    const btn = e.target;
    const textarea = btn.previousSibling;

    const paragraphRef = [...paragraphs];

    if (!textarea.value) {
      toast.error("Não pode salvar parágrafos vazios.");
      return;
    }

    paragraphRef.splice(index, 1, {
      content: textarea.value.trim(),
      saved: true,
    });

    setParagraphs(paragraphRef);
  }

  function editParagraph(e, index) {
    if (isFinish) {
      toast.warn("Os parágrafos foram finalizados.");
      return;
    }

    e.preventDefault();

    const paragraphRef = [...paragraphs];

    const paragraph = paragraphRef.filter((paragraph, id) => id === index);
    const content = paragraph.content;

    paragraphRef.splice(index, 1, { content: content, saved: false });

    setParagraphs(paragraphRef);
  }

  function deleteParagraph(e, index) {
    if (isFinish) {
      toast.warn("Os parágrafos foram finalizados.");
      return;
    }

    console.log(index);

    e.preventDefault();

    const paragraphRef = [...paragraphs];

    console.log(paragraphRef.splice(index, 1));

    setParagraphs(paragraphRef);
  }

  function endPara(e) {
    e.preventDefault();

    if (paragraphs.length === 0) {
      toast.warn("Sua postagem não tem parágrafos.");
      return;
    }

    const hasNotSavedParagraph = paragraphs.find((paragraph) => {
      return !paragraph.saved;
    });

    if (hasNotSavedParagraph) {
      toast.warn("há parágrafos não salvos");
      return;
    }

    let paragraphsContent = paragraphs.map((paragraph) => {
      return paragraph.content;
    });
    const joinedParagraphs = paragraphsContent.join("///");

    setDescription(joinedParagraphs);
    setIsFinish(!isFinish);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!photoInfo.photo_file) {
      toast.warn("O seu post não possui imagem");
    }

    if (!title) {
      toast.warn('O campo "Título" está vazio.');
    }

    if (!description) {
      toast.warn("Seu post não tem parágrafos.");
    }

    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    formData.append("photo_post_url", photoInfo.photo_file);

    if (photoInfo.photo_file && title && description) {
      props.isEdit
        ? dispatch(editPostRequest(formData, id))
        : dispatch(addPostRequest(formData));
      // navigate('/panel')
    }
  }

  async function getPost() {
    try {
      const response = await api.get(`/posts/${id}`);

      setCaughtPost(response.data);
    } catch (e) {
      return null;
    }
  }

  return (
    <section id="new-post">
      <h1>Novo post</h1>
      <form
        encType="multipart/form-data"
        className="form-post"
        onSubmit={handleSubmit}
      >
        <label className="picture" htmlFor="picture_input">
          <span className="picture_image">
            {photoInfo.photo_file ? (
              <img src={photoInfo.photo_url} className="picture_img" />
            ) : (
              "Escolha uma imagem para o post"
            )}
          </span>
        </label>
        <input
          type="file"
          accept="image/*"
          id="picture_input"
          onChange={handleChange}
          name="photo_post_url"
        />

        <label className="field">
          <input
            type="text"
            placeholder="Título"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <div className="paragraphs-area">
          {paragraphs.map((paragraph, index) => {
            return (
              <label className="field textarea-field" key={index}>
                <textarea
                  placeholder={`Parágrafo ${index + 1}`}
                  disabled={paragraph.saved ? true : false}
                  className={
                    paragraph.saved ? "textarea textarea-saved" : "textarea"
                  }
                  onChange={(e) => onChangeTextarea(index, e)}
                  value={paragraph.content}
                ></textarea>
                <button
                  className={
                    paragraph.saved
                      ? "btn-action btn-saved"
                      : "btn-action btn-not-saved"
                  }
                  onClick={
                    !paragraph.saved
                      ? (e) => saveParagraph(e, index)
                      : (e) => editParagraph(e, index)
                  }
                >
                  {paragraph.saved ? "Salvo" : "Salvar"}
                </button>
                <button
                  className={
                    paragraph.saved ? "btn-action btn-remove-para" : "none"
                  }
                  onClick={(e) => deleteParagraph(e, index)}
                >
                  Apagar
                </button>
              </label>
            );
          })}
          <div>
            <button
              className={isFinish ? "btn-para-finish" : "btn-para"}
              onClick={addParagraph}
            >
              Adicionar parágrafo
            </button>
            <button className="btn-para" onClick={endPara}>
              {isFinish ? "Voltar" : "Finalizar"}
            </button>
          </div>
          <input type="hidden" value={description} name="description" />
        </div>
        <button className="submit-btn">
          Postar{" "}
          {posts.loading ? (
            <span>
              <ReactLoading type="spin" width="20px" height="20px" />
            </span>
          ) : (
            <></>
          )}
        </button>
      </form>
    </section>
  );
};

NewPost.propTypes = {
  isEdit: PropTypes.bool,
};

export default NewPost;
