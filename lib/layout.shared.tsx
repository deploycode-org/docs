import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { Logo } from '@/components/logo';
import { appName, appUrl, gitConfig } from './shared';

export function baseOptions(): BaseLayoutProps {
    return {
        nav: {
            title: (
                <>
                    <Logo className="size-6" />
                    <span className="font-semibold">{appName}</span>
                </>
            ),
        },
        links: [
            { text: 'Документация', url: '/docs', active: 'nested-url' },
            { text: 'Панель управления', url: appUrl, external: true },
        ],
        githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
    };
}
