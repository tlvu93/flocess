import React, { createContext, useContext, useEffect, useState } from "react";
import axios, { AxiosError } from "axios";

import { toast } from "react-toastify";

// AuthContext
//================================================
interface AuthContext {
  loading: boolean;
  isAuthenticated: boolean;
  registerUser: (formData: any) => Promise<void>;
  loginUser: (formData: any) => Promise<void>;
  logout: () => void;
  user: User | null;
}

const AuthContext = createContext<AuthContext>({} as AuthContext);
export const useAuth = () => useContext(AuthContext);

const AuthState = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  //const [token, setToken] = useState(localStorage.getItem("token"));

  //   useEffect(() => {
  //     const getUser = async () => {
  //       let data = {
  //         name: "User1",
  //       };
  //       setUser(data);
  //       setIsAuthenticated(true);
  //       setLoading(false);
  //     };
  //     getUser();
  //   }, []);

  const registerUser = async (formData: any) => {
    try {
      setLoading(true);
      const {
        data: { token },
      } = await axios.post(
        `${process.env.REACT_APP_BLOG_API_URL}/auth/signup`,
        formData
      );
      //localStorage.setItem("token", token);
      //setToken(token);
      setIsAuthenticated(true);
      setLoading(false);
      //navigate("/work-flow/new-post", { replace: true });
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(error.message);
        setLoading(false);
      } else {
        toast.error("Internal error");
        setLoading(false);
      }
    }
  };

  const loginUser = async (formData: any) => {
    // try {
    //   setLoading(true);
    //   const {
    //     data: { token },
    //   } = await axios.post(
    //     `${process.env.REACT_APP_BLOG_API_URL}/auth/signin`,
    //     formData
    //   );
    //   localStorage.setItem("token", token);
    //   setToken(token);
    //   setIsAuthenticated(true);
    //   setLoading(false);
    //   //navigate("/protected/new-post", { replace: true });
    // } catch (error) {
    //   if (axios.isAxiosError(error)) {
    //     toast.error(error.message);
    //     setLoading(false);
    //   } else {
    //     toast.error("Internal error");
    //     setLoading(false);
    //   }
    // }

    setIsAuthenticated(true);
    setLoading(false);
  };

  const logout = () => {
    // localStorage.removeItem("token");
    // setToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        loading,
        isAuthenticated,
        registerUser,
        loginUser,
        logout,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthState;
