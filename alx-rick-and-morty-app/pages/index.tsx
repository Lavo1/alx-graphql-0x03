import { useQuery } from '@apollo/client/react';
import { GET_EPISODES } from "@/graphql/queries";
import { EpisodeProps } from "@/interfaces";
import EpisodeCard from "../components/EpisodeCard";
import { useEffect, useState } from "react";
import ErrorBoundary from "@/components/ErrorBoundary";
import ErrorProneComponent from "@/components/ErrorProneComponent"; // ✅ new import

const Home: React.FC = () => {
  const [page, setPage] = useState<number>(1);

  type GetEpisodesData = {
    episodes: {
      info: { pages: number; next: number | null; prev: number | null; count: number };
      results: Array<{ id: number; name: string; air_date: string; episode: string }>;
    };
  };

  const { loading, error, data, refetch } = useQuery<GetEpisodesData>(GET_EPISODES, {
    variables: { page },
  });

  useEffect(() => {
    refetch();
  }, [page, refetch]);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error</h1>;

  const results = data?.episodes.results;
  const info = data?.episodes.info;
  const totalPages = info?.pages ?? 1;

  return (
    <ErrorBoundary>
      {/* Uncomment the next line temporarily to test the boundary */}
      {/* <ErrorProneComponent /> */}

      <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#A3D5E0] to-[#F4F4F4] text-gray-800">
        {/* Header */}
        <header className="bg-[#4CA1AF] text-white py-6 text-center shadow-md">
          <h1 className="text-4xl font-bold tracking-wide">Rick and Morty Episodes</h1>
          <p className="mt-2 text-lg italic">Explore the multiverse of adventures!</p>
        </header>

        {/* Main Content */}
        <main className="flex-grow p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {results && results.map((ep, key: number) => (
              <EpisodeCard
                id={ep.id}
                name={ep.name}
                air_date={ep.air_date}
                episode={ep.episode}
                key={key}
              />
            ))}
          </div>

          {/* Pagination Buttons */}
          <div className="flex justify-between mt-6">
            <button 
              onClick={() => setPage(prev => prev > 1 ? prev - 1 : 1)}
              className="bg-[#45B69C] text-white font-semibold py-2 px-6 rounded-lg shadow-lg hover:bg-[#3D9B80] transition duration-200 transform hover:scale-105">
              Previous
            </button>
            <button 
              onClick={() => setPage(prev => prev < totalPages ? prev + 1 : prev)}
              className="bg-[#45B69C] text-white font-semibold py-2 px-6 rounded-lg shadow-lg hover:bg-[#3D9B80] transition duration-200 transform hover:scale-105">
              Next
            </button>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-[#4CA1AF] text-white py-4 text-center shadow-md">
          <p>&copy; 2024 Rick and Morty Fan Page</p>
        </footer>
      </div>
    </ErrorBoundary>
  );
};

export default Home;
