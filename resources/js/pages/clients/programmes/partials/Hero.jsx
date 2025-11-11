import React from 'react';

const Hero = () => {
    return (
        <>
            <div className="bg-gradient-to-br from-alpha via-[#6b1d77] to-beta text-light">
                <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
                    <div className="text-center space-y-4">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
                            Nos Programmes
                        </h1>
                        <p className="text-base sm:text-lg lg:text-xl text-light/90 max-w-3xl mx-auto leading-relaxed">
                            Découvrez les initiatives de la Coalition ISRAR pour l'égalité,
                            l'empowerment et la promotion des droits
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};
export default Hero;