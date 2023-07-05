import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function GuildPage() {
    const router = useRouter();
    const { id } = router.query;
    const [guildData, setGuildData] = useState(null);

    useEffect(() => {
        const fetchGuildData = async () => {
            try {
                const response = await axios.get(`/api/guild/${id}`);
                setGuildData(response.data);
                console.log(guildData);
            } catch (error) {
                console.log('Error fetching guild data:', error);
            }
        };

        if (id) {
            fetchGuildData();
        }
    }, [id]);

    return (
        <div>
            {guildData ? (
                <div>
                    <h1>Guild ID: {id}</h1>
                    <h2>Guild Name: {guildData.name}</h2>
                    <h2>Guild Leader: {guildData.userId}</h2>
                </div>
            ) : (
                <p>Loading guild data...</p>
            )}
        </div>
    );
}
