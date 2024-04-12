import React from 'react';

const Container = ({children}) => {
    return (
        <div className='max-w-[1240px] mx-auto pt-20'>
            {children}
        </div>
    );
};

export default Container;