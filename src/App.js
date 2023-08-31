//import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route,Rocation} from "react-router-dom";

import { Pnf } from "./pages/pnf";
import { Start } from "./pages/start";
import { Play } from "./pages/play";
import { Result } from "./pages/result";
import {Explain} from "./pages/explain";
import {Company} from "./pages/company";

function App() {

  return (
    <div className="app">
    <BrowserRouter>
      <ul>
      </ul>
      <Routes>
        <Route activeClassName="active" path="*"element={<Pnf />}/>
        <Route activeClassName="active" path="/"element={<Start />}/>
        <Route activeClassName="active" path="/start"element={<Start />}/>
        <Route activeClassName="active" path="/play"element={<Play />}/>
        <Route activeClassName="active" path="/result"element={<Result />}/>
        <Route activeClassName="active" path="/explain"element={<Explain/>}/>
        <Route activeClassName="active" path="/company"element={<Company/>}/>
        <Route activeClassName="active" path="/explain"element={<Explain/>}/>

      </Routes>
    </BrowserRouter>
  </div>
  );
}

export default App;
