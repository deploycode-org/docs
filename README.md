# DeployCode Docs

Документация [DeployCode](https://deploycode.ru) на [Fumadocs](https://fumadocs.dev) (Next.js).

## Разработка

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm build
pnpm lint       # Biome
pnpm types:check
```

## Структура

| Путь | Назначение |
| --- | --- |
| `content/docs` | Страницы документации (MDX) и порядок в сайдбаре (`meta.json`) |
| `app/(home)` | Главная страница |
| `app/docs` | Layout и страница документации |
| `app/api/search` | Поиск (Orama) |
| `app/og` | OG-картинки страниц |
| `app/llms*.txt`, `app/llms.mdx` | Markdown-версии страниц для LLM |
| `lib/source.ts` | Источник контента |
| `lib/layout.shared.tsx` | Навигация и ссылки в шапке |
| `lib/i18n.ts` | Русские строки интерфейса Fumadocs |
| `components/mdx.tsx` | Компоненты, доступные в MDX |

## Как писать страницы

- Термины — по глоссарию в `CONTEXT.md` основного репозитория.
- Статус функции — компонент `<Status value="in-progress" | "api-only" | "roadmap" />`.
- Иконки разделов — имена из [Lucide](https://lucide.dev/icons) в `icon` frontmatter/`meta.json`.
