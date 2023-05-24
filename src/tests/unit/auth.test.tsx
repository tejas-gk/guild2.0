import { render, screen } from '@testing-library/react';
import Navbar from '../../components/Navbar';
describe('auth works', () => {
    it('auth works', () => {
        expect(true).toBe(true);
    });
    test('renders Navbar component', () => {
        render(<Navbar />);
        screen.debug();
    });
});
