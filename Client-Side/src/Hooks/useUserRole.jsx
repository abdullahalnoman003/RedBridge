import { useEffect, useState } from "react";
import useAxios from "./useAxios";

const useUserRole = (email) => {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxios();

  useEffect(() => {
    if (email) {
      setLoading(true);
      axiosSecure
        .get(`/users/role/?email=${email}`, {})
        .then((res) => {
          const fetchedRole = res.data?.data?.role || "donor";
          setRole(fetchedRole);
          localStorage.setItem("userRole", fetchedRole);

        })
        .catch((err) => {
          console.error("Failed to fetch user role:", err);
          const fallbackRole = localStorage.getItem("userRole") || "donor";
          setRole(fallbackRole);

        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      console.log("No email provided, skipping role fetch");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email]);

  
  return [role, loading];
};

export default useUserRole;
