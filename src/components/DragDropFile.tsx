import { useRef, useState } from "react";
import "../styles/dragDropStyle.css";
import { RulesConfig } from "../../server/src/types/Config";

function handleFile(files) {
  //   alert("Number of files: " + files.length);
  console.log(files[0]);
}

// drag drop file component
export function DragDropFile() {
  // drag state
  const [dragActive, setDragActive] = useState(false);
  // ref
  const inputRef = useRef(null);

  // handle drag events
  const handleDrag = function (e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  // triggers when file is dropped
  const handleDrop = function (e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files);
    }
  };

  // triggers when file is selected with click
  const handleChange = function (e) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files);
    }
  };

  // triggers the input when the button is clicked
  const onButtonClick = () => {
    inputRef.current.click();
  };

  return (
    <div className="wrapper dragDrop-wrapper">
      <form
        id="form-file-upload"
        onDragEnter={handleDrag}
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={inputRef}
          type="file"
          id="input-file-upload"
          multiple={true}
          onChange={handleChange}
        />
        <label
          id="label-file-upload"
          htmlFor="input-file-upload"
          className={dragActive ? "drag-active" : ""}
        >
          <div>
            <img
              className="icon"
              src="/src/assets/images/download.svg"
              alt="Загрузить правила"
            />
            <p className="description">
              Перетащите файл с&nbsp;правилами в&nbsp;эту область
            </p>

            {/* <button className="upload-button" onClick={onButtonClick}>
              Выберите на устройстве
            </button> */}
          </div>
        </label>
        <button
          className="btn btn-primary upload-button"
          onClick={onButtonClick}
        >
          Выберите на устройстве
        </button>
        {dragActive && (
          <div
            id="drag-file-element"
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          ></div>
        )}
      </form>
    </div>
  );
}
