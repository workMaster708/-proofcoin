import React from 'react';

interface RankProps {
  points: number;
}

const Rank: React.FC<RankProps> = ({ points }) => {
  const getRankName = (points: number): string => {
    if (points >= 1000) return 'Diamond';
    if (points >= 500) return 'Gold';
    if (points >= 250) return 'Silver';
    if (points >= 100) return 'Bronze';
    return 'Beginner';
  };

  return <span>{getRankName(points)}</span>;
};

export default Rank;
