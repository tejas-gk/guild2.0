import React, { useState, useCallback } from 'react';
import { useLoginModal } from '@/hooks/useModal';
import { useRegisterModal } from '@/hooks/useModal';
import Modal from '../Modal';
import Input from '../Input';
import axios from 'axios';
import { signIn } from 'next-auth/react';
import { useToast } from '@/hooks/useToast';
import { z, ZodError, ZodIssue } from 'zod';
import { schema } from '@/utils/registerRules';
import { fi } from 'date-fns/locale';

interface FormValues {
    email: string;
    password: string;
    name: string;
    username: string;
}

export default function LoginModal() {
    const loginModal = useLoginModal();
    const registerModal = useRegisterModal();
    const toast = useToast();

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const [errors, setErrors] = useState<Partial<FormValues>>({});

    const onSubmit = useCallback(async () => {
        setIsLoading(true);

        try {
            schema.parse({
                email,
                name,
                username,
                password,
            });

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
            if (error instanceof ZodError) {
                const formattedErrors: Partial<FormValues> = {};
                error.issues.forEach((issue: ZodIssue) => {
                    // @ts-ignore
                    formattedErrors[issue.path[0]] = issue.message;
                });
                setErrors(formattedErrors);
            } else {
                toast.error('Something went wrong');
                console.log('error', error);
            }
        } finally {
            setIsLoading(false);
        }
    }, [registerModal, email, name, username, password, toast]);

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
            {errors?.name && (
                <span
                    className='
                    text-red-400
                    -mt-3 ml-2
                    text-sm'
                >
                    {errors?.name}
                </span>
            )}
            <Input
                type='text'
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setUsername(e.target.value)
                }
                value={username}
                disabled={isLoading}
                label='Username'
            />
            {errors?.username && (
                <span
                    className='
                    text-red-400
                    -mt-3 ml-2
                    text-sm'
                >
                    {errors?.username}
                </span>
            )}
            <Input
                type='email'
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setEmail(e.target.value)
                }
                value={email}
                disabled={isLoading}
                label='Email'
            />
            {errors?.email && (
                <span
                    className='
            text-red-400
            -mt-3 ml-2
            text-sm'
                >
                    {errors?.email}
                </span>
            )}
            <Input
                type='password'
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setPassword(e.target.value)
                }
                value={password}
                disabled={isLoading}
                label='Password'
            />
            {errors?.password && (
                <span
                    className='
                    text-red-400
                    -mt-3 ml-2
                    text-sm'
                >
                    {errors?.password}
                </span>
            )}
        </div>
    );

    const footerContent = (
        <>
            <div
                className='
            text-neutral-500
            text-center
            mt-4
            '
            >
                Already have an account?{' '}
                <span
                    className={`
                text-primary-500
                cursor-pointer
                `}
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
