import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostItem from '@/components/Post/PostItem';

export default function Bookmarks() {
    const [bookmarks, setBookmarks] = useState([]);
    //   const {data}

    useEffect(() => {
        fetchBookmarks();
    }, []);

    const fetchBookmarks = async () => {
        try {
            const response = await axios.get('/api/bookmark');
            setBookmarks(response.data);
            console.log(bookmarks);
        } catch (error) {
            console.error('Error fetching bookmarks:', error);
        }
    };

    return (
        <div className='container mx-auto p-4'>
            <h1 className='text-3xl font-bold mb-4'>Bookmarks</h1>
            {bookmarks.length > 0 ? (
                <ul className='space-y-4'>
                    {bookmarks.map((bookmark, i) => (
                        <PostItem key={i} data={bookmark} />
                    ))}
                </ul>
            ) : (
                <p className='text-gray-500'>No bookmarks found.</p>
            )}
        </div>
    );
}
