import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import Index from './Index';

jest.mock('axios');

describe('Index', () => {
    test('renders login/register prompt when user is not logged in', () => {
        render(<Index />);

        const loginPrompt = screen.getByText(
            /Please Login or Register to post/i
        );
        expect(loginPrompt).toBeInTheDocument();
    });

    test('submits a post/comment successfully', async () => {
        const mutatePost = jest.fn();
        const mutatePosts = jest.fn();

        axios.post.mockResolvedValueOnce({ data: {} });

        render(<Index postId='post123' />);

        // Mock user authentication
        const currentUser = { id: 'user123' };
        jest.spyOn(React, 'useState').mockImplementation((initialState) => [
            initialState,
            initialState === currentUser ? jest.fn() : () => {},
        ]);

        // Fill the form and submit
        const bodyInput = screen.getByPlaceholderText('Post something...');
        fireEvent.change(bodyInput, { target: { value: 'Test post' } });

        const fileInput = screen.getByLabelText('Upload Image');
        Object.defineProperty(fileInput, 'files', {
            value: [
                new File(['test image'], 'test.png', { type: 'image/png' }),
            ],
        });
        fireEvent.change(fileInput);

        const postButton = screen.getByRole('button', { name: 'Post' });
        fireEvent.click(postButton);

        // Wait for the submission to complete
        await waitFor(() => {
            expect(axios.post).toHaveBeenCalledTimes(1);
            expect(axios.post).toHaveBeenCalledWith('/api/posts', {
                body: 'Test post',
                image: expect.any(String),
            });
            expect(mutatePost).toHaveBeenCalledTimes(1);
            expect(mutatePosts).toHaveBeenCalledTimes(1);
            expect(
                screen.queryByLabelText('Upload Image')
            ).not.toBeInTheDocument();
            expect(
                screen.getByPlaceholderText('Post something...')
            ).toHaveValue('');
        });

        // Verify success toast message
        const successToast = await screen.findByText(
            /Post created successfully/i
        );
        expect(successToast).toBeInTheDocument();
    });
});
