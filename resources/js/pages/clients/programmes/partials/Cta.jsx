import React from 'react';

const Cta = ({ onLoading, onFilteredProgrammes }) => {
    return (
        <>
            {!onLoading && onFilteredProgrammes.length > 0 && (
                <div className="bg-gradient-to-br from-alpha via-[#6b1d77] to-beta mt-12 sm:mt-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
                        <div className="text-center space-y-6">
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-light">
                                Participez à nos programmes
                            </h2>
                            <p className="text-light/90 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
                                Rejoignez-nous et contribuez à construire une société plus juste et égalitaire pour tous
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                                <button className="w-full sm:w-auto bg-light text-alpha px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-bold text-base sm:text-lg hover:bg-light_gray transition-all duration-300 hover:shadow-2xl active:scale-95">
                                    Nous contacter
                                </button>
                                <button className="w-full sm:w-auto bg-transparent border-2 border-light text-light px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-bold text-base sm:text-lg hover:bg-light hover:text-alpha transition-all duration-300 active:scale-95">
                                    En savoir plus
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Cta;