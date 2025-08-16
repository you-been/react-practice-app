import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "../../api/axios";
import "./SearchPage.css";
import { useDebounce } from "../../hooks/useDebounce";

export default function SearchPage() {
  const [searchResults, setSearchResults] = useState([]);

  const navigate = useNavigate();

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  let query = useQuery();
  const searchTerm = query.get("p");
  const debouncedSearchTerm = useDebounce(query.get("q"), 500);

  useEffect(() => {
    if (debouncedSearchTerm) {
      fetchSearchMovie(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  const fetchSearchMovie = async (searchTerm) => {
    try {
      const request = await axios.get(
        `/search/movie?include_adult=false&query=${searchTerm}`
      );
      console.log("reques:", request);

      //검색어를 정규화 (소문자 + 공백/특수문자 제거)
      const normalizeText = (text) => {
        return text
          .replace(/\s+/g, "") // 모든 공백 제거
          .replace(/[-_.]/g, "") // 특수문자 제거
          .toLowerCase(); // 영어만 소문자로
      };

      const normalizedSearchTerm = normalizeText(searchTerm);

      //검색 결과 필터링
      const filteredResults = request.data.results.filter((movie) => {
        const title = movie.title || movie.name || "";
        const normalizedTitle = normalizeText(title);
        return normalizedTitle.includes(normalizedSearchTerm);
      });

      setSearchResults(filteredResults);
    } catch (error) {
      console.log("error", error);
    }
  };

  const renderSearchResults = () => {
    return searchResults.length > 0 ? (
      <section className="search-container">
        {searchResults.map((movie) => {
          if (movie.backdrop_path != null && movie.media_type != "person") {
            const movieImageURL =
              "https://image.tmdb.org/t/p/w500" + movie.backdrop_path;
            return (
              <div className="movie" key={movie.id}>
                <div
                  className="movie__column-poster"
                  onClick={() => navigate(`/${movie.id}`)}
                >
                  <img
                    src={movieImageURL}
                    alt="movie"
                    className="movie__poster"
                  ></img>
                </div>
              </div>
            );
          }
        })}
      </section>
    ) : (
      <section className="no-results">
        <div className="no-results__text">
          <p>
            찾고자하는 검색어 "{debouncedSearchTerm}"에 맞는 영화가 없습니다.
          </p>
        </div>
      </section>
    );
  };

  return renderSearchResults();
}
