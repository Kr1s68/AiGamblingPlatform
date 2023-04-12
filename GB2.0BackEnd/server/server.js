import express from "express";
import cors from "cors";
const app = express();
import { ChatGPTAPI } from "chatgpt";

app.use(cors());
app.use(express.json());

async function example(keyword) {
  const api = new ChatGPTAPI({
    apiKey: "...",
  });

  const res = await api.sendMessage(
    `Generate me a 3 sentence paragraph, based on the word: ${keyword}`
  );
  return res.text;
}

async function exampleTest(keyword, wordArray) {
  const min = Math.ceil(1);
  const max = Math.floor(5);
  const index = Math.floor(Math.random() * (max - min) + min);

  const strings = [
    "The sun had set hours ago, but the night sky was alive with a million stars. The air was crisp and cool, hinting at the coming of autumn. A lone owl hooted in the distance, adding to the peacefulness of the countryside.",
    "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like). ",
    "The waves crashed against the rocky shoreline, sending sprays of salty mist into the air. The sun was setting in the distance, painting the sky with hues of pink and orange. A group of seagulls flew overhead, their cries echoing in the stillness of the evening.",
    "The city streets were crowded with people rushing to and fro, their faces lost in a sea of anonymity. The sound of honking horns and the chatter of voices filled the air, creating a cacophony of noise. A street musician played a soulful tune on his guitar, but few stopped to listen amidst the hustle and bustle of the busy metropolis.",
    "The forest was alive with the sound of chirping birds and rustling leaves. The sun filtered through the canopy, casting dappled shadows on the forest floor. A stream babbled in the distance, its tranquil melody a soothing balm for the soul.",
  ];

  return strings[index];
}

app.get("/getSentence", async (req, res) => {
  const test = await example(req.query.keyword);
  res.send(test);
});

const ip = "192.168.1.4";

app.listen(3001, `${ip}`, () => {
  console.log(`server is running on: ${ip}`);
});
