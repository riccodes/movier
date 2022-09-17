import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import {WatchListProvider} from "./context/WatchListContext";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {FilterProvider} from "./context/FilterContext";
import {CommonProvider} from "./context/CommonContext";
import WatchList from "./routes/WatchList";
import Search from "./routes/Search";
import {TMDBProvider} from "./context/TMDBContext";

const router = createBrowserRouter([
    {
        path: "/",
        element: <WatchList/>,
        children: [
            {
                path: "/watchlist",
                element: <WatchList/>
            },
            {
                path: "/search",
                element: <Search/>
            }
        ],
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <CommonProvider>
        <FilterProvider>
            <WatchListProvider>
                <TMDBProvider>
                    <RouterProvider router={router}/>
                </TMDBProvider>
            </WatchListProvider>
        </FilterProvider>
    </CommonProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
