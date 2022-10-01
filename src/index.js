import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import {WatchListProvider} from "./context/WatchListContext";
import {FilterProvider} from "./context/FilterContext";
import {CommonProvider} from "./context/CommonContext";
import {TMDBProvider} from "./context/TMDBContext";
import {BrowserRouter} from "react-router-dom";
import {ThemeProvider} from "@mui/material";
import {theme} from "./theme/theme";

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <CommonProvider>
            <FilterProvider>
                <WatchListProvider>
                    <TMDBProvider>
                        <ThemeProvider theme={theme}>
                            <App/>
                        </ThemeProvider>
                    </TMDBProvider>
                </WatchListProvider>
            </FilterProvider>
        </CommonProvider>
    </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
