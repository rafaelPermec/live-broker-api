import fs from 'fs';
import path from 'path';

import { Pool } from 'mysql2/promise';
import connection from '../src/models/connection';

export default async function recreateDatabase(conn: Pool) {
  try {
    const importPath = path.resolve(__dirname, '../src/database/ProcessoSeletivoXP.sql');
    const seedDBContent = fs.readFileSync(importPath).toString();
    const queries = seedDBContent.split(';').filter((p) => p.trim());
    for (let i = 0; i < queries.length; i += 1) {
      const query = queries[i];
      await conn.query(query);
    }
  } catch (error) {
    console.log('Banco Falha em restaurar o Banco', error);
  }
}

if (require.main === module) {
  recreateDatabase(connection)
    .then(async () => {
      console.log('Banco Restaurado com sucesso');
      await connection.end();
      process.exit(0);
    });
}
