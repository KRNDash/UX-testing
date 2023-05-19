import MyDropDown from "../components/MyDropDown";
import "../styles/style.css";
import { RulesConfig } from "../../server/src/types/Config.js";
// import { Checker } from "../../server/src/types/Checker.js";
import { getConfig } from "../utils/getCheckResult.js";
import { useState, useEffect } from "react";
import StepTitle from "../components/StepTitle.tsx";
import {
  cssPropertyOptions,
  parseOptions,
  elementPropertyOptions,
  typeOptions,
  imageOptions,
} from "../utils/options.ts";
import FirstStep from "../components/steps/FirstStep.tsx";
import SecondStep from "../components/steps/SecondStep.tsx";
import ThirdStep from "../components/steps/ThirdStep.tsx";
import FourthStep from "../components/steps/FourthStep.tsx";
import RangeInput from "../components/input/RangeInput.tsx";
import IncludeInput from "../components/input/IncludeInput.tsx";
import MultiplyInput from "../components/input/MultiplyInput.tsx";

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
  const [cssProperty, setCssProperty] = useState<string>("font-size");

  //Данные о выбранном параметре для элементов
  const [parseByProperty, setParseByProperty] = useState<string>();

  //Данные о типе проверки
  const [type, setType] = useState<string>("range");

  //Данные о кратности
  const [range, setRange] = useState<number[]>();

  //Данные о кратности
  const [multiplesOf, setMultiplesOf] = useState<string>();

  //Данные о вариантах (перечисление)
  const [variants, setVariants] = useState<string>();

  //Данные о введеном диапазоне
  const [min, setMin] = useState<number>(0);
  const [max, setMax] = useState<number>(0);

  // const range = [min, max];

  useEffect(() => {
    async function getDataConfig() {
      //Получаем конфиг из LocalStorage
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

  function setFourthStep() {
    const titleList = [
      "Какое свойство изображения проверить?",
      "Что проверяется в правиле?",
    ];
    let title = "";
    let options = cssPropertyOptions;
    let getter;
    let nextStep = false;
    if (section == "3") {
      title = titleList[0];
      options = imageOptions;
      getter = setParseByProperty;
      nextStep = false;
    } else {
      title = titleList[1];
      options = parseOptions;
      getter = setParse;
      nextStep = true;
    }
    return (
      <>
        <FourthStep
          stepTitle={title}
          getter={getter}
          options={options}
        ></FourthStep>
        {nextStep && setFifthStep()}
      </>
    );
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

  function setSixthStep() {
    if (type == undefined) {
      return "";
    }

    {
      if (type == "range") {
        return <RangeInput setMin={setMin} setMax={setMax}></RangeInput>;
      } else if (type == "includes") {
        return <IncludeInput setVariants={setVariants}></IncludeInput>;
      } else if (type == "multiplicity") {
        return <MultiplyInput setMultiplesOf={setMultiplesOf}></MultiplyInput>;
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
          <FirstStep
            setSection={setSection}
            titleOptions={titleOptions}
          ></FirstStep>
          {section && (
            <>
              <SecondStep setSelector={setSelector}></SecondStep>
              {selector && (
                <>
                  <ThirdStep setRuleText={setRuleText}></ThirdStep>
                  {ruleText && (
                    <>
                      {setFourthStep()}
                      {parseByProperty ||
                        (cssProperty && (
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
                            {range ||
                              multiplesOf ||
                              (variants && (
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
                              ))}
                          </>
                        ))}
                    </>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}

export default Add;
