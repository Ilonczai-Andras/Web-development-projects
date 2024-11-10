import Header from "./components/header/header";
import NavRoutes from "./services/Routes/navroutes";
import { AuthProvider } from "./services/AuthContext/AuthContext";
import { BrowserRouter as Router } from 'react-router-dom'


function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <Header/>
          <NavRoutes/>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;