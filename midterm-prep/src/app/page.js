"use client";
import { useState } from "react";
import Header from "@/components/molecules/Header";
import PictureDisplay from "@/components/molecules/PictureDisplay";
import Image from "next/image";
import styles from "@/app/header.module.css";

// Main Home component
export default function Home() {
  // State to hold fetched pictures
  const [pictureContents, setPictureContents] = useState([]);
  // State to manage loading status
  const [loading, setLoading] = useState(false);

  // Function to fetch pictures from API
  async function fetchPictures() {
    setLoading(true); // Start loading

    try {
      const response = await fetch("https://nekos.best/api/v2/neko?amount=5");

      // Check if the response is not successful
      if (!response.ok) {
        console.error("Error fetching data");
        setLoading(false); // Stop loading if there’s an error
        return;
      }

      const json = await response.json(); // Parse JSON data
      setPictureContents(json.results); // Update state with fetched pictures
      setLoading(false); // Stop loading after successful fetch
    } catch (error) {
      console.error("Fetch error:", error);
      setLoading(false); // Stop loading if there’s an error
    }
  }

  // Function to clear the picture contents
  const removePicture = () => {
    setPictureContents([]);
  };

  return (
    <div className={styles.container}>
      <div className={styles.flexContainer}>
        {/* Image section displaying a static Neko image */}

        {/* Text container for header and picture display */}
        <div className={styles.textContainer}>
          <div className={styles.headerContainer}>
            {/* Header component with props for fetch, remove, and picture display status */}
            <Header
              className={styles.header}
              heading="Nekos!?!?!?!"
              onFetchPicture={fetchPictures} // Fetches pictures on button click
              onRemovePicture={removePicture} // Removes pictures on button click
              picturesDisplayed={pictureContents.length > 0} // Boolean for pictures present
            />
          </div>

          {/* Conditional rendering based on loading and picture contents */}
          {loading ? (
            <div className={styles.loading}>Loading Nekos...</div>
          ) : pictureContents.length > 0 ? (
            <div className={styles.pictureDisplayContainer}>
              <PictureDisplay
                loading={loading} // Pass loading state
                pictureContents={pictureContents} // Pass picture contents
              />
            </div>
          ) : (
            // Display message if no pictures are available
            <section className={styles.noNekos}>No Nekos here. 😢</section>
          )}
        </div>
      </div>
    </div>
  );
}
