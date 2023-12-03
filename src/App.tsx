import { AppContextProvider } from "./context/AppContext";
import AppRoutes from "./approutes";

function App() {
  return (
    <AppContextProvider>
      <AppRoutes />
    </AppContextProvider>
  );
}

export default App;
