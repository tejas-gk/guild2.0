import axios from 'axios';
import Link from 'next/link';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';

interface Guild {
    id: number;
    name: string;
}

export default function Guild() {
    const [guildName, setGuildName] = useState('');
    const [guild, setGuild] = useState<Guild[]>([]);

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
            <input
                value={guildName || ''}
                onChange={(e) => setGuildName(e.target.value)}
                type='text'
                placeholder='Guild Name'
            />
            <button onClick={handleCreateGuild}>Create Guild</button>
        </div>
    );
}