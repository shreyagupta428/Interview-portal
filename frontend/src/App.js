import { BrowserRouter as Router, Route,Routes} from "react-router-dom";
import NavBar  from "./components/navbar";
import Home from './components/home';
import CreateInterview from './components/createInterview';
import Edit from './components/editinterview'

function App() {
  return (
    <div>
  
      <Router>
      <NavBar />
        <Routes>  
          <Route exact path='/' element={<Home />} />
          <Route exact path='/create' element={<CreateInterview />} />
          <Route exact path='/interview/edit/:id' element={<Edit />} />
        </Routes>
    </Router>
      
    </div>
  );
}

export default App;
