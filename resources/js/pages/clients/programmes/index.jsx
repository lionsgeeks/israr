import React, { useEffect, useState } from "react";
import AppLayout from '@/layouts/app-layout';
import Hero from "./partials/Hero";
import Filters from "./partials/Filters";
import Main from "./partials/Main";
import Cta from "./partials/Cta";

// Example data with working images
const mockProgrammes = [
    {
        id: 1,
        title_fr: "Programme SaMMa",
        summary_fr:
            "Projet régional pour la lutte contre les violences basées sur le genre et la promotion des droits des femmes.",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=400&fit=crop",
        status: "Actif",
    },
    {
        id: 2,
        title_fr: "Programme Égalité & Inclusion",
        summary_fr:
            "Renforcement des capacités des associations locales pour la promotion de l'égalité et l'inclusion sociale.",
        image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&h=400&fit=crop",
        status: "Terminé",
    },
    {
        id: 3,
        title_fr: "Programme Leadership Féminin",
        summary_fr:
            "Encourager la participation des femmes aux instances décisionnelles et renforcer leur leadership.",
        image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&h=400&fit=crop",
        status: "En cours",
    },
    {
        id: 4,
        title_fr: "Programme Autonomisation Économique",
        summary_fr:
            "Soutenir l'entrepreneuriat féminin et l'accès aux ressources économiques pour les femmes.",
        image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=600&h=400&fit=crop",
        status: "Actif",
    },
    {
        id: 5,
        title_fr: "Programme Éducation & Sensibilisation",
        summary_fr:
            "Programmes éducatifs pour sensibiliser sur les droits et l'égalité des genres dans la société.",
        image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=600&h=400&fit=crop",
        status: "En cours",
    },
    {
        id: 6,
        title_fr: "Programme Santé & Bien-être",
        summary_fr:
            "Initiatives pour améliorer l'accès aux soins de santé et promouvoir le bien-être des femmes.",
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop",
        status: "Actif",
    },
];

const Programmes = () => {
    const [programmes, setProgrammes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("Tous");

    useEffect(() => {
        setTimeout(() => {
            setProgrammes(mockProgrammes);
            setLoading(false);
        }, 800);
    }, []);

    const filters = ["Tous", "Actif", "En cours", "Terminé"];

    const filteredProgrammes = filter === "Tous"
        ? programmes
        : programmes.filter(p => p.status === filter);

    return (
        <AppLayout>
            <div className="min-h-screen w-full bg-light_gray">
                {/* Hero Section */}
                <Hero />

                {/* Filters Bar */}
                <Filters onFilterChange={setFilter} onFilters={filters} />

                {/* Main Content */}
                <Main onLoading={loading} onFilteredProgrammes={filteredProgrammes} onProgramme={programmes} />

                {/* CTA Section */}
                <Cta onLoading={loading} onFilteredProgrammes={filteredProgrammes} />
            </div>
        </AppLayout>
    );
};

export default Programmes;