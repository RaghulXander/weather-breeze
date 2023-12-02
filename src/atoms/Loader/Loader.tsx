import React from "react";

export const Loader = () => {
    let circleCommonClasses = 'h-5 w-5 bg-brand-060 rounded-full';

    return (
        <div className='h-full flex items-center justify-center mb-12 mt-5/6 '>
            <div className={`${circleCommonClasses} mr-2 animate-bounce600`}></div>
            <div
                className={`${circleCommonClasses} mr-2 animate-bounce200`}
            ></div>
            <div className={`${circleCommonClasses} animate-bounce400`}></div>
        </div>
    );
};
