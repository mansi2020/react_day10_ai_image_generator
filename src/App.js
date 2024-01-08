import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [imageData, setImageData] = useState(null);
  const [inputtext, setInputText] = useState("mansi");
  const [dataToSearch, setDataToSearch] = useState(true);
  const [loading, setoading] = useState(true);

  // set serach text
  let onChangeTextInput = (e) => {
    setInputText(e.target.value);
  };

  // onClickSearch
  let onClickSearch = () => {
    setDataToSearch(!dataToSearch);
    setoading(true);
  };

  // fetch data
  useEffect(() => {
    async function query(data) {
      const response = await fetch(
        "https://api-inference.huggingface.co/models/prompthero/openjourney-v4",
        {
          headers: {
            Authorization: "Bearer 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",
          },
          method: "POST",
          body: JSON.stringify(data),
        }
      );
      const result = await response.blob();
      const dataUrl = URL.createObjectURL(result);
      return dataUrl;
    }
    query({ inputs: inputtext }).then((response) => {
      setImageData(response);
      setoading(false);
    });
  }, [dataToSearch]);

  return (
    <div>
      {/* header */}
      <header>
        <h1>AI Image Generator</h1>
      </header>

      <div className="app-content">
        {/* left part */}
        <div className="app-content-left-container">
          <div className="hero-section">
            <div className="hero-title">Generate Images with AI</div>
            <p>Click search, and let the AI generate an image for you!</p>
          </div>

          <div className="app-search-data">
            <input
              type="search"
              onChange={onChangeTextInput}
              className="search-input"
              placeholder="Enter Text here..."
            />
            <button onClick={onClickSearch} className="search-button">
              Search
            </button>
          </div>
          <div className="app-download-container">
            <a href={imageData} download={inputtext}>
              <button className="download-btn">Download</button>
            </a>
          </div>
        </div>

        {/* image show - right part */}
        <div className="app-image-container">
          {loading ? (
            <div class="loader">
              <div class="loader-inner">
                <div class="loader-line-wrap">
                  <div class="loader-line"></div>
                </div>
                <div class="loader-line-wrap">
                  <div class="loader-line"></div>
                </div>
                <div class="loader-line-wrap">
                  <div class="loader-line"></div>
                </div>
                <div class="loader-line-wrap">
                  <div class="loader-line"></div>
                </div>
                <div class="loader-line-wrap">
                  <div class="loader-line"></div>
                </div>
              </div>
            </div>
          ) : (
            <div className="app-image-data">
              <br />
              <img src={imageData} alt="Image" className="app-image" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
