import { useState } from 'react';
import { SceletonAvatar } from "../SceletonAvatar/SceletonAvatar.tsx";

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
            style={{
                position: 'relative',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '48px',
                height: '48px'
            }}
        >
            <SceletonAvatar src={thumbnail} alt="user thumbnail" />

            {hovered && (
                <div className="tooltip-popup" style={{
                    position: 'absolute',
                    zIndex: 999,
                    top: '50%',
                    left: '100%',
                    marginLeft: '15px',
                    transform: 'translateY(-50%)',
                    backgroundColor: 'white',
                    padding: '8px',
                    borderRadius: '50%',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                    pointerEvents: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <SceletonAvatar src={large} alt="large view" size={150} />
                </div>
            )}
        </div>
    );
};