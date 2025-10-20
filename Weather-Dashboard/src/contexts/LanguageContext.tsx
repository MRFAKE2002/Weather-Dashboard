import React, { createContext, useContext, useEffect } from "react";
import i18n from "../i18n";
import { useLocalStorageState } from "../utils/useLocalStorageState";

type Lang = "en" | "fa";
type LangCtx = {
  lang: Lang;
  setLang: (l: Lang) => void;
};

const LanguageContext = createContext<LangCtx | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [lang, setLang] = useLocalStorageState<Lang>(
    "i18nextLng",
    (localStorage.getItem("i18nextLng") as Lang) ?? "en"
  );

  useEffect(() => {
    // side-effects: notify i18n and set html attributes
    if (i18n.language !== lang) i18n.changeLanguage(lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "fa" ? "rtl" : "ltr";
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
};
