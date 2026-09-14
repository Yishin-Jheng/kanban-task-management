import { useState } from "react";
import { FaUserSecret } from "react-icons/fa";
import Button from "@/components/Button/Button";
import Input from "@/components/formComponents/Input/Input";
import LoadingIcon from "@/components/LoadingIcon/LoadingIcon";
import { useFormData } from "@/hooks/useFormData";
import { useThunk } from "@/hooks/useThunk";
import { userLogin } from "@/store";
import styles from "./Login.module.scss";

function Login() {
  const [invalidKeys, setInvalidKeys] = useState([]);
  const [doLogin, isLoading] = useThunk(userLogin);
  const [formData, getOnFormChange] = useFormData();

  const checkInvalid = () => {
    const { email, password } = formData;
    const invalidKeys = [];
    if (!email) invalidKeys.push("email");
    if (!password) invalidKeys.push("password");
    setInvalidKeys(invalidKeys);
    return invalidKeys.length > 0;
  };

  const handleSubmit = () => {
    if (checkInvalid()) return;
    doLogin(formData);
  };

  const handleGuestLogin = () => {
    getOnFormChange("email")("guest@kanban.com");
    getOnFormChange("password")("kanban_guest");
  };

  return (
    <form className={styles.login}>
      <div className={styles.loginTitle}>
        <span>Account Login</span>
        <div className={styles.loginTip} onClick={handleGuestLogin}>
          <FaUserSecret size="1.5rem" color="#635fc7" />
          <span>Login as guest</span>
        </div>
      </div>
      <Input
        label="Email Address"
        type="email"
        value={formData.email}
        isRequired
        isInvalid={invalidKeys.includes("email")}
        onChange={getOnFormChange("email")}
      />
      <Input
        label="Password"
        type="password"
        value={formData.password}
        isRequired
        isInvalid={invalidKeys.includes("password")}
        onChange={getOnFormChange("password")}
      />
      <Button type="formPrimary" onClick={handleSubmit}>
        {isLoading ? <LoadingIcon size="2rem" color="#fff" /> : "Log In"}
      </Button>
    </form>
  );
}

export default Login;
