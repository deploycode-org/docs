import { RootProvider } from 'fumadocs-ui/provider/next';
import './global.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ru } from '@/lib/i18n';
import { appName } from '@/lib/shared';

const inter = Inter({
    subsets: ['latin', 'cyrillic'],
});

export const metadata: Metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
    title: {
        template: `%s — ${appName}`,
        default: `Документация ${appName}`,
    },
    description: 'Документация DeployCode: деплой из git на ваши собственные серверы.',
    icons: {
        icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }, { url: '/favicon.ico' }],
        apple: '/apple-touch-icon.png',
    },
};

export default function Layout({ children }: LayoutProps<'/'>) {
    return (
        <html lang="ru" className={inter.className} suppressHydrationWarning>
            <body className="flex flex-col min-h-screen">
                <RootProvider i18n={{ locale: 'ru', translations: ru }}>{children}</RootProvider>
            </body>
        </html>
    );
}
