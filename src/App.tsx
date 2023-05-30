import { useState } from "react";

import { Header } from "./Components/Header/Header";
import { Main } from "./Components/Main/Main";
import { BackDrop } from "./Components/Tree/Tree.styled";

function App() {
const [serviceCount, setServiceCount] = useState<number>(0);

function transitCount(value: number) {
setServiceCount(serviceCount + value)
}

const [zoomValue, setZoomValue] = useState<number>(0);

function transitZoomValue(value: number) {
setZoomValue(value)
}


  return (
    <BackDrop id='backdrop'>
      <Header serviceCount={serviceCount} transitZoomValue={transitZoomValue}/>
      <Main transitCount={transitCount} zoomValue={zoomValue}/>
    </BackDrop>
  );
}

export default App;
