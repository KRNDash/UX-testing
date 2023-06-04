import MyDropDown from "../components/MyDropDown";
import "../styles/style.css";
import { Rule, RulesConfig } from "../../server/src/types/Config.js";
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
import SecondStep, { SecondStepEdit } from "../components/steps/SecondStep.tsx";
import ThirdStep from "../components/steps/ThirdStep.tsx";
import FourthStep from "../components/steps/FourthStep.tsx";
import RangeInput from "../components/input/RangeInput.tsx";
import IncludeInput from "../components/input/IncludeInput.tsx";
import MultiplyInput from "../components/input/MultiplyInput.tsx";
import useGetLocalConfig from "../hooks/useGetLocalConfig.ts";
import { DataType, MyRule } from "../utils/Types.ts";
import { getLocalConfig, setLocalConfig } from "../utils/localStorage.ts";
import { Checker } from "../../server/src/types/Checker.ts";

type Props = {
  config: RulesConfig[];
  setRule: (rule: Rule<MyRule>, sectionId: number) => void;
};

function Edit() {
  const config = useGetLocalConfig();

  function setRule(rule: Rule<MyRule>, sectionId: number) {
    //Добавление в localStorage конфиг
    config[sectionId - 1].rules.push(rule);
    setLocalConfig(config);
  }

  return <EditRuleForm config={config} setRule={setRule}></EditRuleForm>;
}

