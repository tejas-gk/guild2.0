import React, { useState } from 'react';
import Dropdown from '../components/Dropdown';

export default {
    title: 'Dropdown',
    component: Dropdown,
};

export const Basic = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div>
            <button onClick={() => setIsOpen(!isOpen)}>Toggle Dropdown</button>
            {isOpen && <Dropdown />}
        </div>
    );
};
