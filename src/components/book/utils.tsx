import React, { ReactElement, useCallback, useEffect, useState } from 'react';

/* 
Скроллинг страницы вверх в любое время (а не только после рендера).
Использование:
import { useScrollToTop } from './utils';

export default function "Имя функции"({}: Props) {
  ..................
  const setScrollToTop = useScrollToTop(true);
  return(
    вставляем где-нибуть 
    <div onClick={() => setScrollToTop(true)}></div>
  )
}
*/
export const useScrollToTop = (initialScrollState = false) => {
  const [scrollToTop, setScrollToTop] = useState(initialScrollState);

  useEffect(() => {
    if (scrollToTop) {
      setScrollToTop(false);
      try {
        window.scroll({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
      } catch (error) {
        window.scrollTo(0, 0);
      }
    }
  }, [scrollToTop, setScrollToTop]);

  return setScrollToTop;
};
