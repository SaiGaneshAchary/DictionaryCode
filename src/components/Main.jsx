import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";
import Languages from "./Languages";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import SearchIcon from "@mui/icons-material/Search";
const Main = () => {
  const [text, newText] = useState("");
  const [mean, newMean] = useState([]);
  const [word, newWord] = useState("Dictionary");
  const [category, newCategory] = useState("en");
  useEffect(() => effect, [word, category, mean, text]);
  useEffect(() => effect, []);
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
    newText(theVal);
    if (theVal === "") {
      newText(...text);
      newMean([]);
    }
    console.log(word);
  };

  const languageChange = (e) => {
    let theVal = e.target.value;
    newCategory(theVal);
    newWord("Dictionary");
  };
  const fetchData = () => {
    newWord(text);
    effect();
  };
  return (
    <div className="container">
      <h1>{word}</h1>
      <div className="inputs">
        <div className="box">
          <input
            type="text"
            name=""
            id="text"
            placeholder="Enter a word..."
            onChange={findTheWord}
          />
          <SearchIcon sx={{ fontSize: 40 }} onClick={fetchData} />
        </div>
        <br />
        <br />
        <FormControl fullWidth>
          <InputLabel>Language</InputLabel>
          <Select
            onChange={languageChange}
            style={{ color: "red", fontWeight: "bold" }}
          >
            {Languages.map((val) => {
              return (
                <MenuItem
                  key={val.value}
                  value={val.value}
                  style={{ color: "red", fontWeight: "bold" }}
                >
                  {val.label}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
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
                        <h3>
                          PART OF SPEACH: <span>{mean.partOfSpeech}</span>
                        </h3>
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
