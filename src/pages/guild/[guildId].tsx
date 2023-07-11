import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function GuildPage() {
    const router = useRouter();
    const { guildId } = router.query;
    const [guildData, setGuildData] = useState(null);

    useEffect(() => {
        const fetchGuildData = async () => {
            try {
                const response = await axios.get(`/api/guild/${guildId}`);
                setGuildData(response.data);
                console.log(guildData, response.data);
            } catch (error) {
                console.log('Error fetching guild data:', error);
            }
        };

        if (guildId) {
            fetchGuildData();
        }
    }, [guildId]);

    return (
        <div>
            <div>
                <h1>Guild ID: {guildId}</h1>
                {/* <h2>Guild Name: {guildData.name}</h2>
                    <h2>Guild Leader: {guildData.userId}</h2> */}
            </div>
        </div>
    );
}
