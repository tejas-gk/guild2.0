import React, { useState, useCallback } from 'react';
import { useLoginModal } from '@/hooks/useLoginModal';
import { useRegisterModal } from '@/hooks/useRegisterModal';
import Modal from '../Modal';
import Input from '../Input';
import { Toaster, toast } from 'react-hot-toast';
import axios from 'axios';
import { signIn } from 'next-auth/react';
export default function LoginModal() {
    const loginModal = useLoginModal();
    const registerModal = useRegisterModal();

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await axios.post('/api/register', {
                email,
                name,
                username,
                password,
            });

            toast.success('Successfully registered');
            signIn('credentials', {
                email,
                password,
            });
            console.log('Successfully registered');
            registerModal.onClose();
        } catch (error) {
            toast.error('Something went wrong');
            console.log(error);
        }
        setIsLoading(false);
    }, [registerModal, email, name, username, password]);

    const bodyContent = (
        <div
            className='
        flex 
        flex-col
        gap-4
        '
        >
            <Input
                placeholder='Name'
                type='text'
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setName(e.target.value)
                }
                value={name}
                disabled={isLoading}
                label='Name'
            />
            <Input
                placeholder='Username'
                type='text'
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setUsername(e.target.value)
                }
                value={username}
                disabled={isLoading}
                label='Username'
            />
            <Input
                placeholder='Email'
                type='email'
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setEmail(e.target.value)
                }
                value={email}
                disabled={isLoading}
                label='Email'
            />
            <Input
                placeholder='Password'
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
        text-neutral-500
        text-center
        mt-4
        '
        >
            Already have an account?{' '}
            <span
                className='
                text-primary-500
                cursor-pointer
                '
                onClick={() => {
                    // todo make a separate function for this
                    registerModal.onClose();
                    loginModal.onOpen();
                }}
            >
                Login
            </span>
        </div>
    );

    return (
        <Modal
            disabled={isLoading}
            title='Create Account'
            isOpen={registerModal.isOpen}
            onClose={registerModal.onClose}
            onSubmit={onSubmit}
            body={bodyContent}
            actionLabel='Create'
            footer={footerContent}
        />
    );
}
