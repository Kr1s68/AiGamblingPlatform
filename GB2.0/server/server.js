const express = require("express");
const app = express();
import { ChatGPTAPI } from "chatgpt";

app.use(cors());
app.use(express.json());

async function example() {
  const api = new ChatGPTAPI({
    apiKey: "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",
  });

  const res = await api.sendMessage(
    `Generate me a 2 sentence paragraph, based on the word: State`
  );
  return res.text;
}

async function exampleTest() {
  return "String Success";
}

app.get("/getSentence", async (req, res) => {
  res.send(exampleTest);
});

const ip = "192.168.1.4";

app.listen(3001, `${ip}`, () => {
  console.log(`server is running on: ${ip}`);
});
