import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostItem from '@/components/Post/PostItem';
import usePosts from '@/hooks/usePosts';

export default function Bookmarks() {
    const [bookmarks, setBookmarks] = useState([]);

    const fetchBookmarks = async () => {
        try {
            const response = await axios.get('/api/bookmark');
            setBookmarks(response.data.bookmarkedPosts);
        } catch (error) {
            console.log(error);
        }
    };
    const { data: postData, isLoading: postLoading } = usePosts(bookmarks);

    useEffect(() => {
        fetchBookmarks();
        console.table(postData);
    }, []);

    return (
        <div className='container mx-auto p-4'>
            <h1 className='text-3xl font-bold mb-4'>Bookmarks</h1>
            {bookmarks.length > 0 ? (
                <ul className='space-y-4'>
                    {bookmarks.map((bookmark, i) => (
                        <PostItem key={i} data={postData} />
                    ))}
                </ul>
            ) : (
                <p className='text-gray-500'>No bookmarks found.</p>
            )}
        </div>
    );
}
