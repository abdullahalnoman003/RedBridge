import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const useDocumentTitle = (title) => {
  const location = useLocation();

  useEffect(() => {
    document.title = title;
  }, [location.pathname, title]);
};

export default useDocumentTitle;