import './App.css';
import { AppRouter } from "./routes";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}

function Error() {
  return <div>Page Not Found!</div>;
}

export default App;