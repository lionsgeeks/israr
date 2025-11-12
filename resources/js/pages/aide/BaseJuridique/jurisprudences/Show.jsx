import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import TransText from '@components/TransText';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Scale, Calendar, ArrowLeft, Download } from 'lucide-react';

export default function JurisprudenceShow({ jurisprudence }) {
    return (
        <AppLayout>
            <Head title={jurisprudence.title_fr} />
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
                                <CardTitle className="text-3xl mb-2">{jurisprudence.title_fr}</CardTitle>
                                {jurisprudence.title_ar && (
                                    <CardDescription className="text-lg">{jurisprudence.title_ar}</CardDescription>
                                )}
                            </div>
                            <Badge variant="secondary">
                                <TransText fr="Jurisprudence" ar="اجتهاد" en="Jurisprudence" />
                            </Badge>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {jurisprudence.description_fr && (
                            <div>
                                <p className="text-muted-foreground">{jurisprudence.description_fr}</p>
                                {jurisprudence.description_ar && (
                                    <p className="text-muted-foreground mt-2" dir="rtl">{jurisprudence.description_ar}</p>
                                )}
                            </div>
                        )}

                        <div className="grid gap-4 md:grid-cols-2">
                            {jurisprudence.court_name && (
                                <div>
                                    <span className="text-sm font-medium text-muted-foreground">
                                        <TransText fr="Tribunal" ar="المحكمة" en="Court" />:
                                    </span>
                                    <p className="mt-1">{jurisprudence.court_name}</p>
                                </div>
                            )}
                            {jurisprudence.case_number && (
                                <div>
                                    <span className="text-sm font-medium text-muted-foreground">
                                        <TransText fr="Numéro de dossier" ar="رقم الملف" en="Case number" />:
                                    </span>
                                    <p className="mt-1">{jurisprudence.case_number}</p>
                                </div>
                            )}
                            {jurisprudence.decision_date && (
                                <div>
                                    <span className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                                        <Calendar className="h-4 w-4" />
                                        <TransText fr="Date de décision" ar="تاريخ القرار" en="Decision date" />:
                                    </span>
                                    <p className="mt-1">{new Date(jurisprudence.decision_date).toLocaleDateString('fr-FR')}</p>
                                </div>
                            )}
                        </div>

                        {jurisprudence.tags && jurisprudence.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                {jurisprudence.tags.map((tag, idx) => (
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
                            <div className="whitespace-pre-wrap">{jurisprudence.content_fr}</div>
                            {jurisprudence.content_ar && (
                                <div className="whitespace-pre-wrap mt-4" dir="rtl">{jurisprudence.content_ar}</div>
                            )}
                        </div>

                        {jurisprudence.pdf_path && (
                            <div>
                                <Button asChild>
                                    <a href={jurisprudence.pdf_path} target="_blank" rel="noopener noreferrer">
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

