import React, { useState } from 'react';
import Dropdown from '../components/Buttons/Button';

export default {
    title: 'Button',
    component: Dropdown,
};

export const Button = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div>
            <Button/>
        </div>
    );
};