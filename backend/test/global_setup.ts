import { PostgreSqlContainer } from '@testcontainers/postgresql';
import fs from 'fs';
import path from 'path';

export default async function globalSetup() {
  const container = await new PostgreSqlContainer('postgres:16-alpine')
    .withTmpFs({ '/var/lib/postgresql/data': 'rw' })
    .start();

  const url = container.getConnectionUri();
  const outPath = path.resolve(__dirname, '.pg-test-url');
  fs.writeFileSync(outPath, url, 'utf-8');

  (globalThis as any).__PG_CONTAINER__ = container;
}
