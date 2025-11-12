import logo from '../../../public/assets/images/logo_white.png';
import { Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import TransText from "@components/TransText";
export default function Footer() {
    const readLang = () => {
        if (typeof window === 'undefined') return 'fr';
        const saved = window.localStorage.getItem('lang');
        return saved === 'ar' ? 'ar' : 'fr';
    };
    const [isArabic, setIsArabic] = useState(readLang() === 'ar');
    useEffect(() => {
        const onChange = () => setIsArabic(readLang() === 'ar');
        window.addEventListener('language:change', onChange);
        window.addEventListener('storage', onChange);
        return () => {
            window.removeEventListener('language:change', onChange);
            window.removeEventListener('storage', onChange);
        };
    }, []);
    return (
        <footer className="border-t border-white/10 bg-alpha text-[var(--color-light)] dark:bg-beta dark:text-white" dir={isArabic ? 'rtl' : 'ltr'}>
            <div className={`mx-auto flex w-full max-w-7xl flex-col gap-4 px-4  md:flex-row md:items-center md:justify-between `}>
                <div className="flex items-center gap-3">
                    <img src={logo} alt="ISRAR" className="h-24 w-auto" />
                </div>
                <span className="text-sm opacity-80">© {new Date().getFullYear()} ISRAR. All rights reserved.</span>
                <nav className={`flex items-center gap-4 text-sm ${isArabic ? 'justify-end' : ''}`}>
                    <Link
                        href="#"
                        className="opacity-80 transition-colors hover:text-[var(--color-beta)]"
                    >
                        <TransText ar="من نحن" fr="À propos" en="About" />
                    </Link>

                    <Link
                        href="#"
                        className="opacity-80 transition-colors hover:text-[var(--color-beta)]"
                    >
                        <TransText ar="اتصل بنا" fr="Contact" en="Contact" />
                    </Link>

                    <Link
                        href="#"
                        className="opacity-80 transition-colors hover:text-[var(--color-beta)]"
                    >
                        <TransText ar="الخصوصية" fr="Confidentialité" en="Privacy" />
                    </Link>
                </nav>
            </div>
        </footer>
    );
}


