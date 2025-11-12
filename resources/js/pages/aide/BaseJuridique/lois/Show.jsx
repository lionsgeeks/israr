import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import TransText from '@components/TransText';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileText, Calendar, ArrowLeft, Download } from 'lucide-react';

export default function LoiShow({ loi }) {
    return (
        <AppLayout>
            <Head title={loi.title_fr} />
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
                                <CardTitle className="text-3xl mb-2">{loi.title_fr}</CardTitle>
                                {loi.title_ar && (
                                    <CardDescription className="text-lg">{loi.title_ar}</CardDescription>
                                )}
                            </div>
                            <Badge variant="secondary">
                                <TransText fr="Loi" ar="قانون" en="Law" />
                            </Badge>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {loi.description_fr && (
                            <div>
                                <p className="text-muted-foreground">{loi.description_fr}</p>
                                {loi.description_ar && (
                                    <p className="text-muted-foreground mt-2" dir="rtl">{loi.description_ar}</p>
                                )}
                            </div>
                        )}

                        <div className="grid gap-4 md:grid-cols-2">
                            {loi.law_number && (
                                <div>
                                    <span className="text-sm font-medium text-muted-foreground">
                                        <TransText fr="Numéro de loi" ar="رقم القانون" en="Law number" />:
                                    </span>
                                    <p className="mt-1">{loi.law_number}</p>
                                </div>
                            )}
                            {loi.publication_date && (
                                <div>
                                    <span className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                                        <Calendar className="h-4 w-4" />
                                        <TransText fr="Date de publication" ar="تاريخ النشر" en="Publication date" />:
                                    </span>
                                    <p className="mt-1">{new Date(loi.publication_date).toLocaleDateString('fr-FR')}</p>
                                </div>
                            )}
                            {loi.effective_date && (
                                <div>
                                    <span className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                                        <Calendar className="h-4 w-4" />
                                        <TransText fr="Date d'entrée en vigueur" ar="تاريخ دخول حيز التنفيذ" en="Effective date" />:
                                    </span>
                                    <p className="mt-1">{new Date(loi.effective_date).toLocaleDateString('fr-FR')}</p>
                                </div>
                            )}
                        </div>

                        {loi.tags && loi.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                {loi.tags.map((tag, idx) => (
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
                            <div className="whitespace-pre-wrap">{loi.content_fr}</div>
                            {loi.content_ar && (
                                <div className="whitespace-pre-wrap mt-4" dir="rtl">{loi.content_ar}</div>
                            )}
                        </div>

                        {loi.pdf_path && (
                            <div>
                                <Button asChild>
                                    <a href={loi.pdf_path} target="_blank" rel="noopener noreferrer">
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

