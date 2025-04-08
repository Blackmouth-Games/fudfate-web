import React from 'react';

const GlitchLogo = ({ imageUrl }) => {
    return (
        <div className="glitch-logo">
            <img 
                src={imageUrl} 
                alt="FUDfate Logo" 
                className="h-32 md:h-40 mx-auto mb-8 glitch" 
            />
        </div>
    );
};

export default GlitchLogo;
