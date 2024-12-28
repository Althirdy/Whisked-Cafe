import { BrowserRouter as Route } from "react-router-dom";
import Router from "./Routes/Index";
import { ContextProvider } from "./Contexts/ContextProvider";

function App() {
  return (
    <>
      <ContextProvider>
        <Route>
          <Router />
        </Route>
      </ContextProvider>
    </>
  );
}

export default App;
