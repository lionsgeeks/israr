import { useEffect, useState } from 'react';

type Lang = 'ar' | 'fr';

function readLang(): Lang {
    if (typeof window === 'undefined') return 'fr';
    const saved = window.localStorage.getItem('lang');
    return saved === 'ar' || saved === 'fr' ? saved : 'fr';
}

function writeLang(lang: Lang) {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem('lang', lang);
    window.dispatchEvent(new Event('language:change'));
    window.dispatchEvent(new StorageEvent('storage', { key: 'lang', newValue: lang }));
    // Set global document direction so content aligns correctly
    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
}

export default function LanguageSwitch() {
    const [lang, setLang] = useState<Lang>(readLang());

    useEffect(() => {
        const current = readLang();
        setLang(current);
        // Ensure direction is correct on mount
        if (typeof document !== 'undefined') {
            document.documentElement.setAttribute('dir', current === 'ar' ? 'rtl' : 'ltr');
        }
    }, []);

    const setLanguage = (l: Lang) => {
        setLang(l);
        writeLang(l);
    };

    return (
        <div className="inline-flex items-center rounded-md bg-white/10 p-0.5 text-[var(--color-light)] backdrop-blur-sm dark:bg-white/10">
            <button
                type="button"
                onClick={() => setLanguage('fr')}
                className={`px-2 py-1 text-xs font-medium transition-colors ${lang === 'fr' ? 'bg-white text-[var(--color-alpha)] dark:bg-white dark:text-[var(--color-alpha)] rounded-sm' : 'text-[var(--color-light)]/80 hover:text-[var(--color-light)]'}`}
            >
                FR
            </button>
            <button
                type="button"
                onClick={() => setLanguage('ar')}
                className={`px-2 py-1 text-xs font-medium transition-colors ${lang === 'ar' ? 'bg-white text-[var(--color-alpha)] dark:bg-white dark:text-[var(--color-alpha)] rounded-sm' : 'text-[var(--color-light)]/80 hover:text-[var(--color-light)]'}`}
            >
                AR
            </button>
        </div>
    );
}


