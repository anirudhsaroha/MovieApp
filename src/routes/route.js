import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ExplorePage from "../pages/ExplorePage";
import DetailsPage from "../pages/DetailsPage";
import SearchPage from "../pages/SearchPage";
import Home from "../pages/Home";
import { ConfigProvider } from '../context/ConfigContext'; 

const router = createBrowserRouter([
  {
    path: "*",
    element: (
      <ConfigProvider>
        <App />
      </ConfigProvider>
    ),
    children: [
      {
        path: "",
        element: <Home />
      },
      {
        path: ":explore",
        element: <ExplorePage />
      },
      {
        path: ":explore/:id",
        element: <DetailsPage />
      },
      {
        path: "search",
        element: <SearchPage />
      }
    ]
  }
]);

export default router;
