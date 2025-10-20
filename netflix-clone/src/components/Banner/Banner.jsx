import React, { useEffect, useState } from "react";
import "./banner.css";
import axios from "../../utils/axios";
import requests from "../../utils/requests";

function Banner() {
  const [movie, setMovie] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const request = await axios.get(requests.fetchNetflixOriginals);

        // Filter movies that have a backdrop_path
        const moviesWithBackdrops = request.data.results.filter(
          (m) => m.backdrop_path
        );

        // Pick a random movie
        const randomMovie =
          moviesWithBackdrops[
            Math.floor(Math.random() * moviesWithBackdrops.length)
          ];

        setMovie(randomMovie);
        console.log("Selected banner movie:", randomMovie);
      } catch (error) {
        console.error("Error fetching banner data:", error);
      }
    })();
  }, []);

  // Truncate long descriptions
  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  const imageUrl = movie?.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : "https://via.placeholder.com/1280x720?text=No+Image+Available";

  return (
    <div
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(${imageUrl})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="banner_contents">
        <h1 className="banner_title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>

        <div className="banner_buttons">
          <button className="banner_button play">Play</button>
          <button className="banner_button">My List</button>
        </div>

        <h1 className="banner_description">{truncate(movie?.overview, 150)}</h1>
      </div>

      <div className="banner_fadeBottom" />
    </div>
  );
}

export default Banner;
