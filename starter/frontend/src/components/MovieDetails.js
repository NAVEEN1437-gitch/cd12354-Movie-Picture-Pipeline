import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

function MovieDetail({ movie }) {
  const [details, setDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setDetails(null);
    setError(null);
    axios
      .get(`${process.env.REACT_APP_MOVIE_API_URL}/movies/${movie.id}`)
      .then((response) => setDetails(response.data))
      .catch(() => setError('Unable to load movie details.'));
  }, [movie]);

  return (
    <div>
      {error ? (
        <p role="alert">{error}</p>
      ) : (
        details && (
          <>
            <h2>{details.movie.title}</h2>
            <p>{details.movie.description}</p>
          </>
        )
      )}
    </div>
  );
}

MovieDetail.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
};

export default MovieDetail;
