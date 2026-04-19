import { defineConfig } from '@prisma/config'
import fs from 'fs'
import path from 'path'

let dbUrl = process.env.DATABASE_URL || "";
let directUrl = process.env.DIRECT_URL || "";

try {
  const envFile = fs.readFileSync(path.resolve(process.cwd(), '.env'), 'utf-8');
  const dbUrlMatch = envFile.match(/^DATABASE_URL="(.*)"/m);
  if (dbUrlMatch) dbUrl = dbUrlMatch[1];
  
  const directUrlMatch = envFile.match(/^DIRECT_URL="(.*)"/m);
  if (directUrlMatch) directUrl = directUrlMatch[1];
} catch (e) {
  // Ignore
}

export default defineConfig({
  datasource: {
    url: directUrl || dbUrl,
  }
})
