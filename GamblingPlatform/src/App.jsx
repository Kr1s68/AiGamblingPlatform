import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { ChatGPTAPI } from "chatgpt";
import init from "./example.wasm?init";

function App() {
  const [output, setOutput] = useState(
    "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
  );
  const [keyword, setKeyword] = useState("State");
  const [amountOfTries, setAmountOfTries] = useState(6);
  const [formData, setFormData] = useState({});
  function handleClick(e) {
    setAmountOfTries(parseInt(e.target.value));
  }
  function handleChange(e) {
    let value = e.target.value;
    let name = e.target.name;
    setFormData((prevalue) => ({
      ...prevalue,
      [name]: value,
    }));
  }
  async function example() {
    const api = new ChatGPTAPI({
      apiKey: "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",
    });

    const res = await api.sendMessage(
      `Generate me a 2 sentence paragraph, based on the word: State`
    );
    setOutput(res.text);
  }

  return (
    <div className="App">
      <div className="Container">
        <label>ChatGPT output: </label>
        <br></br>

        <HighlightableText
          output={output}
          wordArray={formData}
          amountOfTries={amountOfTries}
        />
        <hr style={{ marginBlock: "50px" }}></hr>
        <div style={{ width: "100%", textAlign: "center", fontSize: "34px" }}>
          Keyword:{" "}
          <label style={{ fontWeight: "bold", color: "rgb(150,80,80)" }}>
            {keyword}
          </label>{" "}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            marginTop: "72px",
          }}
        >
          <div
            style={{
              width: "100%",
              textAlign: "center",
              fontSize: "34px",
              marginBlock: "15px",
              marginTop: "40px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            Tries:
            <TextInput
              iterations={amountOfTries}
              handleChange={handleChange}
            ></TextInput>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "200px",
              alignItems: "center",
            }}
          >
            <label style={{ fontSize: "19px", marginBottom: "20px" }}>
              Amount of tries:
            </label>
            <button
              className="button-input"
              style={{
                backgroundColor:
                  amountOfTries === 2 ? "orange" : "rgb(107,107,107)",
              }}
              value={2}
              onClick={handleClick}
            >
              2
            </button>
            <button
              className="button-input"
              value={4}
              onClick={handleClick}
              style={{
                backgroundColor:
                  amountOfTries === 4 ? "orange" : "rgb(107,107,107)",
              }}
            >
              4
            </button>
            <button
              className="button-input"
              value={6}
              onClick={handleClick}
              style={{
                backgroundColor:
                  amountOfTries === 6 ? "orange" : "rgb(107,107,107)",
              }}
            >
              6
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ObjectLength(object) {
  var length = 0;
  for (var key in object) {
    if (object.hasOwnProperty(key)) {
      ++length;
    }
  }
  return length;
}
function isWordInWordArray(wordArray, inputWord) {
  let wordBool = false;
  console.log(wordArray);
  for (let word in wordArray) {
    console.log(wordArray[word]);
    if (wordArray[word] === inputWord) {
      wordBool = true;
      console.log("It is included");
    }
  }
  return wordBool;
}

function HighlightableText({ wordArray, output, amountOfTries }) {
  const text = [];
  const str = output.split(" ");
  let wordCount = 0;
  for (let i = 0; i < str.length; i++) {
    wordCount += str[i].length * 11.85;
    ObjectLength(wordArray) >= amountOfTries &&
      text.push(
        <p
          style={{
            fontSize: "24px",
            display: "inline",
            marginInline: "3px",
            color: isWordInWordArray(wordArray, str[i]) ? "red" : "white",
          }}
        >
          {str[i]}
        </p>
      );
    if (wordCount > 900) {
      text.push(<br></br>);
      wordCount = 0;
    }
  }

  return <div className="text">{text}</div>;
}

function TextInput({ iterations, handleChange }) {
  const rows = [];
  for (let i = 0; i < iterations; i++) {
    rows.push(
      <input
        type="text"
        className="text-input"
        key={i}
        name={`input${i}`}
        onChange={handleChange}
      ></input>
    );
  }
  return <div>{rows}</div>;
}

export default App;
