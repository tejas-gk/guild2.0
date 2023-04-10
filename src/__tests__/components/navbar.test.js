const Navbar = require('../../components/Navbar');
import { render, screen } from '@testing-library/react';
it('summing 5 and 2 will return 7', () => {
    render(<Navbar />);
    const containsGuild = screen.getByText('Guild');
    expect(containsGuild).toBeInTheDocument();
});
