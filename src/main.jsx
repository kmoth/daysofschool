import { createRoot } from "react-dom/client";
import "../styles.css";
import { App } from "./App.jsx";

const rootElement = document.querySelector("#root");
const root = globalThis.__schoolCountdownRoot || createRoot(rootElement);

globalThis.__schoolCountdownRoot = root;
root.render(<App />);
