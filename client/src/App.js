import "./App.css";
import Login from "./components/account/Login";
import Home from "./components/home/Home";
import DataProvider from "./context/DataProvider";

function App() {
  return (
    <div className="App">
      <DataProvider>
        <Login />
        <Home />
      </DataProvider>
    </div>
  );
}

export default App;
