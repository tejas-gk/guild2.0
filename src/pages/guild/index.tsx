import Button from '@/components/Button';
import axios from 'axios';
import Link from 'next/link';
import React, { useState } from 'react';
import { useToast } from '@/hooks/useToast';
import ImageUpload from '@/components/Input/ImageUpload';
interface Guild {
    id: number;
    name: string;
}

export default function Guild() {
    const [guildName, setGuildName] = useState('');
    const [guild, setGuild] = useState<Guild[]>([]);

    const toast = useToast();

    const handleCreateGuild = async () => {
        try {
            const response = await axios.post('/api/guild', {
                name: guildName,
            });
            toast.success('Successfully created guild');
            console.log(response.data, 'response.data');
        } catch (error) {
            toast.error('Something went wrong');
            console.log('error', error);
        }
    };

    return (
        <div>
            <h1
                className='text-3xl
            font-bold
             px-4 py-2
             border-b-2 border-gray-300
             mb-10
             '
            >
                Time to create a new Guild
            </h1>
            <div
                className='
                flex
                flex-col
                items-center
                px-6
                gap-4
            '
            >
                <div
                    className='
                 w-full
                 flex
                 flex-col
                 gap-4
                '
                >
                    <ImageUpload
                        label='Cover image'
                        disabled={false}
                        onChange={(base64) =>
                            // setCoverImage(base64 as unknown as File)
                            console.log(base64)
                        }
                        variants='profile'
                        // value={coverImage}
                    />
                </div>
                <input
                    value={guildName || ''}
                    onChange={(e) => setGuildName(e.target.value)}
                    type='text'
                    placeholder='Guild Name'
                    className='border-2 border-gray-300 p-2 rounded-lg w-full mt-2'
                />
                <textarea
                    placeholder='Guild Description'
                    className='border-2 border-gray-300 p-2 rounded-lg w-full mt-2'
                />
                <Button onClick={handleCreateGuild}>Create Guild</Button>
            </div>
        </div>
    );
}
