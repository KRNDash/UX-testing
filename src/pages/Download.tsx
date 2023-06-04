import { RulesConfig } from "../../server/src/types/Config";
import { MyTable2 } from "../components/MyTable";
import useGetLocalConfig from "../hooks/useGetLocalConfig";
import "../styles/style.css";
import { getLocalConfig, setServerConfig } from "../utils/localStorage";

type Props = {
  config: RulesConfig[];
};

function Download() {
  const config = useGetLocalConfig();

  return <DownloadForm config={config}></DownloadForm>;
}

function DownloadForm({ config }: Props) {
  async function reloadConfig() {
    await setServerConfig();
  }

  function handleClick() {
    reloadConfig();
  }

  const downloadFile = ({ data, fileName, fileType }) => {
    // Create a blob with the data we want to download as a file
    const blob = new Blob([data], { type: fileType });
    // Create an anchor element and dispatch a click event on it
    // to trigger a download
    const a = document.createElement("a");
    a.download = fileName;
    a.href = window.URL.createObjectURL(blob);
    const clickEvt = new MouseEvent("click", {
      view: window,
      bubbles: true,
      cancelable: true,
    });
    a.dispatchEvent(clickEvt);
    a.remove();
  };

  const exportToJson = (e) => {
    e.preventDefault();
    downloadFile({
      data: JSON.stringify(getLocalConfig()),
      fileName: "Rules Package.json",
      fileType: "text/json",
    });
  };

  const table = config?.map((section) => (
    <>
      <MyTable2 key={section.id} section={section}></MyTable2>
    </>
  ));

  return (
    <div className="wrapper">
      <section className="section_first container ">
        <div className="container row col-6">
          <h1 className="col text_h1">Скачать список правил</h1>
        </div>
      </section>
      <section>
        <div className="table-container col-8">{table}</div>
      </section>
      <section className="section_buttons container">
        <div className="d-flex wrapper-btn">
          <button onClick={handleClick} className="btn btn-outline-primary ">
            Сбросить список правила
          </button>
          <button
            onClick={exportToJson}
            className="btn col-3 btn-primary offset-sm"
          >
            Скачать список правил
          </button>
        </div>
      </section>
    </div>
  );
}

export default Download;
