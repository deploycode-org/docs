// Явный код символа: буквальный U+00A0 в исходнике не отличить от обычного пробела.
const NBSP = String.fromCharCode(0xa0);

// Правила неразрывных пробелов из ru-text (R30, R36, R44, R73). Код и inline-код в mdast — отдельные
// узлы, поэтому их плагин не видит. Заголовки пропускаются: из их текста строятся якоря, и NBSP
// изменил бы адреса вида `#сеть-и-порты`.
const rules: [RegExp, string][] = [
    // Пробел перед тире: тире не должно начинать строку.
    [/ —/g, `${NBSP}—`],
    // Однобуквенные предлоги и союзы не остаются в конце строки.
    [/(^|[\s(«„])([вкосуиаяВКОСУИАЯ]) /g, `$1$2${NBSP}`],
    // Число не отрывается от следующего слова или единицы: «40 ГБ», «10 минут».
    [/(\d) (?=[A-Za-zА-Яа-яЁё₽%])/g, `$1${NBSP}`],
    // Сокращения «т. д.», «т. п.», «т. е.».
    [/(^|[\s(])т\. ([дпе])\./g, `$1т.${NBSP}$2.`],
];

const typograph = (value: string) =>
    rules.reduce((text, [pattern, replacement]) => text.replace(pattern, replacement), value);

// Минимальная форма узла mdast: полный тип из `@types/mdast` ради этого не нужен.
type MdastNode = { type: string; value?: string; children?: MdastNode[] };

const walk = (node: MdastNode) => {
    if (node.type === 'heading') return;
    if (node.type === 'text' && node.value !== undefined) {
        node.value = typograph(node.value);
        return;
    }
    for (const child of node.children ?? []) walk(child);
};

export function remarkNbsp() {
    return (tree: MdastNode) => walk(tree);
}
