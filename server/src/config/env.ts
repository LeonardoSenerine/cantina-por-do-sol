// Variáveis de ambiente lidas na subida da API. Valores padrão servem para rodar local;
// em produção, defina todas no .env (veja .env.example).

export interface Env {
  PORT: number;
  CORS_ORIGIN: string[];
  DATABASE_PATH: string;
  ADMIN_API_KEY: string;
  WHATSAPP: string;
  TIMEZONE: string;
}

export function validateEnv(raw: Record<string, unknown>): Env {
  const str = (key: string, fallback?: string) => {
    const value = raw[key];
    if (typeof value === 'string' && value.trim() !== '') return value.trim();
    if (fallback !== undefined) return fallback;
    throw new Error(`Variável de ambiente ${key} não definida`);
  };

  const port = Number(str('PORT', '3000'));
  if (!Number.isInteger(port) || port <= 0) throw new Error('PORT inválida');

  const adminKey = str('ADMIN_API_KEY');
  if (adminKey.length < 16)
    throw new Error('ADMIN_API_KEY precisa ter pelo menos 16 caracteres');

  return {
    PORT: port,
    CORS_ORIGIN: str('CORS_ORIGIN', 'http://localhost:5173')
      .split(',')
      .map((o) => o.trim())
      .filter(Boolean),
    DATABASE_PATH: str('DATABASE_PATH', 'data/cantina.sqlite'),
    ADMIN_API_KEY: adminKey,
    WHATSAPP: str('WHATSAPP', '5549988637476'),
    TIMEZONE: str('TIMEZONE', 'America/Sao_Paulo'),
  };
}
