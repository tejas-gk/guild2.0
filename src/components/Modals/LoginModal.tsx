import React, { useState, useCallback } from 'react';
import { useRegisterModal } from '@/hooks/useModal';
import { useLoginModal } from '@/hooks/useModal';
import Modal from '../Modal';
import axios from 'axios';
import Input from '../Input';
import { toast } from 'react-hot-toast';
import { signIn } from 'next-auth/react';
export default function LoginModal() {
    const loginModal = useLoginModal();
    const registerModal = useRegisterModal();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = useCallback(async () => {
        setIsLoading(true);
        try {
            const { data } = await axios.post('/api/auth/login', {
                email,
                password,
            });
            toast.success('Successfully logged in');
            signIn('credentials', { email, password, callbackUrl: '/' });
            loginModal.onClose();
        } catch (error) {
            toast.error('Something went wrong');
            console.log(error);
        }
        setIsLoading(false);
    }, [loginModal, email, password]);

    const bodyContent = (
        <div
            className='
        flex 
        flex-col
        gap-4
        '
        >
            <Input
                type='email'
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setEmail(e.target.value)
                }
                value={email}
                disabled={isLoading}
                label='Email'
            />
            <Input
                type='password'
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setPassword(e.target.value)
                }
                value={password}
                disabled={isLoading}
                label='Password'
            />
        </div>
    );

    const footerContent = (
        <div
            className='
        flex
        justify-center
        gap-4
        '
        >
            <p>Don&apos;t have an account? </p>
            <button
                className='
            text-primary-500
            hover:text-primary-600
            transition
            '
                onClick={() => {
                    loginModal.onClose();
                    registerModal.onOpen();
                }}
            >
                Register
            </button>
        </div>
    );
    return (
        <Modal
            disabled={isLoading}
            title='Login'
            isOpen={loginModal.isOpen}
            onClose={loginModal.onClose}
            onSubmit={onSubmit}
            body={bodyContent}
            actionLabel='Login'
            footer={footerContent}
        />
    );
}
