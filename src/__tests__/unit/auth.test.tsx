import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useRegisterModal } from '@/hooks/useRegisterModal';
import RegisterModal from '../../components/Modals/RegisterModal';
import { toast } from 'react-hot-toast';

jest.mock('react-hot-toast', () => ({
    toast: jest.fn(),
}));

describe('register user', () => {
    it('should be able to register a new user', async () => {
        render(<RegisterModal />);
        console.log('RegisterModal rendered');

        const nameInput = screen.getByPlaceholderText('Name');
        const emailInput = screen.getByPlaceholderText('Email');
        const passwordInput = screen.getByPlaceholderText('Password');
        const usernameInput = screen.getByPlaceholderText('Username');

        fireEvent.change(nameInput, { target: { value: 'John Doe' } });
        fireEvent.change(emailInput, { target: { value: 'test@user.com' } });
        fireEvent.change(passwordInput, { target: { value: '123456' } });
        fireEvent.change(usernameInput, { target: { value: 'testuser' } });
        fireEvent.click(screen.getByText('Create Account'));
        console.log('Create Account button clicked');

        await waitFor(() => {
            console.log('Waiting for toast');
            expect(toast).toHaveBeenCalledWith('Successfully registered');
        });
    });
});
