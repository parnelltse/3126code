"use client";
import { useState } from "react";

export default function Home() {
  const [pictureContents, setPictureContents] = useState([]);
  const [loading, setLoading] = useState(false);

  // Function to fetch pictures from the Neko API
  async function fetchPictures() {
    setLoading(true);
    const response = await fetch("https://nekos.best/api/v2/neko");

    if (!response.ok) {
      console.error("Error fetching data:", response.statusText);
      setLoading(false);
      return; // Exit if there's an error
    }

    const json = await response.json();

    // Update picture contents with the fetched data
    setPictureContents(json.results);
    setLoading(false);
  }

  const clearPictures = () => {
    setPictureContents([]);
  };

  const Header = () => {
    return (
      <header>
        <h1>my cool midterm</h1>
        <button
          disabled={loading}
          className="border-2 border-red-600 shadow shadow-amber-600 p-2"
          onClick={fetchPictures}
        >
          Fetch🌝🌚
        </button>
      </header>
    );
  };

  const PictureDisplay = () => {
    if (loading) {
      return <section>Loading...🚀</section>;
    }

    if (pictureContents.length > 0) {
      const pictureList = pictureContents.map((picture, i) => (
        <article key={i} className="flex flex-col items-center w-full">
          <img
            className="w-64 h-64 object-cover"
            src={picture.url}
            alt={`picture ${picture.anime_name}`}
          />
          <h2 className="text-2xl font-semibold">Site:{picture.source_url}</h2>
          <p>Artist: {picture.artist_name}</p>
          <p>Artist Link: {picture.artist_href}</p>
          <hr />
        </article>
      ));

      return <section>{pictureList}</section>;
    }

    return <section>No pictures have been fetched 🔭</section>;
  };

  return (
    <div className="m-8 flex flex-col items-center">
      <Header />
      <PictureDisplay />
      <button
        className="mt-4 border-2 border-red-600 shadow shadow-amber-600 p-2"
        onClick={clearPictures}
      >
        Clear Pictures ❌
      </button>
    </div>
  );
}
