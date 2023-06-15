import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./style.css";
import api from "../../services/api";

function ContentRead() {
  const { id } = useParams();
  const [caughtPost, setCaugthPost] = useState(null); //eslint-disable-line
  const [userPost, setUserPost] = useState(null); //eslint-disable-line
  const [separatedParagraphs, setSeparateParagraphs] = useState([]);

  useEffect(() => {
    getPost(id);
  }, []);

  useEffect(() => {
    if (caughtPost) {
      getUserPost(caughtPost.create_by);
      separateParagraphs();
    }
  }, [caughtPost]);

  async function getPost(id) {
    try {
      const response = await api.get(`/posts/${id}`);

      if (response.status === 200) {
        setCaugthPost(response.data);
      }
    } catch (e) {
      return null;
    }
  }

  async function getUserPost(id) {
    try {
      const response = await api.get(`/users/${id}`);

      if (response.status === 200) {
        setUserPost(response.data);
      }
    } catch (e) {
      return null;
    }
  }

  function formatDate(date) {
    const data = date.slice(0, 10);
    const arrayDate = data.split("-");

    return `${arrayDate[2]}/${arrayDate[1]}/${arrayDate[0]}`;
  }

  function separateParagraphs() {
    const arrayParagraph = caughtPost.description.split("///");

    setSeparateParagraphs(arrayParagraph);
  }

  return (
    <div className="content-read">
      <h1>{caughtPost && caughtPost.title}</h1>
      <span>
        <p>Autor: {userPost && userPost.name}</p>{" "}
        <p>Criado em: {caughtPost && formatDate(caughtPost.created_at)}</p>
      </span>
      <img src={caughtPost && caughtPost.photo_post_url} />
      <div className="paragraphs-read">
        {caughtPost &&
          separatedParagraphs.map((paragraph) => {
            return <p key={paragraph.index}>{paragraph}</p>;
          })}
      </div>
    </div>
  );
}

export default ContentRead;
