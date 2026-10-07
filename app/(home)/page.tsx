import { Globe, Hammer, Network, Rocket, Server, Users } from 'lucide-react';
import Link from 'next/link';

const sections = [
    {
        icon: Rocket,
        title: 'Быстрый старт',
        text: 'Первый деплой за несколько минут.',
        href: '/docs/quick-start',
    },
    {
        icon: Network,
        title: 'Организации и проекты',
        text: 'Организация, проекты, окружения и сервисы.',
        href: '/docs/structure',
    },
    {
        icon: Server,
        title: 'Серверы',
        text: 'Подключение и подготовка своих машин.',
        href: '/docs/servers',
    },
    {
        icon: Hammer,
        title: 'Сборка и деплой',
        text: 'Railpack, Dockerfile, переменные, откаты.',
        href: '/docs/deployments',
    },
    {
        icon: Globe,
        title: 'Сеть и домены',
        text: 'Домены, маршруты и TLS-сертификаты.',
        href: '/docs/networking',
    },
    {
        icon: Users,
        title: 'Команда и доступ',
        text: 'Участники, роли и приглашения.',
        href: '/docs/access/members',
    },
];

export default function HomePage() {
    return (
        <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-12 px-4 py-16">
            <div className="flex flex-col gap-4">
                <h1 className="text-4xl font-semibold tracking-tight">Документация DeployCode</h1>
                <p className="max-w-2xl text-lg text-fd-muted-foreground">
                    Деплой из git на ваши собственные серверы: панель управления на нашей стороне,
                    приложения и данные — на вашей.
                </p>
                <div className="flex gap-3">
                    <Link
                        href="/docs/quick-start"
                        className="rounded-lg bg-fd-primary px-4 py-2 text-sm font-medium text-fd-primary-foreground"
                    >
                        Быстрый старт
                    </Link>
                    <Link
                        href="/docs"
                        className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-fd-accent"
                    >
                        Введение
                    </Link>
                </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {sections.map(({ icon: Icon, title, text, href }) => (
                    <Link
                        key={href}
                        href={href}
                        className="flex flex-col gap-2 rounded-xl border bg-fd-card p-5 transition-colors hover:bg-fd-accent"
                    >
                        <Icon className="size-5 text-fd-muted-foreground" />
                        <span className="font-medium">{title}</span>
                        <span className="text-sm text-fd-muted-foreground">{text}</span>
                    </Link>
                ))}
            </div>
        </main>
    );
}
