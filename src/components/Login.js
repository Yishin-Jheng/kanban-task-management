import { useState } from "react";
import { useFormData } from "../hooks/useFormData";
import { useThunk } from "../hooks/useThunk";
import { userLogin } from "../store";
import { IconContext } from "react-icons";
import { TbLoader } from "react-icons/tb";
import { BsFillQuestionSquareFill } from "react-icons/bs";
import Input from "./modal-components/Input";

function Login() {
  const [checkInvalid, setCheckInvalid] = useState(false);
  const [getFormData, handleFormChange] = useFormData();
  const [doLogin, isLoading] = useThunk(userLogin);

  const formData = getFormData();

  const handleSubmit = (formData) => {
    return (e) => {
      const form = formData().current;
      e.preventDefault();
      setCheckInvalid(true);

      if (form.email && form.password) {
        doLogin({ ...form });
      }
    };
  };

  return (
    <form className="login" onSubmit={handleSubmit(getFormData)}>
      <div className="modal__title">
        <span>Account Login</span>

        <div className="login__icon">
          <IconContext.Provider value={{ size: "1.5rem", color: "#635fc7" }}>
            <BsFillQuestionSquareFill />
          </IconContext.Provider>
          <span>Don't have an account?</span>
        </div>

        <div className="login__info">
          <p>Here is the email and password provided for guest 👏</p>
          <br />
          <p>
            Email: <strong>guest@kanban.com</strong>
          </p>
          <p>
            Password: <strong>kanban_guest</strong>
          </p>
          <br />
          <p>⛔ Guest can't do any change on the board or column.</p>
        </div>
      </div>

      <Input
        checkInvalid={checkInvalid}
        label="Email Address"
        type="email"
        value={""}
        handleFormChange={handleFormChange(formData, "email")}
      />

      <Input
        checkInvalid={checkInvalid}
        label="Password"
        type="password"
        value={""}
        handleFormChange={handleFormChange(formData, "password")}
      />

      <button className="btn-medium btn-medium--primary">
        {isLoading ? (
          <IconContext.Provider value={{ size: "2rem" }}>
            <TbLoader className="loading-icon" />
          </IconContext.Provider>
        ) : (
          "Log In"
        )}
      </button>
    </form>
  );
}

export default Login;
