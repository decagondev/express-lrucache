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

const addToDB = (idKey: string, audio: string, res: Response) :void => {
  console.log("adding to cache");
  db.run('INSERT INTO sounds (idKey, audio) VALUES (?, ?)', [idKey, audio], (err) => {
      if (err) {
          return res.status(500).json({ error: err.message });
      }
      return res.status(200).json({ success: 'Sound added successfully' });
  });
}

const addSound = (req: Request, res: Response) => {
  try {
    const { idKey, audio } = req.body;

   
    if (!idKey || !audio) {
      return res.status(400).json({ error: 'Missing idKey or audio field' });
    }

    addToDB(idKey, audio, res);

  } catch (error) {
    return res.status(500).json({ error });
  }
}

const getSound = (req: Request, res: Response) => {
  const idKey = req.params.idKey;
  try {
      db.get('SELECT * FROM sounds WHERE idKey = ?', [idKey], (err, row) => {
          if (err) {
              return res.status(500).json({error: err.message });
          }
          if (!row) {
              return res.status(404).json({error: "Sound not found" });
          }
          return res.status(200).json(row);
      })
  } catch (error) {
      return res.status(500).json({ error: error });
  }
}



app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});