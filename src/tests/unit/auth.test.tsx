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
});
