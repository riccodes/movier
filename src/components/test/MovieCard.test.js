import {render, screen} from "@testing-library/react";
import MovieCard from "../MovieCard";
import {mockMovie} from "../../util/Constants";
import {FilterProvider} from "../../context/FilterContext";
import {BrowserRouter} from "react-router-dom";
import {WatchListProvider} from "../../context/WatchListContext";
import {CommonProvider} from "../../context/CommonContext";
import {TMDBProvider} from "../../context/TMDBContext";

test('MovieCard render tests', async () => {
    render(
        <BrowserRouter>
            <FilterProvider>
                <CommonProvider>
                    <WatchListProvider>
                        <TMDBProvider>
                            <MovieCard movie={mockMovie}/>
                        </TMDBProvider>
                    </WatchListProvider>
                </CommonProvider>
            </FilterProvider>
        </BrowserRouter>
    )

    const title = await screen.findAllByRole('heading')
    expect(title).toHaveLength(1)

    const image = await screen.findAllByRole('img')
    expect(image).toHaveLength(1)

    const sections = await screen.findAllByRole('button')
    expect(sections[0]).toHaveTextContent("Overview")
})

