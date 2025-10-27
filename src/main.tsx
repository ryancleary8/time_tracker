<<<<<<< ours
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
<<<<<<< ours
import { SessionProvider } from './context/SessionContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <SessionProvider>
      <App />
    </SessionProvider>
  </React.StrictMode>,
=======

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
>>>>>>> theirs
=======
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
>>>>>>> theirs
);
