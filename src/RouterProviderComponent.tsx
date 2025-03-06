import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CharacterList from "./components/CharacterList";
import CharacterDetails from "./components/CharacterDetails";
import Favorites from "./components/Favorites";
import App from "./App";

const RouterProviderComponent = () => {

  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [{
        path: "/",
        element:
          <CharacterList />
      }, {

        path: "/character/:id",
        element:
          <CharacterDetails />

      },
      {
        path: "/favorites",
        element: <Favorites />,
      }]
    },

  ]);


  return <RouterProvider router={appRouter} />;
};

export default RouterProviderComponent;
