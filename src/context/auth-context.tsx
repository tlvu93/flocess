import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authorized, setAuthorized] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  // useEffect(() => {
  //   console.log('Authorized:', authorized);
  //   authCheck(router.asPath);

  //   // on route change start - hide page content by setting authorized to false
  //   const hideContent = () => setAuthorized(false);
  //   router.events.on('routeChangeStart', hideContent);

  //   // on route change complete - run auth check
  //   router.events.on('routeChangeComplete', authCheck);

  //   // unsubscribe from events in useEffect return function
  //   return () => {
  //     router.events.off('routeChangeStart', hideContent);
  //     router.events.off('routeChangeComplete', authCheck);
  //   };

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // const authCheck = (url: string) => {
  //   const publicPaths = ['/', '/login'];
  //   const path = url.split('?')[0];

  //   // Check if current user is authorized
  //   if (!user && !publicPaths.includes(path)) {
  //     setAuthorized(false);
  //     router.push({
  //       pathname: '/login',
  //       query: { returnUrl: router.asPath },
  //     });
  //   } else {
  //     console.log('Should be authorized');
  //     console.log(authorized);
  //     setAuthorized(true);
  //   }
  // };

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
        toast.error('Internal error');
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
    //     `${process.env.REACT_APP_BLOG_API_URL}/auth/login`,
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

    // const testUser: User = {
    //   name: 'TestUser',
    //   role: 0,
    // };

    // setUser(testUser);
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
      {authorized && children}
    </AuthContext.Provider>
  );
};

export default AuthState;
