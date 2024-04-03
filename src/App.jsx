import Allblog from "./Allblog";
import Singlepage from "./Singlepage";
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

export default function App() {
  return (

    <Router>
      <Routes>
        <Route path='/' element={<Allblog />} />
        <Route path='/singlepage/' element={<Singlepage />} /> 
      </Routes>
    </Router>
  )
}
