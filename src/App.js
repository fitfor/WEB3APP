import { Route, Routes } from "react-router-dom";
import Home from "./views/home/ index";
import MainLayout from "./layouts/main/index";

function App() {
  return (
    
      <MainLayout>
      <Routes>
       <Route path="/" exact element={<Home/>} />
      </Routes>
     </MainLayout>
  );
}

export default App;
