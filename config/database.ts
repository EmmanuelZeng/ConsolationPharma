import app from '@adonisjs/core/services/app'
import env from '#start/env'
import { defineConfig } from '@adonisjs/lucid'

function mysqlUser() {
  return env.get('DB_USER') ?? env.get('DB_USERNAME')
}

function mysqlSslEnabled() {
  const explicit = env.get('DB_SSL')
  if (explicit !== undefined) {
    return explicit
  }

  const host = env.get('DB_HOST') ?? ''
  return host.includes('tidbcloud.com')
}

function mysqlSslOptions() {
  if (!mysqlSslEnabled()) {
    return undefined
  }

  return {
    minVersion: 'TLSv1.2' as const,
    rejectUnauthorized: true,
  }
}

const dbConfig = defineConfig({
  connection: env.get('DB_CONNECTION'),

  connections: {
    sqlite: {
      client: 'better-sqlite3',
      connection: {
        filename: app.tmpPath('db.sqlite3'),
      },
      useNullAsDefault: true,
      migrations: {
        naturalSort: true,
        paths: ['database/migrations'],
      },
      schemaGeneration: {
        enabled: true,
        rulesPaths: ['./database/schema_rules.js'],
      },
    },

    mysql: {
      client: 'mysql2',
      connection: {
        host: env.get('DB_HOST'),
        port: env.get('DB_PORT'),
        user: mysqlUser(),
        password: env.get('DB_PASSWORD', ''),
        database: env.get('DB_DATABASE'),
        ssl: mysqlSslOptions(),
      },
      migrations: {
        naturalSort: true,
        paths: ['database/migrations'],
      },
      schemaGeneration: {
        enabled: true,
        rulesPaths: ['./database/schema_rules.js'],
      },
      debug: app.inDev,
    },
  },
})

export default dbConfig
