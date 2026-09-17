import { useState } from "react";
import { FaUserSecret } from "react-icons/fa";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { GUEST_EMAIL, GUEST_PASSWORD, login } from "@/api/auth";
import Button from "@/components/Button/Button";
import Input from "@/components/formComponents/Input/Input";
import LoadingIcon from "@/components/LoadingIcon/LoadingIcon";
import { useFormData } from "@/hooks/useFormData";
import { useModalStore } from "@/store/useModalStore";
import styles from "./Login.module.scss";

function Login() {
  const queryClient = useQueryClient();
  const { setModal } = useModalStore.getState();
  const [invalidKeys, setInvalidKeys] = useState([]);
  const [formData, getOnFormChange] = useFormData();

  const onEmailChange = getOnFormChange("email");
  const onPasswordChange = getOnFormChange("password");

  const { mutateAsync: doLogin, isPending: isPendingLogin } = useMutation({
    mutationFn: (arg) => login({ ...arg, skipGlobalError: true }),
    onSuccess: (userData) => {
      if (userData) {
        queryClient.invalidateQueries({
          queryKey: ["session"],
        });
        queryClient.invalidateQueries({
          queryKey: ["boards"],
        });
      }
    },
    onError: () => {
      onEmailChange("");
      onPasswordChange("");
      setModal({
        isOpen: true,
        modalType: "errorMessageModal",
        errorTitle: "Login Failed...",
        errorMsg:
          "Email or password is not correct. Please check and try again.",
      });
    },
  });

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
    onEmailChange(GUEST_EMAIL);
    onPasswordChange(GUEST_PASSWORD);
  };

  return (
    <div className={styles.loginContainer}>
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
          onChange={onEmailChange}
        />
        <Input
          label="Password"
          type="password"
          value={formData.password}
          isRequired
          isInvalid={invalidKeys.includes("password")}
          onChange={onPasswordChange}
        />
        <Button type="formPrimary" onClick={handleSubmit}>
          {isPendingLogin ? <LoadingIcon size="2rem" color="#fff" /> : "Log In"}
        </Button>
      </form>
    </div>
  );
}

export default Login;
