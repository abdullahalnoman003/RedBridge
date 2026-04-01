import { useEffect, useState } from "react";
import useAxios from "./useAxios";
import { extractRoleFromApiResponse, resolveFallbackRole, storeUserRole } from "../Utils/roleUtils";

const useUserRole = (email) => {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxios();

  useEffect(() => {
    if (email) {
      setLoading(true);
      axiosSecure
        .get(`/users/role?email=${encodeURIComponent(email)}`)
        .then((res) => {
          // Handle 304 responses or empty data
          if (!res.data || !res.data.data) {
            const fallbackRole = resolveFallbackRole(email);
            setRole(fallbackRole);
            storeUserRole(fallbackRole);
            return;
          }

          const fetchedRole = extractRoleFromApiResponse(res.data);
          setRole(fetchedRole);
          storeUserRole(fetchedRole);
        })
        .catch((err) => {
          console.error("Failed to fetch user role:", err?.message || err);
          const fallbackRole = resolveFallbackRole(email);
          setRole(fallbackRole);
          storeUserRole(fallbackRole);
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
