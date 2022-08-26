import Dashboard from "./dashboard";
import Sidebar from "./sidebar";
import PostForm from "./post-form";

function App() {
  return (
    <div className="app-tab">
          <Dashboard/>
          <div>
            <h1>Hi i am App Home !</h1>
            <PostForm />
          </div>
          <Sidebar/>
    </div>
  );
}

export default App;
// App as Home