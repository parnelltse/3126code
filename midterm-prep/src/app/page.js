"use client";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  // - implementation
  // x pick an API
  // - build button component that has a fetch & clear action
  // - Build a component that displays data (should have an empty and fullfilled state)
  // - Build function that will fetch data
  // - format & handle the data
  // - (error handling)
  // - style app and create breakpoints
  // - component for button to sit in

  const [pictureContents, setPictureContents] = useState(null);
  const [loading, setLoading] = useState(false);

  async function fetchPictures() {
    setLoading(true);
    const API_URL =
      "https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&count=5";
    const response = await fetch(API_URL);
    const testVar = "hello"; // this is unused variable, delete please for midterm
    const data = await response.json();
    setPictureContents(data);
    // console.log(data); use console.log() here or debugger to check output
    // delete debugger and console when done checking
    setLoading(false);
  }

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

    if (pictureContents) {
      const pictureList = [];

      pictureContents.forEach((picture, i) => {
        // keys are explanation, title, url
        pictureList.push(
          <article key={i}>
            <img src={picture.url} alt={picture.explanation} />
            <h2>{picture.title}</h2>
            <p>{picture.explanation}</p>
            <hr />
          </article>
        );
      });
      return <section>{pictureList}</section>;
    }

    return <section>No pictures have been fetched 🔭 </section>;
  };

  return (
    <div className="m-8">
      <Header />
      <PictureDisplay />
    </div>
  );
}
