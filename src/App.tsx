import "./styles/style.css";
import "./styles/header-style.css";

// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   Link,
// } from 'react-router-dom';

import { Routes ,Route } from 'react-router-dom';

import Home from "./Home";
import Add from "./Add";
import Edit from "./Edit";
import Header from "./components/Header";


function App() {

  return (
    <>
    <Header></Header>
    <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/add" element={<Add/>}/>
          <Route path="/edit" element={<Edit/>}/>
          {/* <Route path="*" element={<NotFound/>}/> */}
        </Routes>
    </>
  );
}

export default App;
