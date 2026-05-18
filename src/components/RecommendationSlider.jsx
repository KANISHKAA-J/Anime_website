import React from 'react';
import AnimeCard from './AnimeCard';

const RecommendationSlider = ({ recommendations }) => {
  if (!recommendations || recommendations.length === 0) return null;

  return (
    <div className="w-full overflow-x-auto hide-scrollbar py-6 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
      <div className="flex gap-6 w-max">
        {recommendations.map((anime) => (
          <div key={anime.mal_id} className="w-48 sm:w-56 shrink-0">
            <AnimeCard anime={anime} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendationSlider;
