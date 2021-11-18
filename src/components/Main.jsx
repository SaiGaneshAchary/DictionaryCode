import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";
import Languages from "./Languages";
const Main = () => {
  const [mean, newMean] = useState([]);
  const [word, newWord] = useState("Dictionary");
  const [category, newCategory] = useState("en");
  const effect = async () => {
    try {
      let data = await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/${category}/${word}`
      );
      newMean(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const findTheWord = (e) => {
    let theVal = e.target.value;
    newWord(theVal);
    if (theVal == "") {
      newWord("Dictionary");
    }
  };
  const languageChange = (e) => {
    let theVal = e.target.value;
    newCategory(theVal);
    newWord("Dictionary");
  };
  useEffect(effect, [word, category]);
  return (
    <div className="container">
      <h1>{word}</h1>
      <div className="inputs">
        <input
          type="text"
          name=""
          id="text"
          placeholder="Enter a word..."
          onChange={findTheWord}
        />
        <select onChange={languageChange}>
          {Languages.map((val) => {
            return <option value={val.value}>{val.label}</option>;
          })}
        </select>
      </div>
      <div className="output">
        {mean.map((val) => {
          return (
            <div>
              <audio
                style={{ backgroundColor: "#fff", borderRadius: 10 }}
                src={val.phonetics[0] && val.phonetics[0].audio}
                controls
              >
                Your browser does not support the audio element.
              </audio>
              <h2>
                WORD: <span>{val.word}</span>{" "}
              </h2>
              <h3>
                TEXT: <span>{val.phonetic}</span>{" "}
              </h3>
              <h3>
                ORIGIN: <span>{val.origin}</span>{" "}
              </h3>
              <div>
                {val.meanings.map((mean) => {
                  return mean.definitions.map((def) => {
                    return (
                      <div className="def" id={def}>
                        <h3>PART OF SPEACH: <span>{mean.partOfSpeech}</span></h3>
                        <h2>
                          DEFINITION: <br /> <span>{def.definition}</span>{" "}
                        </h2>
                        <h3>
                          {" "}
                          EXAMPLES : <span>{def.example}</span>{" "}
                        </h3>
                        {def.synonyms.map((syn) => {
                          return (
                            <div>
                              <h4>
                                SYNONYMS: "<span>{syn}</span>"
                              </h4>
                            </div>
                          );
                        })}
                      </div>
                    );
                  });
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Main;
