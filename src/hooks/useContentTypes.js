import { useContext, useState, useEffect } from 'react'
import { UserContext } from "../context/UserContext"

export default function useContentTypes() {
  const [contentTypes, setContentTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { user } = useContext(UserContext);

  useEffect(() => {
    async function getContentTypeOptions() {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:1337/import-assets/content-types", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${user.token}`,
          }
        });
        const contentTypes = await response.json();
        setContentTypes(contentTypes);
      } catch (err) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }
    getContentTypeOptions();
  }, [user.token, error]); 

  return {
    contentTypes,
    loading,
    error,
  }
}






  
  