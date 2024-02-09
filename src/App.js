import About from "./components/About/About";
import Carousel from "./components/carousel/Carousel";
import { Provider } from "./context/Context";

function App() {
  return (
  <Provider>
      <div className="App">
      {/* <h1 style={{ textAlign: "center", color: "red" }}>Contentful Kitchen</h1> */}
    
      <Carousel />
      <About/>
    </div>
  </Provider>
  );
}

export default App;
