export const useDarkMode = defineStore("darkMode", () => {
  const darkModeEnabled = ref(false);

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle("quizy-dark");

    if (document.documentElement.classList.contains("quizy-dark"))
      darkModeEnabled.value = true;
    else darkModeEnabled.value = false;
  };

  return { darkModeEnabled, toggleDarkMode };
});
