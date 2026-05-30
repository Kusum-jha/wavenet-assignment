import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Invoices from "./pages/Invoices";

function App() {
  return (
    <div>
      <Login />
      <hr />
      <Dashboard />
      <hr />
      <Users />
      <hr />
      <Invoices />
    </div>
  );
}

export default App;
