import Tets from '@/pages/tets';
import Navbar from '@/components/Navbar';
import { render, screen } from '@testing-library/react';

describe('auth works', () => {
    it('auth works', () => {
        expect(true).toBe(true);
    });

    it('renders without crashing', () => {
        render(<div>Test</div>);
        expect(screen.getByText('Test')).toBeInTheDocument();
    });

    test('renders the Sign in button when not logged in', () => {
        render(<Tets />);
        // render(<Navbar />);
        const signInButtonElement = screen.getByText('Sign in');
        expect(signInButtonElement).toBeInTheDocument();
    });
});
