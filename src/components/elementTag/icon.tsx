import React from 'react';
interface IconProps {
    name: string;
    size?: number;
    color?: string;
    className?: string;
}

export function Icon({name, size, color, className}:IconProps){
    return React.createElement(name, {size, className, color})
}