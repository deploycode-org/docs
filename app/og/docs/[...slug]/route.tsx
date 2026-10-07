import { generateOGImage } from 'fumadocs-ui/og';
import { notFound } from 'next/navigation';
import { Logo } from '@/components/logo';
import { appName, getPageImageUrl } from '@/lib/shared';
import { source } from '@/lib/source';

export const revalidate = false;

export async function GET(_req: Request, { params }: RouteContext<'/og/docs/[...slug]'>) {
    const { slug } = await params;
    const page = source.getPage(slug.slice(0, -1));
    if (!page) notFound();

    return generateOGImage({
        title: page.data.title,
        description: page.data.description,
        site: appName,
        icon: <Logo width={40} height={40} color="#fafafa" />,
        primaryColor: 'rgba(250, 250, 250, 0.25)',
        primaryTextColor: '#fafafa',
    });
}

export function generateStaticParams() {
    return source.getPages().map((page) => ({
        lang: page.locale,
        slug: getPageImageUrl(page).segments,
    }));
}
