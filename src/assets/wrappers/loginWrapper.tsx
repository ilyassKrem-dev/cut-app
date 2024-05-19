"use client"
import { createContext, useState, ReactNode, useContext, useEffect } from "react";
import CaptchaWrapper from "./CaptchaWrapper";
import FormulaLogin from "../../components/forms/formulaLogin";

interface LoginContextType {
  showLogin: boolean;
  setShowLogin: (show: boolean) => void;
}

const LoginContext = createContext<LoginContextType | undefined>(undefined);

export const useLoginContext = () => {
  const context = useContext(LoginContext);
  if (!context) {
    throw new Error("useLoginContext must be used within a LoginProvider");
  }
  return context;
};

export const LoginProvider = ({ children }: { children: ReactNode }) => {
  const [showLogin, setShowLogin] = useState(false);
    useEffect(() => {
      if(!showLogin) return
      function handleOutsideClick(event: any) {
        
        const overlay = document.querySelector(".login-form");
        if (overlay && !overlay.contains(event.target)) {
          
          setShowLogin(false);
        }
      }

      document.body.addEventListener("click", handleOutsideClick);

      return () => {
        document.body.removeEventListener("click", handleOutsideClick);
      };
  }, [showLogin]);
  return (
    <LoginContext.Provider value={{ showLogin, setShowLogin }}>
      {children}
      {showLogin&&
          <div className="fixed bottom-0 right-0 left-0 md:bg-black/40   text-light md:top-0 md:h-full md:flex md:flex-col md:justify-center md:items-center  shadow-[0px_0px_6px_2px_rgba(255,255,255,0.2)] no-doc-scroll pt-16 md:pt-0 z-50 top-0">
              <CaptchaWrapper>
                  <FormulaLogin  setShowLogin={setShowLogin}/>    
              </CaptchaWrapper>
        </div>}
    </LoginContext.Provider>
  );
};
