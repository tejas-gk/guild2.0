import React, { useState, useCallback } from 'react';
import { useLoginModal } from '@/hooks/useModal';
import { useRegisterModal } from '@/hooks/useModal';
import Modal from '../Modal';
import Input from '../Input';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { signIn } from 'next-auth/react';
import { validationRules } from '@/utils/registerRules';

interface FormValues {
    email: string;
    password: string;
    name: string;
    username: string;
}

export default function LoginModal() {
    const loginModal = useLoginModal();
    const registerModal = useRegisterModal();

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const [errors, setErrors] = useState<Partial<FormValues>>({});

    const validateForm = (): Partial<FormValues> => {
        const errors: Partial<FormValues> = {};
        if (!validationRules.required().validator(name)) {
            errors.name = validationRules.required().message;
        }
        if (!validationRules.required().validator(username)) {
            errors.username = validationRules.required().message;
        }
        if (!validationRules.email().validator(email)) {
            errors.email = validationRules.email().message;
        }
        if (!validationRules.required().validator(password)) {
            errors.password = validationRules.required().message;
        }
        return errors;
    };

    const onSubmit = useCallback(async () => {
        setIsLoading(true);
        try {
            await axios.post('/api/register', {
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
            registerModal.onClose();
        } catch (error) {
            toast.error('Something went wrong');
            console.log('error', error);
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
                type='text'
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setName(e.target.value)
                }
                value={name}
                disabled={isLoading}
                label='Name'
            />
            <Input
                type='text'
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setUsername(e.target.value)
                }
                value={username}
                disabled={isLoading}
                label='Username'
            />
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
        <>
            {errors.password && <span>{errors.password}</span>}
            {errors.name && <span>{errors.name}</span>}
            {errors.username && <span>{errors.username}</span>}
            {errors.email && <span>{errors.email}</span>}{' '}
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
        </>
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
