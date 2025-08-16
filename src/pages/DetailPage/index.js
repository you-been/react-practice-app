import axios from "../../api/axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function DetailPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState({});

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(`/movie/${movieId}`);

      // 간단한 로그
      console.log("요청 ID:", movieId);
      console.log("요청 URL:", `/movie/${movieId}`);
      console.log("✅ 성공:", request.data.title);
      setMovie(request.data);
    }
    fetchData();
  }, [movieId]);

  if (!movie) return <div>...loading</div>;
  return (
    <section>
      <img
        className="modal__poster-img"
        src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
        alt="poster"
      ></img>
    </section>
  );
}
