import { render, screen } from '@testing-library/react';
import Selector from '../Selector'

describe('<Selector> tests', () => {

    const label = "mock label"
    const target = "mockTarget"
    const items = [
        {id: "mockId", mockTarget: target}
    ]

    render(<Selector
        handleSelection={()=>{}}
        label={label}
        items={items}
        target={target}
        value="mock value"
    />);

    test('renders properly', () => {
        expect(screen.getByText(label)).toBeInTheDocument();
        expect(screen.getByText('mock label selection')).toBeInTheDocument();
    });

    // test('onClose() should call callback function', ()  => {
    //     expect(screen.getByRole("DialogActions")).toBeInTheDocument()
    //     expect(mockCallBack).toHaveBeenCalled()
    //
    // })
})
