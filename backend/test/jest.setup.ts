import fs from 'fs';
import path from 'path';

process.env.NODE_ENV = 'test';

const urlPath = path.resolve(__dirname, '.pg-test-url');
process.env.TEST_DB_URL = fs.readFileSync(urlPath, 'utf-8').trim();
