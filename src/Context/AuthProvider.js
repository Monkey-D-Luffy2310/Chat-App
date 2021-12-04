import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/config";
import { Spin } from "antd";
import styled from "styled-components";

const SpinStyled = styled(Spin)`
  display: flex;
  justify-content: center;
  margin-top: 100px;
`;

export const AuthContext = createContext();

const Authprovider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const unsubcribed = auth.onAuthStateChanged((user) => {
      if (user) {
        const { email, displayName, uid, photoURL } = user;
        setUser({ email, displayName, uid, photoURL });
        setLoading(false);
        navigate("/");
      } else {
        setLoading(false);
        navigate("/login");
      }
    });

    return () => {
      unsubcribed();
    };
  }, [navigate]);
  return (
    <AuthContext.Provider value={ user }>
      {isLoading ? <SpinStyled size="large" /> : children}
    </AuthContext.Provider>
  );
};

export default Authprovider;
