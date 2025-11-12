import { Breadcrumbs } from '@/components/breadcrumbs';
import { Icon } from '@/components/icon';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { NavigationMenu, NavigationMenuItem, NavigationMenuList, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { UserMenuContent } from '@/components/user-menu-content';
import { useInitials } from '@/hooks/use-initials';
import { cn } from '@/lib/utils';
import { dashboard } from '@/routes';
import { type BreadcrumbItem, type NavItem, type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { AlignVerticalJustifyStartIcon, BookOpen, Folder, LayoutGrid, Menu, Search } from 'lucide-react';
import AppLogo from '@/components/app-logo';
import logoPurple from '../../../public/assets/images/logo_purple.png';
import LanguageSwitch from '@/components/language-switch';
import TransText from "@components/TransText";
import { useEffect, useState } from 'react';
const mainNavItems: NavItem[] = [
    {
        title: <TransText ar="الرئيسية" fr="Accueil" en="Home" />,
        href: "/",
        icon: LayoutGrid,
    },
    {
        title: <TransText ar="الرئيسية" fr="Accueil" en="Home" />,
        href: '/programmes',
        icon: null,
    },

];



const activeItemStyles = 'text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100';

interface AppHeaderProps {
    breadcrumbs?: BreadcrumbItem[];
}

export function AppHeader({ breadcrumbs = [] }: AppHeaderProps) {
    const page = usePage<SharedData>();
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
        <>
            <div className="bg-alpha text-[var(--color-light)] dark:bg-beta dark:text-white">
                <div className={`mx-auto flex h-16 items-center px-4 md:max-w-7xl`}>
                    {/* Mobile Menu */}
                    <div className="lg:hidden">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="mr-2 h-[34px] w-[34px] text-[var(--color-light)]">
                                    <Menu className="h-5 w-5" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="flex h-full w-64 flex-col items-stretch justify-between bg-[var(--color-alpha)] text-[var(--color-light)] dark:bg-[var(--color-alpha)] dark:text-white">
                                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                                <SheetHeader className="flex justify-start text-left">
                                    <img src={logoPurple} alt="ISRAR" className="h-6 w-auto" />
                                </SheetHeader>
                                <div className="flex h-full flex-1 flex-col space-y-4 p-4">
                                    <div className="flex h-full flex-col justify-between text-sm">
                                        <div className="flex flex-col space-y-4">
                                            {mainNavItems.map((item) => (
                                                <Link key={item.title} href={item.href} className="flex items-center space-x-2 font-medium hover:text-[var(--color-beta)]">
                                                    {item.icon && <Icon iconNode={item.icon} className="h-5 w-5" />}
                                                    <span> {item.title}</span>
                                                </Link>
                                            ))}
                                        </div>


                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>

                    <Link href="/" prefetch className="flex items-center space-x-2">
                        <AppLogo />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="ml-6 hidden h-full items-center space-x-6 lg:flex">
                        <NavigationMenu className="flex h-full items-stretch">
                            <NavigationMenuList className="flex h-full items-stretch space-x-2">
                                {mainNavItems.map((item, index) => (
                                    <NavigationMenuItem key={index} className="relative flex h-full items-center">
                                        <Link
                                            href={item.href}
                                            className={cn(
                                                navigationMenuTriggerStyle(),
                                                page.url === (typeof item.href === 'string' ? item.href : item.href.url) && activeItemStyles,
                                                'h-9 cursor-pointer px-3 hover:text-[var(--color-beta)] bg-transparent hover:bg-transparent',
                                            )}
                                        >
                                            {item.icon && <Icon iconNode={item.icon} className="mr-2 h-4 w-4" />}
                                            <span> {item.title}</span>
                                        </Link>
                                        {page.url === item.href && (
                                            <div className="absolute bottom-0 left-0 h-0.5 w-full translate-y-px bg-[var(--color-beta)]"></div>
                                        )}
                                    </NavigationMenuItem>
                                ))}
                            </NavigationMenuList>
                        </NavigationMenu>
                    </div>

                    <div className={`${isArabic ? 'mr-auto' : 'ml-auto'} flex items-center gap-3`}>
                        <LanguageSwitch />
                    </div>
                </div>
            </div>
            {breadcrumbs.length > 1 && (
                <div className="flex w-full bg-[var(--color-alpha)] text-[var(--color-light)] dark:bg-[var(--color-alpha)] dark:text-white" dir={isArabic ? 'rtl' : 'ltr'}>
                    <div className="mx-auto flex h-12 w-full items-center justify-start px-4 md:max-w-7xl">
                        <Breadcrumbs breadcrumbs={breadcrumbs} />
                    </div>
                </div>
            )}
        </>
    );
}
