import React from "react";
import { EpisodeCardProps } from "../interfaces";

const EpisodeCard: React.FC<EpisodeCardProps> = ({ id, name, air_date, episode }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col items-start hover:shadow-xl transition-shadow duration-200">
      <h2 className="text-xl font-bold mb-2">{name}</h2>
      <p className="text-gray-600 mb-1">Air Date: {air_date}</p>
      <p className="text-gray-500 mb-2">Episode: {episode}</p>
      <span className="text-xs text-gray-400">ID: {id}</span>
    </div>
  );
};

export default EpisodeCard;
