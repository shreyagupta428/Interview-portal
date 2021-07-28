import { BrowserRouter, BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavBar  from "./components/navbar";
import Home from './components/home';
import CreateInterview from './components/createInterview';
import EditInterview from './components/editinterview'

function App() {
  return (
    <div>
      <BrowserRouter>
         <NavBar />
         <Route exact path="/">
            <Home/>
         </Route>
         <Route path="/create">
            <CreateInterview />
         </Route>
         <Route path="/interview/:iid">
              <EditInterview />
            </Route>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
