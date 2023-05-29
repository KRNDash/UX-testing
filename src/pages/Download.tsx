import "../styles/style.css";
import { setServerConfig } from "../utils/localStorage";

function Download() {
  async function reloadConfig() {
    await setServerConfig();
  }

  function handleClick() {
    reloadConfig();
    // location.reload();
  }
  return (
    <div className="wrapper">
      <section className="section_first container"></section>
      <button onClick={handleClick} className="button">
        Сбросить список правила
      </button>
    </div>
  );
}

export default Download;
