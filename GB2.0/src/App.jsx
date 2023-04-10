import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import axios from "axios";
import "./App.css";
import randomWords from "random-words";
import Countdown from "react-countdown";

function App() {
  const [output, setOutput] = useState("Loading...");
  const [keyword, setKeyword] = useState("State");
  const [amountOfTries, setAmountOfTries] = useState(10);
  const [formData, setFormData] = useState({});
  const [appear, setAppear] = useState(false);
  const [guessed, setGuessed] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
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

  const key = "key";

  let params;
  try {
    params = new URLSearchParams([["keyword", keyword]]);
  } catch {}

  const serializeObject = (wordArray) => {
    let i = 0;
    let items = [];
    for (let word in wordArray) {
      items[i] = [word, wordArray[word]];
      i++;
    }
    return items;
  };

  const loadChatGPTString = async () => {
    await axios
      .get(`http://192.168.1.4:3001/getSentence`, { params })
      .then((response) => {
        setOutput(response.data);
        calcIsIncluded(response.data, formData);
      });
  };

  function calcIsIncluded(text, wordArray) {
    for (let word in wordArray) {
      if (text.includes(wordArray[word])) {
        setGuessed(guessed + 1);
        console.log(text);
        console.log("word included: " + wordArray[word]);
        console.log(guessed);
      }
    }
  }

  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a complete state
      loadChatGPTString();
      setIsLoaded(true);
    } else {
      // Render a countdown
      return (
        <div style={{ fontSize: "62px", width: "100%", textAlign: "center" }}>
          {seconds}
        </div>
      );
    }
  };
  useEffect(() => {
    setKeyword(randomWords());
  }, [0]);

  return (
    <div className="App">
      <div className="Container">
        <label>ChatGPT output: </label>
        <br></br>
        {isLoaded ? (
          <HighlightableText
            output={output}
            wordArray={formData}
            amountOfTries={amountOfTries}
            appear={appear}
          />
        ) : (
          <Countdown key={key} date={Date.now() + 10000} renderer={renderer} />
        )}
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
                  amountOfTries === 6 ? "orange" : "rgb(107,107,107)",
              }}
              value={6}
              onClick={handleClick}
            >
              6
            </button>
            <button
              className="button-input"
              value={8}
              onClick={handleClick}
              style={{
                backgroundColor:
                  amountOfTries === 8 ? "orange" : "rgb(107,107,107)",
              }}
            >
              8
            </button>
            <button
              className="button-input"
              value={10}
              onClick={handleClick}
              style={{
                backgroundColor:
                  amountOfTries === 10 ? "orange" : "rgb(107,107,107)",
              }}
            >
              10
            </button>
            <div style={{ marginTop: "20px", fontSize: "19px" }}>
              Words guessed: {guessed}
            </div>
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
  for (let word in wordArray) {
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
