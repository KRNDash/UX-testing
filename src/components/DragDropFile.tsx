import { DragEvent, ChangeEvent, useRef, useState, useEffect } from "react";
import "../styles/dragDropStyle.css";
import { RulesConfig } from "../../server/src/types/Config";
import { setLocalConfig } from "../utils/localStorage";

// drag drop file component
export function DragDropFile() {
  // const [file, setFile] = useState(false);

  const [text, setText] = useState(
    "Перетащите файл с&nbsp;правилами в&nbsp;эту область"
  );

  async function handleFile(files: FileList) {
    if (files[0].type !== "application/json") {
      alert("Файл должен быть в формате json");
      return;
    }
    try {
      const newConfig: RulesConfig[] = JSON.parse(await files[0].text());
      setLocalConfig(newConfig);
      setText("Файл «" + files[0].name + "» успешно загружен");
    } catch {
      alert("Файл содержит ошибки");
    }
  }

  // useEffect(() => {

  // }, [file]);

  // drag state
  const [dragActive, setDragActive] = useState(false);
  // ref
  const inputRef = useRef<HTMLInputElement | null>(null);

  // handle drag events
  const handleDrag = function (e: DragEvent<HTMLElement>) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  // triggers when file is dropped
  const handleDrop = async function (e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      await handleFile(e.dataTransfer.files);
    }
  };

  // triggers when file is selected with click
  const handleChange = async function (e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();

    const target = e.target as HTMLInputElement;
    if (!target) return;

    if (target.files && target.files[0]) {
      await handleFile(target.files);
    }
  };

  // triggers the input when the button is clicked
  const onButtonClick = () => {
    if (!inputRef.current) {
      return;
    }
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
          accept=".json"
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
            <p className="description">{text}</p>
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
