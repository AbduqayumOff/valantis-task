import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Loader from "./components/Loader";
import CustomComponent from "./layout/CutomComponent";
import PageNotFound from "./pages/NotFound";
import { routes } from "./route/Routes";

function App() {
  const [loading, setLoading] = useState<boolean>(false);

  return loading ? (
    <div className="w-[100%] h-[100vh] flex justify-center items-center">
      <Loader />
    </div>
  ) : (
    <Routes>
      {routes?.map((route) => (
        <Route
          key={route.key}
          path={`${route.path}`}
          element={<CustomComponent Component={route.component} />}
        />
      ))}

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
