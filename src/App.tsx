import "./style.css";
import { useState, useEffect } from "react";
import { getCheckResult } from "./getCheckResult";
import { RulesConfig } from "../server/src/types/Config";
import { CheckResult } from "../server/src/types/Checker";
import { MyTable } from "./components/MyTable.jsx";
import { testUrl } from "./utils/testUrl.js";

function App() {
  const [data, setData] = useState<RulesConfig<CheckResult[]>[] | null>(null);
  const [url, setUrl] = useState("");
  // useEffect(() => {
  //   getCheckResult()
  //     .catch(console.error)
  //     .then((data) => {
  //       setData(data);
  //     });
  // }, []);

  async function getResult() {
    if (url && url.length > 0 && testUrl(url)) {
      const data = await getCheckResult(url);
      setData(data);
    } else {
      alert(`Некорректный url: ` + url);
    }
  }

  return (
    <div className="wrapper">
      <section className="section_first">
        <div className="container">
          <div className="image_block">
            <img
              className="img"
              src="/src/assets/images/Completed task _Flatline.svg"
              alt="Чеклист"
            />
          </div>
          <h1 className="text_h1">Тестирование интерфейса</h1>
          <div className="input-field">
            <div className="basic-url_container">
              <label htmlFor="basic-url" className="col-6 form-label">
                Нажмите кнопку <strong>"Протестировать"</strong>, чтобы увидеть
                результаты проверки
              </label>
            </div>
            <div className="row search-row">
              <div className="col-6">
                <div className="d-grid"></div>
                <div className="input-group">
                  <span className="input-group-text" id="basic-addon3">
                    URL:
                  </span>
                  <input
                    type="url"
                    className="form-control"
                    name="url"
                    id="basic-url"
                    aria-describedby="basic-addon3"
                    placeholder="http://examle.com"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                  />
                </div>
              </div>

              <button
                id="test-btn-js"
                className="btn col-2 btn-primary"
                onClick={getResult}
              >
                Протестировать
              </button>
            </div>
          </div>
        </div>
      </section>
      <section id="results" className="section_second container ">
        <h2 className="text_h2">Результаты тестирования</h2>
        <div className="table-container col-8">
          <MyTable res={data}></MyTable>
        </div>
      </section>
    </div>
  );
}

export default App;
