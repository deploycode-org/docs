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

## Деплой

Документация разворачивается через сам DeployCode как обычное приложение: Railpack собирает её
без Dockerfile и запускает `next start`.

| Настройка в DeployCode | Значение |
| --- | --- |
| Репозиторий / ветка | `deploycode-org/docs` / `main`, авторазвёртывание включено |
| Путь сборки | `/` |
| Сборка и запуск | Автоматически (Railpack) — переопределять ничего не нужно |
| Домен | `docs.deploycode.ru`, порт контейнера **3000**, HTTPS — Let's Encrypt |
| Переменные | Не нужны. `NEXT_PUBLIC_SITE_URL` — только если адрес не `https://docs.deploycode.ru` |

Railpack берёт Node.js из `engines.node` (сейчас 22) и pnpm из `packageManager` через Corepack, затем
выполняет `pnpm install --frozen-lockfile`, `pnpm run build` и `pnpm run start`. Приложению хватает
~250 МБ памяти; `next build` требует заметно больше, учитывайте это при выборе сервера.

Проверить сборку локально так же, как на сервере (нужны Docker и бинарник Railpack той же версии):

```bash
railpack prepare . --plan-out railpack-plan.json --info-out railpack-info.json
docker buildx build \
  --build-arg BUILDKIT_SYNTAX=ghcr.io/railwayapp/railpack-frontend:v0.35.0 \
  -f railpack-plan.json --output type=docker,name=deploycode-docs .
docker run --rm -p 3000:3000 deploycode-docs
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
