import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
    reactStrictMode: true,
    // Сборка идёт на сервере с 2 ГБ памяти, рядом с работающими сервисами. Turbopack на этом
    // проекте требует больше, поэтому `build` запускается с `--webpack`, а здесь ограничен
    // пик: один воркер вместо «число CPU − 1» и экономный режим webpack.
    experimental: {
        cpus: 1,
        webpackMemoryOptimizations: true,
    },
};

export default withMDX(config);
