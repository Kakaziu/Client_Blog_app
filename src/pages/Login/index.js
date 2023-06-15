import React, { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import { useNavigate } from "react-router-dom";
import { MdMail } from "react-icons/md";
import { AiFillLock } from "react-icons/ai";
import "../Register/style.css";
import { useDispatch, useSelector } from "react-redux";
import { loginRequest } from "../../store/modules/user/userAction";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.UserReducer);
  const [inputEmail, setInputEmail] = useState({ value: "", error: "" });
  const [inputPassword, setInputPassword] = useState({ value: "", error: "" });
  const [serverError, setServerError] = useState([]);

  useEffect(() => {
    if (user.errors) {
      setServerError(user.errors);
    }

    if (user.user) {
      navigate("/panel");
    }
  });

  async function handleSubmit(e) {
    e.preventDefault();

    validate(inputEmail.value, setInputEmail, '* O campo "E-mail" está vazio');
    validate(
      inputPassword.value,
      setInputPassword,
      '* O campo "Senha" está vazio'
    );

    const data = {
      email: inputEmail.value,
      password: inputPassword.value,
    };

    if (inputEmail.value && inputPassword.value) {
      dispatch(loginRequest(data));
    }
  }

  function validate(value, setFunc, message) {
    if (!value) {
      setFunc({ value: "", error: message });
    }
  }

  return (
    <section id="login">
      <form className="form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        {serverError.length > 0 ? (
          serverError.map((err) => (
            <p key={err} className="errors-server">
              {err}
            </p>
          ))
        ) : (
          <></>
        )}
        <div className="camp">
          <label>
            <MdMail />
          </label>
          <input
            type="email"
            placeholder="E-mail"
            onChange={(e) =>
              setInputEmail({ value: e.target.value, error: "" })
            }
            value={inputEmail.value}
          ></input>
        </div>
        {inputEmail.error ? (
          <span className="error-message">{inputEmail.error}</span>
        ) : (
          <></>
        )}
        <div className="camp">
          <label>
            <AiFillLock />
          </label>
          <input
            type="password"
            placeholder="Senha"
            onChange={(e) =>
              setInputPassword({ value: e.target.value, error: "" })
            }
            value={inputPassword.value}
          ></input>
        </div>
        {inputPassword.error ? (
          <span className="error-message">{inputPassword.error}</span>
        ) : (
          <></>
        )}
        <button>
          Login{" "}
          {user.loading ? (
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

export default Login;
