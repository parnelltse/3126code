"use client";

import React, { useEffect, useState } from "react";

const Page = () => {
  const apiUrl = "https://api.waifu.im/search"; // Replace with the actual API endpoint URL
  const params = {
    included_tags: ["oppai", "uniform", "milf"],
    height: ">=0",
  };

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const queryParams = new URLSearchParams();

    for (const key in params) {
      if (Array.isArray(params[key])) {
        params[key].forEach((value) => {
          queryParams.append(key, value);
        });
      } else {
        queryParams.set(key, params[key]);
      }
    }

    const requestUrl = `${apiUrl}?${queryParams.toString()}`;

    fetch(requestUrl)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(
            "Request failed with status code: " + response.status
          );
        }
      })
      .then((data) => {
        setData(data); // Store the response data in state
        setLoading(false); // Set loading to false
      })
      .catch((error) => {
        setError(error.message); // Store the error message in state
        setLoading(false); // Set loading to false
      });
  }, []); // Empty dependency array to run once on mount

  if (loading) {
    return <div>Loading...</div>; // Loading state
  }

  if (error) {
    return <div>Error: {error}</div>; // Error state
  }

  return (
    <div>
      <h1>Waifu Search Results</h1>
      {data.images && data.images.length > 0 ? (
        data.images.slice(0, 5).map(
          (
            image // Display only the first 5 images
          ) => (
            <div key={image.image_id}>
              <h2>Image ID: {image.image_id}</h2>
              <img src={image.url} alt={`Image ${image.image_id}`} />
              <p>Uploaded At: {new Date(image.uploaded_at).toLocaleString()}</p>
              <p>Favorites: {image.favorites}</p>
              <p>
                Source:{" "}
                <a
                  href={image.source}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {image.source}
                </a>
              </p>
              <p>Tags:</p>
            </div>
          )
        )
      ) : (
        <p>No images found.</p>
      )}
    </div>
  );
};

export default Page;
