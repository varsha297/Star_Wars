import ReactDOM from "react-dom/client";
import "./styles/global.scss"; // Import SCSS

import RouterProviderComponent from "./RouterProviderComponent";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProviderComponent />
);