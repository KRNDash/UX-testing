import MyDropDown from "../components/MyDropDown";
import "../styles/style.css";
import { RulesConfig } from "../../server/src/types/Config.js";
// import { Checker } from "../../server/src/types/Checker.js";
import { getConfig } from "../utils/getCheckResult.js";
import { useState, useEffect } from "react";
import MyNumberInput from "../components/MyNumberInput.js";
import MyTextInput from "../components/MyTextInput.js";
import StepTitle from "../components/StepTitle.tsx";
import {
  cssPropertyOptions,
  parseOptions,
  elementPropertyOptions,
  typeOptions,
} from "../utils/options.ts";

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
  const [parse, setParse] = useState<string>("css-property");

  //Данные о выбранном CSS свойстве
  const [cssProperty, setCssProperty] = useState<string>();

  //Данные о выбранном параметре для элементов
  const [parseByProperty, setParseByProperty] = useState<string>();

  //Данные о типе проверки
  const [type, setType] = useState<string>("range");

  //Данные о диапазоне
  const [range, setRange] = useState<number[]>([0, 1]);

  //Данные о кратности
  const [multiplesOf, setMultiplesOf] = useState<string>();

  //Данные о вариантах (перечисление)
  const [variants, setVariants] = useState<string>();

  //Данные о введеном диапазоне
  const [min, setMin] = useState<number>(0);
  const [max, setMax] = useState<number>(0);

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

  const firstStep = (
    <StepTitle
      stepNum={1}
      stepTitle="В какой раздел добавить правило?"
      input={
        <MyDropDown onElChange={setSection} data={titleOptions}></MyDropDown>
      }
    ></StepTitle>
  );

  const secondStep = (
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
  );

  const thirdStep = (
    <StepTitle
      stepNum={3}
      stepTitle="Укажите название правила на русском языке"
      input={<MyTextInput onTextChange={setRuleText}></MyTextInput>}
    ></StepTitle>
  );

  function setFourthStep() {
    console.log(section);
    if (section == "3") {
      // setParse("image");
      const imageOptions = [{ value: "byteSize", label: "Вес изображения" }];

      return (
        <StepTitle
          stepNum={4}
          stepTitle={"Какое свойство изображения проверить?"}
          input={
            <MyDropDown
              onElChange={setParseByProperty}
              data={imageOptions}
            ></MyDropDown>
          }
        ></StepTitle>
      );
    } else {
      return (
        <>
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
          {setFifthStep()}
        </>
      );
    }
  }

  function setFifthStep() {
    const propertyTitleList = [
      "Какое CSS-свойство проверять?",
      "Какое свойство (атрибут) элемента проверить?",
    ];

    let title = "";
    let options = cssPropertyOptions;
    let getter;

    //Если свойство не выбрано
    if (parse == undefined) {
      return "";
    } else {
      if (parse == "css-property") {
        title = propertyTitleList[0];
        options = cssPropertyOptions;
        getter = setCssProperty;
      } else if (parse == "elements") {
        title = propertyTitleList[1];
        options = elementPropertyOptions;
        getter = setParseByProperty;
      } else return "";

      return (
        <StepTitle
          stepNum={5}
          stepTitle={title}
          input={<MyDropDown onElChange={getter} data={options}></MyDropDown>}
        ></StepTitle>
      );
    }
  }

  const rangeInput = (
    <>
      <div className="d-flex offset-md-1">
        <div className="rangeWrapper">
          <MyNumberInput onNumberChange={setMin}></MyNumberInput>
        </div>
        <div className="rangeWrapper offset">
          <MyNumberInput onNumberChange={setMax}></MyNumberInput>
        </div>
      </div>
    </>
  );

  const includesInput = (
    <div className="includesWrapper">
      <MyTextInput onTextChange={setVariants}></MyTextInput>
    </div>
  );

  const multiplyInput = (
    <div className="includesWrapper">
      <MyTextInput onTextChange={setMultiplesOf}></MyTextInput>
    </div>
  );

  function setSixthStep() {
    if (type == undefined) {
      return "";
    }

    {
      if (type == "range") {
        return rangeInput;
      } else if (type == "includes") {
        return includesInput;
      } else if (type == "multiplicity") {
        return multiplyInput;
      } else {
        return "";
      }
    }
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
          {firstStep}
          {section ? (
            <>
              {secondStep}
              {selector ? (
                <>
                  {thirdStep}
                  {ruleText ? (
                    <>
                      {setFourthStep()}
                      {parseByProperty || cssProperty ? (
                        <>
                          <StepTitle
                            stepNum={6}
                            stepTitle="Что проверяется в правиле?"
                            input={
                              <>
                                <div className="d-flex justify-content-between">
                                  <div className="col-6">
                                    <MyDropDown
                                      onElChange={setType}
                                      data={typeOptions}
                                    ></MyDropDown>
                                  </div>
                                  <div className="">{setSixthStep()}</div>
                                </div>
                              </>
                            }
                          ></StepTitle>
                          {range || multiplesOf || variants ? (
                            <>
                              <div className="d-flex flex-row-reverse">
                                <button className="btn col-2 btn-primary">
                                  Добавить правило
                                </button>
                                <button className="btn btn-outline-primary col-2">
                                  Сбросить всё
                                </button>
                              </div>
                            </>
                          ) : (
                            ""
                          )}
                        </>
                      ) : (
                        ""
                      )}
                    </>
                  ) : (
                    ""
                  )}
                </>
              ) : (
                ""
              )}
            </>
          ) : (
            ""
          )}
        </div>
      </section>
    </div>
  );
}

export default Add;
