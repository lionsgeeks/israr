import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import TransText from '@components/TransText';

interface SlideCopy {
    fr: string;
    ar: string;
    en: string;
}

export interface CarouselSlide {
    src: string;
    alt: string;
    caption: SlideCopy;
}

interface ImageCarouselProps {
    slides: CarouselSlide[];
    autoPlay?: boolean;
    interval?: number;
}

export default function ImageCarousel({ slides, autoPlay = true, interval = 6000 }: ImageCarouselProps) {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        if (!autoPlay || slides.length <= 1) {
            return;
        }

        const timer = window.setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, interval);

        return () => window.clearInterval(timer);
    }, [autoPlay, interval, slides.length]);

    if (slides.length === 0) {
        return null;
    }

    const goTo = (index: number) => {
        if (index < 0) {
            index = slides.length - 1;
        } else if (index >= slides.length) {
            index = 0;
        }
        setCurrent(index);
    };

    return (
        <div className="relative h-64 w-full overflow-hidden rounded-2xl shadow-lg md:h-80">
            {slides.map((slide, index) => (
                <div
                    key={slide.src}
                    className={`absolute inset-0 transition-opacity duration-700 ${index === current ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
                >
                    <img src={slide.src} alt={slide.alt} className="h-full w-full object-cover" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                        <p className="text-lg font-semibold md:text-xl">
                            <TransText fr={slide.caption.fr} ar={slide.caption.ar} en={slide.caption.en} />
                        </p>
                    </div>
                </div>
            ))}

            {slides.length > 1 && (
                <>
                    <button
                        type="button"
                        aria-label="Previous slide"
                        onClick={() => goTo(current - 1)}
                        className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition hover:bg-black/70"
                    >
                        <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                        type="button"
                        aria-label="Next slide"
                        onClick={() => goTo(current + 1)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition hover:bg-black/70"
                    >
                        <ChevronRight className="h-5 w-5" />
                    </button>
                    <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
                        {slides.map((_, index) => (
                            <button
                                key={index}
                                type="button"
                                onClick={() => goTo(index)}
                                className={`h-2.5 w-2.5 rounded-full transition ${index === current ? 'bg-white' : 'bg-white/50 hover:bg-white/80'}`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}


