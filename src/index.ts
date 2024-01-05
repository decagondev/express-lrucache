import express, { Express, Request, Response } from 'express';
import sqlite3 from 'sqlite3';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 5555;
app.use(express.json());


const db = new sqlite3.Database('sounds.db');

db.run(`
  CREATE TABLE IF NOT EXISTS sounds (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    idKey TEXT NOT NULL,
    audio TEXT NOT NULL
  )
`);



app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});