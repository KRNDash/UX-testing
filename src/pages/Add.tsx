import MyDropDown from "../components/MyDropDown";
import "../styles/style.css";
import { RulesConfig } from "../../server/src/types/Config.js";
// import { Checker } from "../../server/src/types/Checker.js";
import { getConfig } from "../getCheckResult.js";
import { useState, useEffect } from "react";
import MyNumberInput from "../components/MyNumberInput.js";
import MyTextInput from "../components/MyTextInput.js";
import StepTitle from "../components/StepTitle.tsx";

function Add() {
  //Конфиг правил с сервера
  const [data, setData] = useState<RulesConfig[]>([]);

  //Данные о выбранной секции
  const [section, setSection] = useState<string>();

  //Данные о введенных селекторах
  const [selector, setSelector] = useState<string>();

  //Данные о введенном названии правила
  const [ruleText, setRuleText] = useState<string>();

  //Данные о выбранном типе получаемых данных
  const [parse, setParse] = useState<string>();

  //Данные о введеном диапазоне
  const [min, setMin] = useState<number>();
  const [max, setMax] = useState<number>();

  useEffect(() => {
    async function getDataConfig() {
      const data = await getConfig();
      setData(data);
    }
    getDataConfig();
  }, []);

  //Разделы правил из конфига
  const titleOptions = data?.map((el: RulesConfig) => ({
    value: el.id.toString(),
    label: el.section,
  }));

  //Тип получаемых данных
  const parseOptions = [
    {
      value: "css-property",
      label: "CSS-свойство",
    },
    {
      value: "text-content",
      label: "Текст элемента",
    },
    {
      value: "images",
      label: "Изображения",
    },
    {
      value: "elements",
      label: "Элементы со страницы",
    },
  ];

  function setNextStep() {
    if (parse == undefined) {
      return "";
    }

    if (parse == "css-property") {
      return (
        <StepTitle
          stepNum={5}
          stepTitle="1111"
          input={
            <MyDropDown onElChange={setParse} data={parseOptions}></MyDropDown>
          }
        ></StepTitle>
      );
    } else
      return (
        <StepTitle
          stepNum={5}
          stepTitle="2222"
          input={
            <MyDropDown onElChange={setParse} data={parseOptions}></MyDropDown>
          }
        ></StepTitle>
      );
  }

  return (
    <div className="wrapper">
      <section className="section_first container ">
        <div className="container row">
          <h1 className="col text_h1 text_left">Добавить правило проверки</h1>
          <p className="col text_p">
            На данной странице вы можете сформировать собственное правило
            проверки, оно будет добавлено в общий список правил на странице
            тестирования. Также сформированные вами правила можно будет скачать
            на странице "скачать правила" для их передачи или переиспользования.
          </p>
        </div>
      </section>
      <section className="section_second">
        <div className="container row">
          {/* 1 шаг */}
          <StepTitle
            stepNum={1}
            stepTitle="В какой раздел добавить правило?"
            input={
              <MyDropDown
                onElChange={setSection}
                data={titleOptions}
              ></MyDropDown>
            }
          ></StepTitle>
          {/* 2 шаг */}
          <StepTitle
            stepNum={2}
            stepTitle="Перечислите классы, теги или id элементов для проверки"
            input={
              <MyTextInput
                onTextChange={setSelector}
                placeholder="Пример: p, div, .myTitle, #mySection, ..."
              ></MyTextInput>
            }
          ></StepTitle>
          {/* 3 шаг */}
          <StepTitle
            stepNum={3}
            stepTitle="Укажите название правила на русском языке"
            input={<MyTextInput onTextChange={setRuleText}></MyTextInput>}
          ></StepTitle>
          {/* 4 шаг */}
          <StepTitle
            stepNum={4}
            stepTitle="Что проверяется в правиле?"
            input={
              <MyDropDown
                onElChange={setParse}
                data={parseOptions}
              ></MyDropDown>
            }
          ></StepTitle>
          {setNextStep()}
          {/* <div className="d-flex">
            <div className="rangeWrapper col-2">
              <MyNumberInput onNumberChange={setMin}></MyNumberInput>
            </div>
            <div className="rangeWrapper col-2 offset">
              <MyNumberInput onNumberChange={setMax}></MyNumberInput>
            </div>
            <p>
              Range: от {min} до {max}
            </p>
          </div> */}
        </div>
      </section>
    </div>
  );
}

export default Add;
