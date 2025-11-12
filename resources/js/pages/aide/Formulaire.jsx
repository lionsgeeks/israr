import AppLayout from '@/layouts/app-layout';
import { Form, Head, usePage } from '@inertiajs/react';
import TransText from '@components/TransText';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ShieldCheck, LoaderCircle } from 'lucide-react';
import { useState } from 'react';

export default function Formulaire() {
    const { flash } = usePage().props;
    const [contactMethod, setContactMethod] = useState('email');

    const regions = [
        { value: 'casablanca', fr: 'Casablanca', ar: 'الدار البيضاء' },
        { value: 'rabat', fr: 'Rabat', ar: 'الرباط' },
        { value: 'fes', fr: 'Fès', ar: 'فاس' },
        { value: 'marrakech', fr: 'Marrakech', ar: 'مراكش' },
        { value: 'tanger', fr: 'Tanger', ar: 'طنجة' },
        { value: 'agadir', fr: 'Agadir', ar: 'أكادير' },
        { value: 'autre', fr: 'Autre', ar: 'أخرى' },
    ];

    const typesOfViolence = [
        { value: 'physique', fr: 'Violence physique', ar: 'عنف جسدي' },
        { value: 'psychologique', fr: 'Violence psychologique', ar: 'عنف نفسي' },
        { value: 'economique', fr: 'Violence économique', ar: 'عنف اقتصادي' },
        { value: 'sexuelle', fr: 'Violence sexuelle', ar: 'عنف جنسي' },
        { value: 'administrative', fr: 'Violence administrative', ar: 'عنف إداري' },
        { value: 'autre', fr: 'Autre', ar: 'أخرى' },
    ];

    return (
        <AppLayout>
            <Head title="Formulaire d'aide" />
            <div className="mx-auto max-w-3xl px-4 py-12">
                <Card className="border-2">
                    <CardHeader className="space-y-2">
                        <div className="flex items-center gap-2">
                            <ShieldCheck className="h-6 w-6 text-[var(--color-beta)]" />
                            <CardTitle className="text-2xl">
                                <TransText
                                    fr="Formulaire de demande d'aide"
                                    ar="نموذج طلب المساعدة"
                                    en="Help Request Form"
                                />
                            </CardTitle>
                        </div>
                        <CardDescription>
                            <TransText
                                fr="Votre demande est strictement confidentielle. Toutes les informations seront cryptées et protégées."
                                ar="طلبك سري للغاية. سيتم تشفير جميع المعلومات وحمايتها."
                                en="Your request is strictly confidential. All information will be encrypted and protected."
                            />
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {flash?.success && (
                            <Alert className="mb-6 border-green-500 bg-green-50 dark:bg-green-950">
                                <AlertDescription className="text-green-800 dark:text-green-200">
                                    {flash.success}
                                </AlertDescription>
                            </Alert>
                        )}

                        <Form
                            method="post"
                            action="/aide/formulaire"
                            className="space-y-6"
                        >
                            {({ processing, errors }) => (
                                <>
                                    <div className="grid gap-2">
                                        <Label htmlFor="name">
                                            <TransText fr="Nom complet" ar="الاسم الكامل" en="Full name" />
                                        </Label>
                                        <Input
                                            id="name"
                                            name="name"
                                            required
                                            placeholder="Votre nom"
                                            className={errors.name ? 'border-red-500' : ''}
                                        />
                                        <InputError message={errors.name} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="region">
                                            <TransText fr="Région" ar="المنطقة" en="Region" />
                                        </Label>
                                        <Select name="region" required>
                                            <SelectTrigger className={errors.region ? 'border-red-500' : ''}>
                                                <SelectValue placeholder="Sélectionnez votre région" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {regions.map((region) => (
                                                    <SelectItem key={region.value} value={region.value}>
                                                        <TransText fr={region.fr} ar={region.ar} en={region.fr} />
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <InputError message={errors.region} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="type_of_violence">
                                            <TransText fr="Type de violence" ar="نوع العنف" en="Type of violence" />
                                        </Label>
                                        <Select name="type_of_violence" required>
                                            <SelectTrigger className={errors.type_of_violence ? 'border-red-500' : ''}>
                                                <SelectValue placeholder="Sélectionnez le type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {typesOfViolence.map((type) => (
                                                    <SelectItem key={type.value} value={type.value}>
                                                        <TransText fr={type.fr} ar={type.ar} en={type.fr} />
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <InputError message={errors.type_of_violence} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="description">
                                            <TransText
                                                fr="Description de la situation"
                                                ar="وصف الوضع"
                                                en="Description of the situation"
                                            />
                                        </Label>
                                        <Textarea
                                            id="description"
                                            name="description"
                                            required
                                            rows={6}
                                            placeholder="Décrivez votre situation..."
                                            className={errors.description ? 'border-red-500' : ''}
                                        />
                                        <InputError message={errors.description} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="contact_method">
                                            <TransText
                                                fr="Méthode de contact préférée"
                                                ar="طريقة الاتصال المفضلة"
                                                en="Preferred contact method"
                                            />
                                        </Label>
                                        <Select
                                            name="contact_method"
                                            required
                                            value={contactMethod}
                                            onValueChange={setContactMethod}
                                        >
                                            <SelectTrigger className={errors.contact_method ? 'border-red-500' : ''}>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="email">
                                                    <TransText fr="Email" ar="البريد الإلكتروني" en="Email" />
                                                </SelectItem>
                                                <SelectItem value="phone">
                                                    <TransText fr="Téléphone" ar="الهاتف" en="Phone" />
                                                </SelectItem>
                                                <SelectItem value="other">
                                                    <TransText fr="Autre" ar="أخرى" en="Other" />
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <InputError message={errors.contact_method} />
                                    </div>

                                    {(contactMethod === 'email' || contactMethod === 'phone') && (
                                        <div className="grid gap-2">
                                            <Label htmlFor="contact_value">
                                                {contactMethod === 'email' ? (
                                                    <TransText fr="Email" ar="البريد الإلكتروني" en="Email" />
                                                ) : (
                                                    <TransText fr="Téléphone" ar="الهاتف" en="Phone" />
                                                )}
                                            </Label>
                                            <Input
                                                id="contact_value"
                                                name="contact_value"
                                                type={contactMethod === 'email' ? 'email' : 'tel'}
                                                required
                                                placeholder={
                                                    contactMethod === 'email'
                                                        ? 'votre@email.com'
                                                        : '+212 6XX XXX XXX'
                                                }
                                                className={errors.contact_value ? 'border-red-500' : ''}
                                            />
                                            <InputError message={errors.contact_value} />
                                        </div>
                                    )}

                                    <div className="flex items-start gap-2">
                                        <Checkbox
                                            id="consent_given"
                                            name="consent_given"
                                            required
                                            className={errors.consent_given ? 'border-red-500' : ''}
                                        />
                                        <Label htmlFor="consent_given" className="text-sm font-normal leading-relaxed">
                                            <TransText
                                                fr="J'accepte que mes informations soient utilisées de manière confidentielle pour me contacter et m'accompagner."
                                                ar="أوافق على استخدام معلوماتي بشكل سري للاتصال بي ومرافقتي."
                                                en="I accept that my information will be used confidentially to contact and support me."
                                            />
                                        </Label>
                                    </div>
                                    <InputError message={errors.consent_given} />

                                    <Button type="submit" className="w-full" disabled={processing}>
                                        {processing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                                        <TransText
                                            fr="Envoyer la demande"
                                            ar="إرسال الطلب"
                                            en="Submit request"
                                        />
                                    </Button>
                                </>
                            )}
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}

