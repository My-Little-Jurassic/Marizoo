import { useState } from "react";

const useTheme = () => {
  let initTheme;

  // 사용자 지정 테마가 로컬스토리지에 저장되어 있는지 확인
  const userTheme = localStorage.getItem("userTheme");

  if (userTheme) {
    // 사용자가 테마를 설정한 적 있다면 사용자 테마로 설정
    initTheme = userTheme;
  } else {
    // 사용자가 테마를 설정한 적 없다면 브라우저 테마로 설정
    const isBrowserDarkMode =
      window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    initTheme = isBrowserDarkMode ? "dark" : "light";
  }

  // 테마 state 생성
  const [theme, setTheme] = useState(initTheme);

  // 테마 전환 함수
  const toggleTheme = () => {
    const themeMode = theme === "light" ? "dark" : "light";
    window.localStorage.setItem("userTheme", themeMode);
    setTheme(themeMode);
  };

  return [theme, toggleTheme] as const;
};

export default useTheme;
