// it('summing 5 and 2 will return 7', () => {
//     expect(5 + 2).toBe(7);
// });
import { render, screen } from '@testing-library/react';
import Navbar from '../../components/Navbar';

describe('Navbar', () => {
    test('renders with "Guild"', () => {
        render(<Navbar />);
        const GuildText = screen.getByText('Guild');
        expect(GuildText).toBeInTheDocument();
    });
});
