import React, { useState, useRef, useOptimistic } from "react";
import { getAIImage, getAIText } from "./ai";

const IMG_SIZE = 256;

function Image({ prompt, url }) {
  return (
    <figure>
      {typeof url === "string" ? (
        <img src={url} alt={prompt} width={IMG_SIZE} height={IMG_SIZE} />
      ) : (
        <div
          style={{
            width: IMG_SIZE,
            height: IMG_SIZE,
            backgroundColor: "#aaa",
            borderRadius: 12,
          }}
        />
      )}
      <figcaption>{prompt}</figcaption>
    </figure>
  );
}

function Images() {
  const formRef = useRef();
  const [error, setError] = useState(null);
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
  const [optimisticImages, addOptimisticImage] = useOptimistic(
    images,
    (state, prompt) => [...state, { prompt, url: undefined }]
  );

  async function formAction(formData) {
    const prompt = formData.get("prompt");
    addOptimisticImage(prompt);
    console.log("Submitting prompt", prompt);
    formRef.current.reset();

    getAIImage(prompt, IMG_SIZE * 2, IMG_SIZE * 2)
      .then((url) => setImages((prev) => [...prev, { prompt, url }]))
      .catch((err) => {
        setError(err.toString());
        setImages((prev) => prev.filter((img) => typeof img.url === "string"));
        setTimeout(() => {
          setError(null);
        }, 5000);
      });
  }

  return (
    <section>
      <h2>Images</h2>
      <form action={formAction} ref={formRef}>
        <label>
          Generate an image
          <input name="prompt" placeholder="Forests catching fire" />
        </label>
        <button
          type="submit"
          disabled={
            images.length > 0 && optimisticImages.length !== images.length
          }
        >
          Add
        </button>
      </form>
      {error && (
        <p>
          <strong>{error}</strong>
        </p>
      )}
      <div
        style={{
          display: "grid",
          gap: "1rem",
          gridTemplateColumns: `repeat(auto-fill, minmax(${IMG_SIZE}px, 1fr)`,
        }}
      >
        {optimisticImages.reverse().map((img) => (
          <Image key={img.prompt + img.url} {...img} />
        ))}
      </div>
    </section>
  );
}

function Notes() {
  const formRef = useRef();
  const [error, setError] = useState(null);
  const [notes, setNotes] = useState([]);
  const [optimisticNotes, addOptimisticNote] = useOptimistic(
    notes,
    (state, prompt) => [...state, { prompt, content: "…" }]
  );

  async function formAction(formData) {
    const prompt = formData.get("prompt");
    addOptimisticNote(prompt);
    console.log("Submitting prompt", prompt);
    formRef.current.reset();

    getAIText(prompt, "")
      .then((content) => {
        console.log("Received", content);
        setNotes((prev) => [...prev, { prompt, content }]);
      })
      .catch((err) => {
        setError(err.toString());
        setNotes((prev) => prev.filter((note) => note.content !== "…"));
        setTimeout(() => {
          setError(null);
        }, 5000);
      });
  }

  return (
    <section>
      <h2>Notes</h2>
      <form action={formAction} ref={formRef}>
        <label>
          Generate a note
          <input name="prompt" placeholder="8-word AI ghost story" />
        </label>
        <button type="submit">Add</button>
      </form>
      {error && (
        <p>
          <strong>{error}</strong>
        </p>
      )}
      {optimisticNotes.reverse().map((note, i) => (
        <details key={note.prompt} open={i === 0}>
          <summary>{note.prompt}</summary>
          <p style={{ whiteSpace: "pre-wrap" }}>{note.content}</p>
        </details>
      ))}
    </section>
  );
}

export default function App() {
  return (
    <main>
      <h1>Pinboard</h1>

      <Images />
      <hr />
      <Notes />
    </main>
  );
}
