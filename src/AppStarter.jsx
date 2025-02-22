import React, { useState, useRef } from "react";
import { getAIImage, getAIText } from "./ai";

const IMG_SIZE = 256;

// Write Image component here

function Images() {
  const [images, setImages] = useState([
    {
      prompt: "Lachlan",
      url: "https://itpstupidhackathon.online/Assets/LachlanW.png",
    },
    {
      prompt: "Josh",
      url: "https://itpstupidhackathon.online/Assets/JoshW.png",
    },
  ]);

  return (
    <section>
      <h2>Images</h2>
      <form>
        <label>
          Generate an image
          <input name="prompt" placeholder="Forests catching fire" />
        </label>
        <button type="submit">Add</button>
      </form>
      <div
        style={{
          display: "grid",
          gap: 16,
          gridTemplateColumns: `repeat(auto-fill, minmax(${IMG_SIZE}px, 1fr)`,
        }}
      >
        {/* IMAGES here */}
      </div>
    </section>
  );
}

export default function App() {
  return (
    <main>
      <h1>Pinboard</h1>

      <Images />
    </main>
  );
}
