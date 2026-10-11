import { llms, loader } from 'fumadocs-core/source';
import { lucideIconsPlugin } from 'fumadocs-core/source/lucide-icons';
import { metaSchema, pageSchema } from 'fumadocs-core/source/schema';
import { applyMdxPreset } from 'fumadocs-mdx/config';
import { defineDocs } from 'fumadocs-mdx/macro';
import { remarkNbsp } from './remark-nbsp';
import { docsRoute } from './shared';

const docs = defineDocs({
    dir: 'content/docs',
    docs: {
        schema: pageSchema,
        // Неразрывные пробелы расставляются при сборке, а не в исходниках: в MDX их не видно и правки их теряют.
        mdxOptions: applyMdxPreset({
            remarkPlugins: (plugins) => [...plugins, remarkNbsp],
        }),
        postprocess: {
            includeProcessedMarkdown: true,
        },
    },
    meta: {
        schema: metaSchema,
    },
});

// See https://fumadocs.dev/docs/headless/source-api for more info
export const source = loader({
    baseUrl: docsRoute,
    source: docs.toFumadocsSource(),
    plugins: [lucideIconsPlugin()],
});

export const docsLlms = llms(source, {
    renderPage: async (page) => `# ${page.data.title} (${page.url})

${await page.data.getText('processed')}`,
});
