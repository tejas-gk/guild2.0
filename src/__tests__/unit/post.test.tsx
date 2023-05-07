import { render, screen } from '@testing-library/react';
import Navbar from '../../components/Navbar';

describe('Navbar', () => {
    test('renders with "Guild"', () => {
        render(<Navbar />);
        const GuildText = screen.getByText('Guild');
        expect(GuildText).toBeInTheDocument();
    });
});
