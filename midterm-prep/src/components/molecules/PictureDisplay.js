import React from "react";
import styles from "@/app/picturedisplay.module.css"; // Import CSS Module for styling

// PictureDisplay component to display a list of pictures or a loading message
const PictureDisplay = ({ loading, pictureContents }) => {
  // Show loading text if loading is true
  if (loading) {
    return <section className={styles.loadingText}>Loading 🐈 🐈‍⬛ 🐈</section>;
  }

  // Check if there are pictures to display
  if (pictureContents.length > 0) {
    // Map over pictureContents to generate a list of picture cards
    const pictureList = pictureContents.map((picture, i) => (
      <article key={i} className={styles.card}>
        {/* Display the picture image */}
        <img
          className={styles.cardImage}
          src={picture.url}
          alt={`picture ${picture.anime_name}`} // Alt text includes anime name
        />
        {/* Display picture details */}
        <div className={styles.cardDetails}>
          <h2>Site: {picture.source_url}</h2>
          <p className={styles.cardSource}>Artist: {picture.artist_name}</p>
          <p className={styles.cardArtist}>
            Artist Link: {picture.artist_href}
          </p>
        </div>
        <hr /> {/* Divider between pictures */}
      </article>
    ));

    // Render the list of picture cards inside a container
    return <section className={styles.cardContainer}>{pictureList}</section>;
  }

  // Default message if no pictures are available
  return <section>No pictures available at the moment.</section>;
};

export default PictureDisplay;
