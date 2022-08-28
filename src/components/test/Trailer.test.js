import { render, screen } from '@testing-library/react';
import Trailer from '../Trailer';


describe('<Trailer> tests', () => {
    const trailer =  {
        "iso_639_1": "en",
        "iso_3166_1": "US",
        "name": "Bringing Up Baby (1938) Official Trailer - Katharine Hepburn, Cary Grant Movie HD",
        "key": "F25nzu6hh0Q",
        "published_at": "2016-06-22T23:18:47.000Z",
        "site": "YouTube",
        "size": 360,
        "type": "Trailer",
        "official": false,
        "id": "5b1614f40e0a262ddf013082"
    }
    const mockCallBack = jest.fn(()=>{})
    render(<Trailer
        open={true}
        setTrailerOpen={mockCallBack}
        trailer={trailer} />);

    test('renders trailer with proper title', () => {
        const linkElement = screen.getByTitle(trailer.name);
        expect(linkElement).toBeInTheDocument();
    });

    // test('onClose() should call callback function', ()  => {
    //     expect(screen.getByRole("DialogActions")).toBeInTheDocument()
    //     expect(mockCallBack).toHaveBeenCalled()
    //
    // })
})
