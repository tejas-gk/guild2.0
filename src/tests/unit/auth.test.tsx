import Navbar from '@/components/Navbar';
import RegisterModal from '@/components/Modals/RegisterModal';
import { fireEvent, render, screen } from '@testing-library/react';
import LoginModal from '@/components/Modals/LoginModal';

describe('auth works', () => {
    it('auth works', () => {
        expect(true).toBe(true);
    });

    it('logs user in', async () => {
        render(<LoginModal />);
        const emailInputElement = screen.getByPlaceholderText('Email');
        const passwordInputElement = screen.getByPlaceholderText('Password');
        const submitButtonElement = screen.getByTitle('Send');

        fireEvent.change(emailInputElement, {
            target: { value: 'sam@earth.com' },
        });
        fireEvent.change(passwordInputElement, {
            target: { value: 'as%A1sdf123' },
        });
        fireEvent.click(submitButtonElement);
    });

    test('registers new user', async () => {
        render(<RegisterModal />);
        const dummyUser = {
            name: 'Sam',
            username: 's-a-m',
            email: 'sam@earth.com',
            password: 'as%A1sdf123',
        };

        const emailInputElement = screen.getByPlaceholderText('Email');
        const passwordInputElement = screen.getByPlaceholderText('Password');
        const nameInputElement = screen.getByPlaceholderText('Name');
        const usernameInputElement = screen.getByPlaceholderText('Username');
        const submitButtonElement = screen.getByText('Create');

        expect(emailInputElement).toBeInTheDocument();
        expect(passwordInputElement).toBeInTheDocument();
        expect(nameInputElement).toBeInTheDocument();
        expect(usernameInputElement).toBeInTheDocument();
        expect(submitButtonElement).toBeInTheDocument();

        fireEvent.change(emailInputElement, {
            target: { value: dummyUser.email },
        });
        fireEvent.change(passwordInputElement, {
            target: { value: dummyUser.password },
        });
        fireEvent.change(nameInputElement, {
            target: { value: dummyUser.name },
        });
        fireEvent.change(usernameInputElement, {
            target: { value: dummyUser.username },
        });
        fireEvent.click(submitButtonElement);

        // // expect status code 200
        // await expect(fetch('http://localhost:3000/api/register', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(dummyUser),
        // })).resolves.toEqual({ status: 200 });

        expect(screen.getByText('Login')).toBeInTheDocument();
    });
});
