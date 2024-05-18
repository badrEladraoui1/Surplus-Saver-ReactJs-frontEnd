/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { api } from "../Utils/backendApi";
import axios from "axios";

const useSearchResults = (initialKeyword = "") => {
  const [keyword, setKeyword] = useState(initialKeyword);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   const fetchSearchResults = async () => {
  //     if (keyword) {
  //       setLoading(true);
  //       try {
  //         const response = await axios.get(
  //           `${api}/SurplusSaverApiV1/posts/search?keyword=${keyword}`
  //         );
  //         setSearchResults(response.data);
  //       } catch (error) {
  //         console.error(error);
  //         setError(error);
  //       }
  //       setLoading(false);
  //     }
  //   };

  //   fetchSearchResults();
  // }, [keyword]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          keyword
            ? `${api}/SurplusSaverApiV1/posts/search?keyword=${keyword}`
            : `${api}/SurplusSaverApiV1/posts/getAllPosts`,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        setSearchResults(response.data);
      } catch (error) {
        console.error(error);
        setError(error);
      }
      setLoading(false);
    };

    fetchSearchResults();
  }, [keyword]);

  return {
    searchResults,
    loading,
    error,
    setKeyword,
    keyword,
    setSearchResults,
  };
};

export default useSearchResults;
