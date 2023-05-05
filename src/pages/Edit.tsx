import "../styles/style.css";
import "../styles/header-style.css";

function Edit() {
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
                    className="form-control"
                    name="url"
                    id="basic-url"
                    aria-describedby="basic-addon3"
                    placeholder="http://examle.com"
                    // value={url}
                    // onChange={(e) => setUrl(e.target.value)}
                  />
                </div>
              </div>
              {/* 
              <button
                id="test-btn-js"
                className="btn col-2 btn-primary"
                onClick={getResult}
              >
                Протестировать
              </button> */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Edit;
