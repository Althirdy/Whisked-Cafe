import { BrowserRouter as Route } from "react-router-dom";
import Router from "./Routes/Index";
import { ContextProvider } from "./Contexts/ContextProvider";
import { POSContextProvider } from "./Contexts/POSContextProvider";

function App() {
  return (
    <>
      <POSContextProvider>
        <ContextProvider>
          <Route>
            <Router />
          </Route>
        </ContextProvider>
      </POSContextProvider>
    </>
  );
}

export default App;
