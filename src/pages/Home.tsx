import "../styles/style.css";
import { useEffect, useState } from "react";
import { getCheckResult } from "../utils/getCheckResult.js";
import { RulesConfig } from "../../server/src/types/Config.js";
import { CheckResult } from "../../server/src/types/Checker.js";
import { MyTable } from "../components/MyTable.js";
import { testUrl } from "../utils/testUrl.js";
import { getLocalConfig, setServerConfig } from "../utils/localStorage.js";

function Home() {
  //Данные с резульататами тестирования
  const [data, setData] = useState<RulesConfig<CheckResult[]>[] | null>(null);

  //Адрес сайта для тестирования
  const [url, setUrl] = useState("");

  const [percent, setPercent] = useState<number | undefined>(undefined);

  const [style, setStyle] = useState<React.CSSProperties>({
    backgroundColor: "#fff",
    color: "#fff",
  });

  //Индикатор загрузки
  const [loading, setLoading] = useState(false);

  //Индикатор ошибки url
  const [error, setError] = useState(false);

  //Если LocalStorage пустой -> скачать конфиг с сервера
  useEffect(() => {
    async function setConfig() {
      // const config = localStorage.getItem("config");
      if (localStorage.length !== 0) {
      } else {
        await setServerConfig();
      }
      // setLoading(true);

      console.log(data);
      // setLoading(false);
    }
    setConfig();
  }, [data]);

  useEffect(() => {
    setPercent(showNumList());
  }, [data]);

  async function getResult() {
    if (url && url.length > 0 && testUrl(url)) {
      setLoading(true);
      setPercent(undefined);
      setError(false);
      const data = await getCheckResult(url, getLocalConfig());
      // console.log(data);
      setLoading(false);
      setData(data);
      showNumList();
    } else {
      setLoading(false);
      setError(true);
    }
  }

  function showNumList() {
    let resultPercent = 0;
    const textList = document.getElementsByClassName("resultPercent");

    if (textList.length === 0) {
      return undefined;
    }

    const list = [];
    let sum = 0;

    for (let i = 0; i < textList.length; i++) {
      const num = parseInt(String(textList[i].textContent).replace("%", ""));
      if (!Number.isNaN(num)) {
        list.push(num);
      }
      // console.log(num);
    }

    list.map((el) => {
      sum = sum + el;
    });

    resultPercent = parseFloat((sum / list.length).toFixed(0));

    if (resultPercent < 26) {
      setStyle({ backgroundColor: "#FFE3E3", color: "#FF2D2D" });
    } else if (resultPercent >= 26 && resultPercent < 51) {
      setStyle({ backgroundColor: "#FFE9D6", color: "#FF7612" });
    } else if (resultPercent >= 51 && resultPercent < 76) {
      setStyle({ backgroundColor: "#FFF5D1", color: "#FDB220" });
    } else {
      setStyle({ backgroundColor: "#DCFCE5", color: "#4FC670" });
    }
    return resultPercent;
  }

  const table = data?.map((section) => (
    <>
      <MyTable key={section.id} section={section}></MyTable>
    </>
  ));

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
                    placeholder="http://example.com"
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
          <>
            <h2 className="text_h2">Результаты тестирования</h2>
          </>
        )}
        <div className="table-container col-8">
          {data && !loading ? table : <div></div>}
          {percent !== undefined && (
            <div className="resultCircle" style={style}>
              {percent + "%"}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Home;
