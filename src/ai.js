const REPLICATE_PROXY = "https://replicate-api-proxy.glitch.me";

export async function getAIImage(prompt, width, height) {
  const data = {
    // Playground AI model
    version: "a45f82a1382bed5c7aeb861dac7c7d191b0fdf74d8d57c4a0e6ed7d4d0bf7d24",
    input: {
      prompt,
      width,
      height,
      format: "jpg",
    },
  };
  let url = REPLICATE_PROXY + "/create_n_get/";
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  };
  return fetch(url, options)
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      if (res.error || res.output?.length == 0) {
        console.error("Something went wrong");
        // activate parent promise's catch block by throwing an error
        throw new Error(res.error);
      } else {
        let imageURL = res.output[0];
        return imageURL;
      }
    })
    .catch((err) => {
      throw new Error(err);
    });
}

export async function getAIText(prompt, systemPrompt) {
  const data = {
    version: "meta/meta-llama-3-8b-instruct",
    input: {
      prompt,
      system_prompt: systemPrompt,
    },
  };
  let url = REPLICATE_PROXY + "/create_n_get/";
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  };
  return fetch(url, options)
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      if (res.error || res.output?.length == 0) {
        console.error("Something went wrong");
        // activate parent promise's catch block by throwing an error
        throw new Error(res.error);
      } else {
        let output = res.output?.join("").trimStart();
        console.log("Output", output);
        return output;
      }
    })
    .catch((err) => {
      throw new Error(err);
    });
}
