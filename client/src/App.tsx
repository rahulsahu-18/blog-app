import { Route } from "react-router-dom";
import { Routes} from "react-router-dom";
import Home from "./pages/Home";
import Blog from "./pages/Blog";

export default function App() {
  return (
    <div>
      <Routes>
       <Route path = '/' element = {<Home/>}/>
       <Route path = '/blog/:id' element = {<Blog/>}/>
      </Routes>
    </div>
  )
}