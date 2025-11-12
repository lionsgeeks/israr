import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import TransText from '@components/TransText';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookOpen, ArrowLeft, Download } from 'lucide-react';

export default function GuideShow({ guide }) {
    return (
        <AppLayout>
            <Head title={guide.title_fr} />
            <div className="mx-auto max-w-4xl px-4 py-12">
                <Button variant="ghost" asChild className="mb-6">
                    <Link href="/aide/base-juridique">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        <TransText fr="Retour à la base documentaire" ar="العودة إلى القاعدة الوثائقية" en="Back to documentary base" />
                    </Link>
                </Button>

                <Card>
                    <CardHeader>
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <CardTitle className="text-3xl mb-2">{guide.title_fr}</CardTitle>
                                {guide.title_ar && (
                                    <CardDescription className="text-lg">{guide.title_ar}</CardDescription>
                                )}
                            </div>
                            <Badge variant="secondary">
                                <TransText fr="Guide" ar="دليل" en="Guide" />
                            </Badge>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {guide.description_fr && (
                            <div>
                                <p className="text-muted-foreground">{guide.description_fr}</p>
                                {guide.description_ar && (
                                    <p className="text-muted-foreground mt-2" dir="rtl">{guide.description_ar}</p>
                                )}
                            </div>
                        )}

                        {guide.category && (
                            <div>
                                <span className="text-sm font-medium text-muted-foreground">
                                    <TransText fr="Catégorie" ar="الفئة" en="Category" />:
                                </span>
                                <p className="mt-1">{guide.category}</p>
                            </div>
                        )}

                        {guide.tags && guide.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                {guide.tags.map((tag, idx) => (
                                    <Badge key={idx} variant="outline">
                                        {tag}
                                    </Badge>
                                ))}
                            </div>
                        )}

                        <div className="prose max-w-none dark:prose-invert">
                            <h3>
                                <TransText fr="Contenu" ar="المحتوى" en="Content" />
                            </h3>
                            <div className="whitespace-pre-wrap">{guide.content_fr}</div>
                            {guide.content_ar && (
                                <div className="whitespace-pre-wrap mt-4" dir="rtl">{guide.content_ar}</div>
                            )}
                        </div>

                        {guide.pdf_path && (
                            <div>
                                <Button asChild>
                                    <a href={guide.pdf_path} target="_blank" rel="noopener noreferrer">
                                        <Download className="h-4 w-4 mr-2" />
                                        <TransText fr="Télécharger le PDF" ar="تحميل PDF" en="Download PDF" />
                                    </a>
                                </Button>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}

