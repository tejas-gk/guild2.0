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

    React.useEffect(() => {
        const getGuild = async () => {
            try {
                const response = await axios.get('/api/guild');
                setGuild(response.data);
                console.log(guild);
            } catch (error) {
                console.log('error', error);
            }
        };
        getGuild();
    }, []);

    return (
        <div>
            <input
                value={guildName || ''}
                onChange={(e) => setGuildName(e.target.value)}
                type='text'
                placeholder='Guild Name'
            />
            <button onClick={handleCreateGuild}>Create Guild</button>

            <div>
                {guild.map((guild) => (
                    <div key={guild.id}>
                        <Link href={`/guild/${guild.id}`}>{guild.name}</Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
