import { useState } from 'react';

interface SceletonProps {
    src: string;
    alt: string;
    size?: number;
}

export const SceletonAvatar = ({ src, alt, size = 48 }: SceletonProps) => {
    const [isLoaded, setIsLoaded] = useState(false);

    const containerStyle = {
        position: 'relative' as const,
        width: `${size}px`,
        height: `${size}px`,
    };

    return (
        <div style={containerStyle}>
            {!isLoaded && (
                <div className="skeleton-circle" style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    backgroundColor: '#e0e0e0',
                    position: 'absolute',
                    top: 0,
                    left: 0
                }} />
            )}

            <img
                src={src}
                alt={alt}
                onLoad={() => setIsLoaded(true)}
                style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    display: isLoaded ? 'block' : 'none'
                }}
            />
        </div>
    );
};