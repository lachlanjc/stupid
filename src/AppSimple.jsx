import React, { useState, useRef, useOptimistic } from "react";
import { getAIImage, getAIText } from "./ai";

const IMG_SIZE = 256;

function Image({ prompt, url }) {
  return (
    <figure>
      {url && <img src={url} alt={prompt} width={IMG_SIZE} height={IMG_SIZE} />}
      <figcaption>{prompt}</figcaption>
    </figure>
  );
}

function Images() {
  // const formRef = useRef();
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

  async function formAction(formData) {
    const prompt = formData.get("prompt");
    // formRef.current.reset();

    getAIImage(prompt, IMG_SIZE * 2, IMG_SIZE * 2).then((url) =>
      setImages((prev) => [...prev, { prompt, url }])
    );
  }

  return (
    <section>
      <h2>Images</h2>
      <form action={formAction}>
        <label>
          Generate an image
          <input name="prompt" placeholder="Forests catching fire" />
        </label>
        <button type="submit">Add</button>
      </form>
      <div
        style={{
          display: "grid",
          gap: "1rem",
          gridTemplateColumns: `repeat(auto-fill, minmax(${IMG_SIZE}px, 1fr)`,
        }}
      >
        {images.map((img) => (
          <Image key={img.prompt} {...img} />
        ))}
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
