document.addEventListener("DOMContentLoaded", () => {

  const switcher = document.getElementById("languageSwitcher");

  function getValue(obj, path) {
    return path.split(".").reduce((acc, part) => acc && acc[part], obj);
  }

  function setLanguage(lang) {
    if (!translations[lang]) return;

    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";

    localStorage.setItem("language", lang);

    document.querySelectorAll("[data-i18n]").forEach(el => {

      const key = el.getAttribute("data-i18n");
      const value = getValue(translations[lang], key);

      if (!value) return;

      if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
        el.placeholder = value;
      } else {
        el.textContent = value;
      }

    });
  }

  const savedLang = localStorage.getItem("language") || "en";

  if (switcher) {
    switcher.value = savedLang;
    switcher.addEventListener("change", (e) => {
      setLanguage(e.target.value);
    });
  }

  setLanguage(savedLang);

});