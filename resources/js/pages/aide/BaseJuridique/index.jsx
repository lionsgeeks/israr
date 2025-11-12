import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';
import TransText from '@components/TransText';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, FileText, Scale, BookOpen } from 'lucide-react';
import { useState } from 'react';

export default function BaseJuridiqueIndex({ results, filters, tags }) {
    const [searchQuery, setSearchQuery] = useState(filters?.q || '');
    const [typeFilter, setTypeFilter] = useState(filters?.type || 'all');
    const [languageFilter, setLanguageFilter] = useState(filters?.language || 'all');
    const [tagFilter, setTagFilter] = useState(filters?.tag || 'all');

    const handleSearch = () => {
        router.get('/aide/base-juridique', {
            q: searchQuery,
            type: typeFilter,
            language: languageFilter,
            tag: tagFilter && tagFilter !== 'all' ? tagFilter : undefined,
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const renderResults = (items, type, icon) => {
        if (!items || items.data.length === 0) return null;

        return (
            <div className="space-y-4">
                <h3 className="flex items-center gap-2 text-lg font-semibold">
                    {icon}
                    <TransText
                        fr={type === 'lois' ? 'Lois' : type === 'jurisprudences' ? 'Jurisprudences' : 'Guides'}
                        ar={type === 'lois' ? 'القوانين' : type === 'jurisprudences' ? 'الاجتهادات' : 'الدلائل'}
                        en={type === 'lois' ? 'Laws' : type === 'jurisprudences' ? 'Jurisprudence' : 'Guides'}
                    />
                    <Badge variant="secondary">{items.total}</Badge>
                </h3>
                <div className="grid gap-4 md:grid-cols-2">
                    {items.data.map((item) => {
                        const detailUrl = type === 'lois' 
                            ? `/aide/base-juridique/lois/${item.slug}`
                            : type === 'jurisprudences'
                            ? `/aide/base-juridique/jurisprudences/${item.slug}`
                            : `/aide/base-juridique/guides/${item.slug}`;
                        
                        return (
                            <Card key={item.id} className="hover:shadow-lg transition-shadow">
                                <CardHeader>
                                    <CardTitle className="text-lg">
                                        <Link
                                            href={detailUrl}
                                            className="hover:text-[var(--color-beta)]"
                                        >
                                            {item.title_fr}
                                        </Link>
                                    </CardTitle>
                                    {item.description_fr && (
                                        <CardDescription className="line-clamp-2">
                                            {item.description_fr}
                                        </CardDescription>
                                    )}
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-wrap gap-2">
                                        {item.tags && item.tags.map((tag, idx) => (
                                            <Badge key={idx} variant="outline" className="text-xs">
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
                {items.links && items.links.length > 3 && (
                    <div className="flex justify-center gap-2">
                        {items.links.map((link, idx) => (
                            <Button
                                key={idx}
                                variant={link.active ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => link.url && router.get(link.url)}
                                disabled={!link.url}
                            >
                                <span dangerouslySetInnerHTML={{ __html: link.label }} />
                            </Button>
                        ))}
                    </div>
                )}
            </div>
        );
    };

    return (
        <AppLayout>
            <Head title="Base documentaire" />
            <div className="mx-auto max-w-7xl px-4 py-12">
                <div className="mb-8 space-y-4">
                    <h1 className="text-3xl font-bold">
                        <TransText
                            fr="Base documentaire"
                            ar="القاعدة الوثائقية"
                            en="Documentary Base"
                        />
                    </h1>
                    <p className="text-muted-foreground">
                        <TransText
                            fr="Moteur de recherche FR/AR sur lois et guides. Accédez à notre documentation juridique complète pour sensibiliser sur les droits et documenter les lois relatives à la lutte contre les violences faites aux femmes."
                            ar="محرك بحث بالفرنسية والعربية للقوانين والدلائل. الوصول إلى وثائقنا القانونية الشاملة للتوعية بالحقوق وتوثيق القوانين المتعلقة بمحاربة العنف ضد النساء."
                            en="FR/AR search engine for laws and guides. Access our complete legal documentation to raise awareness about rights and document laws related to combating violence against women."
                        />
                    </p>
                </div>

                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle>
                            <TransText fr="Moteur de recherche FR/AR" ar="محرك البحث بالفرنسية والعربية" en="FR/AR Search Engine" />
                        </CardTitle>
                        <CardDescription>
                            <TransText
                                fr="Recherchez dans les lois et guides en français ou en arabe"
                                ar="ابحث في القوانين والدلائل بالفرنسية أو العربية"
                                en="Search laws and guides in French or Arabic"
                            />
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex gap-2">
                                <div className="flex-1">
                                    <Input
                                        placeholder={searchQuery ? undefined : "Rechercher en français ou en arabe..."}
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        onKeyPress={handleKeyPress}
                                        className="w-full"
                                        dir="auto"
                                    />
                                </div>
                                <Button onClick={handleSearch}>
                                    <Search className="h-4 w-4 mr-2" />
                                    <TransText fr="Rechercher" ar="بحث" en="Search" />
                                </Button>
                            </div>

                            <div className="grid gap-4 md:grid-cols-3">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">
                                        <TransText fr="Type" ar="النوع" en="Type" />
                                    </label>
                                    <Select value={typeFilter} onValueChange={setTypeFilter}>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">
                                                <TransText fr="Tous" ar="الكل" en="All" />
                                            </SelectItem>
                                            <SelectItem value="lois">
                                                <TransText fr="Lois" ar="القوانين" en="Laws" />
                                            </SelectItem>
                                            <SelectItem value="jurisprudences">
                                                <TransText fr="Jurisprudences" ar="الاجتهادات" en="Jurisprudence" />
                                            </SelectItem>
                                            <SelectItem value="guides">
                                                <TransText fr="Guides" ar="الدلائل" en="Guides" />
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium">
                                        <TransText fr="Langue" ar="اللغة" en="Language" />
                                    </label>
                                    <Select value={languageFilter} onValueChange={setLanguageFilter}>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">
                                                <TransText fr="Toutes" ar="الكل" en="All" />
                                            </SelectItem>
                                            <SelectItem value="fr">
                                                <TransText fr="Français" ar="الفرنسية" en="French" />
                                            </SelectItem>
                                            <SelectItem value="ar">
                                                <TransText fr="Arabe" ar="العربية" en="Arabic" />
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium">
                                        <TransText fr="Tag" ar="العلامة" en="Tag" />
                                    </label>
                                    <Select value={tagFilter} onValueChange={setTagFilter}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Tous les tags" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">
                                                <TransText fr="Tous" ar="الكل" en="All" />
                                            </SelectItem>
                                            {tags && tags.map((tag) => (
                                                <SelectItem key={tag} value={tag}>
                                                    {tag}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="space-y-8">
                    {renderResults(results?.lois, 'lois', <FileText className="h-5 w-5" />)}
                    {renderResults(results?.jurisprudences, 'jurisprudences', <Scale className="h-5 w-5" />)}
                    {renderResults(results?.guides, 'guides', <BookOpen className="h-5 w-5" />)}
                    
                    {(!results?.lois?.data?.length && !results?.jurisprudences?.data?.length && !results?.guides?.data?.length) && (
                        <Card>
                            <CardContent className="py-12 text-center">
                                <p className="text-muted-foreground">
                                    <TransText
                                        fr="Aucun résultat trouvé"
                                        ar="لم يتم العثور على نتائج"
                                        en="No results found"
                                    />
                                </p>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}

