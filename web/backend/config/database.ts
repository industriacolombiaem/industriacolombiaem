import path from 'path';
import type { Core } from '@strapi/strapi';

/**
 * Resolve SSL configuration for PostgreSQL/MySQL.
 *
 * Three modes supported via DATABASE_SSL env var:
 * - "false"        → no SSL
 * - "true"         → SSL with rejectUnauthorized:false (managed DBs like Railway, Neon, Supabase)
 * - "full"         → SSL with client certificates (requires DATABASE_SSL_KEY, _CERT, _CA)
 */
const resolveSsl = (env: Core.Config.Shared.ConfigParams['env']): boolean | object => {
  const sslEnv = env('DATABASE_SSL', 'false').toString().toLowerCase();

  if (sslEnv === 'false') return false;

  if (sslEnv === 'full') {
    // Full client-cert SSL configuration
    return {
      key: env('DATABASE_SSL_KEY', undefined),
      cert: env('DATABASE_SSL_CERT', undefined),
      ca: env('DATABASE_SSL_CA', undefined),
      capath: env('DATABASE_SSL_CAPATH', undefined),
      cipher: env('DATABASE_SSL_CIPHER', undefined),
      rejectUnauthorized: env.bool('DATABASE_SSL_REJECT_UNAUTHORIZED', true),
    };
  }

  // "true" or any other truthy value → simple SSL (managed DBs)
  return { rejectUnauthorized: false };
};

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Database => {
  const client = env('DATABASE_CLIENT', 'sqlite');

  const connections = {
    mysql: {
      connection: {
        host: env('DATABASE_HOST', 'localhost'),
        port: env.int('DATABASE_PORT', 3306),
        database: env('DATABASE_NAME', 'strapi'),
        user: env('DATABASE_USERNAME', 'strapi'),
        password: env('DATABASE_PASSWORD', 'strapi'),
        ssl: resolveSsl(env),
      },
      pool: { min: env.int('DATABASE_POOL_MIN', 2), max: env.int('DATABASE_POOL_MAX', 10) },
    },
    postgres: {
      connection: {
        connectionString: env('DATABASE_URL', undefined),
        host: env('DATABASE_HOST', 'localhost'),
        port: env.int('DATABASE_PORT', 5432),
        database: env('DATABASE_NAME', 'strapi'),
        user: env('DATABASE_USERNAME', 'strapi'),
        password: env('DATABASE_PASSWORD', 'strapi'),
        ssl: resolveSsl(env),
        schema: env('DATABASE_SCHEMA', 'public'),
      },
      pool: { min: env.int('DATABASE_POOL_MIN', 2), max: env.int('DATABASE_POOL_MAX', 10) },
    },
    sqlite: {
      connection: {
        filename: path.join(__dirname, '..', '..', env('DATABASE_FILENAME', '.tmp/data.db')),
      },
      useNullAsDefault: true,
    },
  };

  return {
    connection: {
      client,
      ...connections[client],
      acquireConnectionTimeout: env.int('DATABASE_CONNECTION_TIMEOUT', 60000),
    },
  };
};

export default config;
