import { useState } from 'react';

interface Props {
    thumbnail: string;
    large: string;
}

export const TooltipImage = ({ thumbnail, large }: Props) => {
    const [hovered, setHovered] = useState(false);

    return (
        <div
            className="tooltip-container"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <img src={thumbnail} alt="user" className="tooltip-thumbnail" />

            {hovered && (
                <div className="tooltip-image">
                    <img src={large} alt="large" width={150} />
                </div>
            )}
        </div>
    );
};