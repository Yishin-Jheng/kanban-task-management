import { useState } from "react";
import { IconContext } from "react-icons";
import { IoMdPersonAdd } from "react-icons/io";
import Button from "@/components/Button/Button";
import Input from "@/components/formComponents/Input/Input";
import LoadingIcon from "@/components/LoadingIcon/LoadingIcon";
import { useFormData } from "@/hooks/useFormData";
import { useThunk } from "@/hooks/useThunk";
import { userLogin } from "@/store";
import styles from "./Login.module.scss";

function Login() {
  const [checkInvalid, setCheckInvalid] = useState(false);
  const [getFormData, handleFormChange] = useFormData();
  const [doLogin, isLoading] = useThunk(userLogin);

  const formData = getFormData();

  const handleSubmit = (formData) => {
    return () => {
      const form = formData().current;
      setCheckInvalid(true);

      if (form.email && form.password) {
        doLogin({ ...form });
      }
    };
  };

  return (
    <form className={styles.login}>
      <div className={styles.loginTitle}>
        <span>Account Login</span>

        {/* XXX: 這邊先改了wording */}
        <div className={styles.loginIcon}>
          <IconContext.Provider value={{ size: "1.5rem", color: "#635fc7" }}>
            <IoMdPersonAdd />
          </IconContext.Provider>
          <span>Login as guest</span>
        </div>

        {/* XXX: 感覺改成按按鈕直接帶入訪客帳密會更方便登入測試 */}
        {/* <div className={styles.guestInfo}>
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
        </div> */}
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

      <Button type="formPrimary" onClick={handleSubmit(getFormData)}>
        {isLoading ? <LoadingIcon size="2rem" /> : "Log In"}
      </Button>
    </form>
  );
}

export default Login;
