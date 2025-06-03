const apiKey = "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";

import axios from "axios";

const openai = axios.create({
  baseURL: "https://api.openai.com/v1",
  headers: {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
  },
});

export function generateImage(prompt) {
  return openai.post("/images/generations", {
    model: "dall-e-2",
    prompt,
    n: 1,
    size: "512x512",
    response_format: "url",
  });
}
