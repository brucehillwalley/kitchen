import About from "./components/About/About";
import Carousel from "./components/carousel/Carousel";

function App() {
  return (
    <div className="App">
      {/* <h1 style={{ textAlign: "center", color: "red" }}>Contentful Kitchen</h1> */}
    
      <Carousel />
      <About/>
    </div>
  );
}

export default App;
