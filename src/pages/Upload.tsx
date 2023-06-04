import { RulesConfig } from "../../server/src/types/Config";
import { DragDropFile } from "../components/DragDropFile";
import { MyTable2 } from "../components/MyTable";
import useGetLocalConfig from "../hooks/useGetLocalConfig";
import "../styles/style.css";
import "../styles/dragDropStyle.css";
import { getLocalConfig, setServerConfig } from "../utils/localStorage";

type Props = {
  config: RulesConfig[];
};

function Upload() {
  const config = useGetLocalConfig();

  return <UploadForm config={config}></UploadForm>;
}

function UploadForm({ config }: Props) {
  const table = config?.map((section) => (
    <>
      <MyTable2 key={section.id} section={section}></MyTable2>
    </>
  ));

  return (
    <div className="wrapper">
      <section className="section_first container ">
        <div className="container row col-6">
          <h1 className="col text_h1">Загрузить список правил</h1>
        </div>
      </section>
      <DragDropFile />
    </div>
  );
}

export default Upload;
