import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import validateData from './middleware/bodyValidator.js';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';


const app = express();
const PORT = 8400;
const validSecret = 'DEVCREW-BACKEND-TEST';

app.use(cors());
app.use(express.json());
app.use(morgan(":method :url :status :response-time ms - :res[content-length]"));

app.post('/', validateData, (req, res) => {
  if (!req.headers.authorization || (req.headers.authorization !== validSecret)) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ error: "Unauthorized" });
  }

  const { a, b } = req.body;

  return res.json({ result: (a * b) });
})

app.use('*', (req, res) => {
  return res.status(StatusCodes.NOT_FOUND).json({ error: ReasonPhrases.NOT_FOUND })
})

app.listen(PORT, () => {
  console.log(console.log(('App listening on port ' + PORT)));
})

