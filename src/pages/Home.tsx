import "../styles/style.css";
import "../styles/header-style.css";
import { useState } from "react";
import { getCheckResult } from "../getCheckResult.js";
import { RulesConfig } from "../../server/src/types/Config.js";
import { CheckResult } from "../../server/src/types/Checker.js";
import { MyTable } from "../components/MyTable.js";
import { testUrl } from "../utils/testUrl.js";

function Home() {
  //Данные с резульататами тестирования
  const [data, setData] = useState<RulesConfig<CheckResult[]>[] | null>(null);

  //Адрес сайта для тестирования
  const [url, setUrl] = useState("");

  //Индикатор загрузки
  const [loading, setLoading] = useState(false);

  //Индикатор ошибки url
  const [error, setError] = useState(false);

  async function getResult() {
    if (url && url.length > 0 && testUrl(url)) {
      setLoading(true);
      setError(false);
      const data = await getCheckResult(url);
      setLoading(false);
      setData(data);
    } else {
      setLoading(false);
      setError(true);
      // alert(`Некорректный url: ` + url);
    }
  }

  const table = data?.map((section) => <MyTable section={section}></MyTable>);
  return (
    <div className="wrapper">
      <section className="section_first">
        <div className="container">
          <div className="image_block">
            <img
              className="img"
              src="/src/assets/images/image 3.jpg"
              alt="Чеклист"
            />
          </div>
          <h1 className="text_h1">Тестирование интерфейса</h1>
          <div className="input-field">
            <div className="basic-url_container">
              <label className="col-6 form-label">
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
                    className={
                      error ? "form-control is-invalid" : "form-control"
                    }
                    name="url"
                    id="basic-url"
                    aria-describedby="basic-addon3"
                    placeholder="http://examle.com"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                  />
                </div>
                <div>
                  {error ? (
                    <div className="col-6 invalid-feedback">
                      Пожалуйста, введите корректный url
                    </div>
                  ) : (
                    <div></div>
                  )}
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
        {loading && (
          <img className="gif" src="/src/assets/images/loading.gif" alt="" />
        )}
        {data && !loading && (
          <h2 className="text_h2">Результаты тестирования</h2>
        )}
        <div className="table-container col-8">
          {data && !loading ? table : <div></div>}
        </div>
      </section>
    </div>
  );
}

export default Home;
