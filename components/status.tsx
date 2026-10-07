import { Callout } from 'fumadocs-ui/components/callout';

const variants = {
    'in-progress': {
        type: 'warn',
        title: 'В разработке',
        text: 'Функция ещё дорабатывается: поведение и интерфейс могут измениться.',
    },
    'api-only': {
        type: 'info',
        title: 'Пока только через API',
        text: 'Бэкенд готов, но в панели управления этой функции ещё нет.',
    },
    roadmap: {
        type: 'idea',
        title: 'В планах',
        text: 'Функция запланирована, но ещё не реализована.',
    },
} as const;

/** Плашка со статусом готовности функции. */
export function Status({ value }: { value: keyof typeof variants }) {
    const { type, title, text } = variants[value];

    return (
        <Callout type={type} title={title}>
            {text}
        </Callout>
    );
}
