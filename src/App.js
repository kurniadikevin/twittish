import Dashboard from "./dashboard";
import Sidebar from "./sidebar";

function App() {
  return (
    <div className="app-tab">
          <Dashboard/>
          <div>
            <h1>Hi i am App Home !</h1>
          </div>
          <Sidebar/>
    </div>
  );
}

export default App;
// App as Home