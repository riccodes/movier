import {render, screen} from "@testing-library/react";
import FilterBar from "../FilterBar";
import {TMDBProvider} from "../../context/TMDBContext";
import {BrowserRouter} from "react-router-dom";
import {FilterProvider} from "../../context/FilterContext";
import {CommonProvider} from "../../context/CommonContext";

test("FilterBar render tests", async () => {
    render(
        <BrowserRouter>
            <FilterProvider>
                <CommonProvider>
                    <TMDBProvider>
                        <FilterBar/>
                    </TMDBProvider>
                </CommonProvider>
            </FilterProvider>
        </BrowserRouter>
    )

    // Check all buttons render
    const buttons = await screen.findAllByRole('button')
    expect(buttons).toHaveLength(8)

    // Check all buttons labels render
    const titleBar = screen.getByText(/Filters/i)
    expect(titleBar).toBeInTheDocument()
    const clearText = screen.getByText(/Clear All Fields/i)
    expect(clearText).toBeInTheDocument();
    const genreFilter = screen.getByText("Genres")
    expect(genreFilter).toBeInTheDocument()
    const certFilter = screen.getByText("Certifications")
    expect(certFilter).toBeInTheDocument()
    const popFilter = screen.getByText("popularity.desc")
    expect(popFilter).toBeInTheDocument()
    const watchFilter = screen.getByText("Watch On")
    expect(watchFilter).toBeInTheDocument()
    const personFilter = screen.getAllByText("Search by person")
    expect(personFilter).toHaveLength(2)
    const MovieFilter = screen.getAllByText("Search by Movie Title")
    expect(MovieFilter).toHaveLength(2)

    // check rating renders
    const ratingLabel = screen.getByText(/Minimum Rating/i)
    expect(ratingLabel).toBeInTheDocument()

    // check slider renders
    const testing = screen.getByLabelText("Set year")
    expect(testing).toBeInTheDocument()

})