import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: { tsconfigPaths: true },
  test: {
    globals: true,
    root: './',
    include: ['**/*.e2e-spec.ts'],
    // o ConfigModule lê o ambiente quando o AppModule é importado, então os valores de teste
    // precisam existir antes disso; variáveis do processo têm prioridade sobre o .env
    env: {
      DATABASE_PATH: ':memory:',
      ADMIN_API_KEY: 'chave-de-teste-com-mais-de-16',
    },
  },
});