function EditRuleForm({ config, setRule }: Props) {
  //Данные о выбранной секции
  const [section, setSection] = useState<string>("");

  // const [sectionArr, setSectionArr] = useState<>();

  //Данные о выбранном правиле
  const [ruleId, setRuleId] = useState<string>();

  //Данные о введенных селекторах
  const [selector, setSelector] = useState<string>("");

  //Данные о введенном названии правила
  const [ruleText, setRuleText] = useState<string>("");

  //Данные о выбранном типе получаемых данных
  const [parse, setParse] = useState<
    "css-property" | "text-content" | "elements" | "images"
  >("css-property");

  //Данные о выбранном CSS свойстве
  const [cssProperty, setCssProperty] =
    useState<keyof CSSStyleDeclaration>("fontSize");

  //Данные о выбранном параметре для элементов
  const [parseByProperty, setParseByProperty] = useState<
    "count" | "byteSize" | "attrs"
  >("count");

  //Данные о типе проверки
  const [type, setType] = useState<
    "range" | "includes" | "multiplicity" | "integer"
  >("range");

  //Данные о кратности
  const [range, setRange] = useState<[number | null, number | null]>([
    null,
    null,
  ]);

  //Данные о кратности
  const [multiplesOf, setMultiplesOf] = useState<string>();

  //Данные о вариантах (перечисление)
  const [variants, setVariants] = useState<string>();

  //Данные о введеном диапазоне
  const [min, setMin] = useState<number>(0);
  const [max, setMax] = useState<number>(0);

  const [ruleList, setRuleList] = useState<DataType[] | undefined>([]);

  //Разделы правил из конфига
  const titleOptions = config?.map((el: RulesConfig) => ({
    value: el.id.toString(),
    label: el.section,
  }));

  //
  //
  //

  useEffect(() => {
    setRange([min, max]);
  }, [min, max]);

  useEffect(() => {
    //Раздел правил\
    const sectionArr = config.find(
      (element) => element.id === parseInt(section)
    );
    const rulesOptions = sectionArr?.rules.map((el) => ({
      value: String(el.id),
      label: el.ruleName,
    }));

    setRuleList(rulesOptions);
  }, [section]);

  useEffect(() => {
    const sectionArr = config.find(
      (element) => element.id === parseInt(section)
    );
    const rule = sectionArr?.rules.find(
      (element) => element.id === parseInt(ruleId)
    );

    //Заполнение полей для редактирования данными из конфига
    setRuleText(rule ? rule?.ruleName : "");
    setSelector(rule ? rule?.selector : "");
    // console.log();
    setParse(rule ? rule?.сheckers[0].toBeParsed : "css-property");
  }, [ruleId]);

  //
  //
  //

  function setFourthStep() {
    const titleList = [
      "Какое свойство изображения проверить?",
      "Что проверяется в правиле?",
    ];
    let title = "";
    let options = [];
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
          num={5}
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
    let options = [];
    let getter;

    //Если свойство не выбрано
    if (parse == undefined) {
      return "";
    } else {
      if (parse === "css-property") {
        title = propertyTitleList[0];
        options = cssPropertyOptions;
        getter = setCssProperty;
      } else if (parse === "elements") {
        title = propertyTitleList[1];
        options = elementPropertyOptions;
        getter = setParseByProperty;
      } else return "";

      return (
        <StepTitle
          stepNum={6}
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
      if (type === "range") {
        return <RangeInput setMin={setMin} setMax={setMax}></RangeInput>;
      } else if (type == "includes") {
        return <IncludeInput setVariants={setVariants}></IncludeInput>;
      } else if (type === "multiplicity") {
        return <MultiplyInput setMultiplesOf={setMultiplesOf}></MultiplyInput>;
      } else {
        return "";
      }
    }
  }

  //
  //
  //
  //

  function onAEditRule() {
    const sectionArr = config.find(
      (element) => element.id === parseInt(section)
    );
    //id нового правила при добавлении
    const startId = sectionArr?.rules.length + 1;

    // console.log(sectionArr);
    // console.log(startId);

    //Объект правила
    const newRule: MyRule = {
      type: type,
      toBeParsed: parse,
    };

    //Наполнение объекта правила нужными полями
    switch (parse) {
      case "css-property":
        newRule.cssProperty = cssProperty;
        break;
      case "text-content":
        newRule.parseBy = "count";
        break;
      case "elements":
        newRule.parseBy = parseByProperty;
        break;
      case "images":
        newRule.parseBy = "byteSize";
        break;
      default:
        break;
    }

    //Сепаратор для строк (преобразование строки в массив строк)
    const re = /\s*,\s*/;

    //Наполнение объекта правила нужными полями
    switch (type) {
      case "range":
        newRule.range = range;
        break;
      case "includes":
        newRule.variants = variants?.split(re);
        break;
      case "multiplicity":
        newRule.multiplesOf = multiplesOf?.split(re);
        break;
      default:
        break;
    }

    //Объект для добавления правила в конфиг
    const resultRule = {
      id: startId,
      selector: selector,
      ruleName: ruleText,
      сheckers: [newRule],
    };

    //передать объект с данными (сделать свой объект из useState)
    setRule(resultRule, parseInt(section));
  }

  //
  //
  //
  //

  return (
    <div className="wrapper">
      <section className="section_first container ">
        <div className="container row">
          <h1 className="col text_h1 text_left">
            Редактировать правило проверки
          </h1>
          <p className="col text_p">
            На данной странице вы можете изменить существующее правило проверки.
            Также изменененные правила обновятся в списке, их можно будет
            скачать на странице "скачать правила" для передачи или
            переиспользования.
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
              <SecondStepEdit
                num={2}
                setRuleId={setRuleId}
                options={ruleList}
              ></SecondStepEdit>
              {ruleId && (
                <>
                  <SecondStep
                    startText={selector}
                    num={3}
                    setSelector={setSelector}
                  ></SecondStep>
                  <ThirdStep
                    num={4}
                    startText={ruleText}
                    setRuleText={setRuleText}
                  ></ThirdStep>
                  {setFourthStep()}
                  <>
                    <StepTitle
                      stepNum={7}
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
                    <div className="d-flex flex-row-reverse">
                      <button
                        onClick={onAEditRule}
                        className="btn col-2 btn-primary offset"
                      >
                        Сохранить правило
                      </button>
                      <button className="btn btn-outline-primary col-2">
                        Сбросить всё
                      </button>
                    </div>
                  </>
                </>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}

export default Edit;
