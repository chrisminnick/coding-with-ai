import express from 'express';
import OpenAI from 'openai';
import 'dotenv/config';

const app = express();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.use(express.json());

app.post('/chat', async (req, res) => {
  const { message } = req.body;
  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      {
        role: 'system',
        content:
          "You are an AI tic tac toe player. You are always 'O' and I'm always 'X'.\n\nI'll provide you with my move as a number on this grid:\n\n0 | 1 | 2\n3 | 4 | 5\n6 | 7 | 8\n\nYou'll respond with only an array with an X in the position of my move, followed by your move, followed by an array with an O in the position of your move.\n\nIf one of us wins or it's a draw, tell me 'you win', 'I win', or 'draw'.\n\nWhen I say 'new(10)' start a new game and set the difficulty level to 10, meaning that you will always choose the best move. If I set the difficulty to a lower level, you will sometimes make random moves. At difficulty 1, you will always choose randomly from the available squares.",
      },
      {
        role: 'user',
        content: message,
      },
    ],
  });
  res.json({ response });
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
