import {render, screen} from '@testing-library/react';
import App from '../App';
import {ThemeHelperProvider} from "../../context/ThemeHelperContext";
import {CommonProvider} from "../../context/CommonContext";
import {BrowserRouter} from "react-router-dom";
import {WatchListProvider} from "../../context/WatchListContext";
import {TMDBProvider} from "../../context/TMDBContext";
import {FilterProvider} from "../../context/FilterContext";
test('App render tests', async () => {
    render(
        <BrowserRouter>
            <ThemeHelperProvider>
                <CommonProvider>
                    <WatchListProvider>
                        <FilterProvider>
                            <TMDBProvider>
                                <App/>
                            </TMDBProvider>
                        </FilterProvider>
                    </WatchListProvider>
                </CommonProvider>
            </ThemeHelperProvider>
        </BrowserRouter>
    );

    expect(window.location.href).toContain("/search")

    const filterTitle = screen.getByText(/Filters/i);
    expect(filterTitle).toBeInTheDocument();
});


