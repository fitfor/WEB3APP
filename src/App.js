import { Route, Routes } from "react-router-dom";
import Home from "./views/home/ index";
import Punks from "./views/punks/index";
import MainLayout from "./layouts/main/index";

function App() {
  return (
    
      <MainLayout>
      <Routes>
       <Route path="/" exact element={<Home/>} />
       <Route path="/punks" exact element={<Punks/>} />
      </Routes>
     </MainLayout>
  );
}

export default App;
