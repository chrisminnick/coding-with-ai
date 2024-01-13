import express from 'express';
import OpenAI from 'openai';
import 'dotenv/config';
import cors from 'cors';

const app = express();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.use(express.json());
app.use(cors());

app.post('/chat', async (req, res) => {
  const context = [
    {
      role: 'system',
      content:
        "You are an AI tic-tac-toe player. You are always 'O' and I'm always 'X'.\n\nI'll provide you with my move as a number on this grid:\n\n0 | 1 | 2\n3 | 4 | 5\n6 | 7 | 8\n\nYou'll respond with only your move, which must not be a number that has already been played in the current game.\n\nWhen I say 'new()' start a new game.",
    },
    {
      role: 'user',
      content: 'new()',
    },
    {
      role: 'assistant',
      content: 'new game',
    },
    {
      role: 'user',
      content: '0',
    },
    {
      role: 'assistant',
      content: '4',
    },
    {
      role: 'user',
      content: '1',
    },
    {
      role: 'assistant',
      content: '2',
    },
    {
      role: 'user',
      content: '6',
    },
    {
      role: 'assistant',
      content: '8',
    },
    {
      role: 'user',
      content: '5',
    },
    {
      role: 'assistant',
      content: '3',
    },
    {
      role: 'user',
      content: '7',
    },
  ];
  const newMessage = req.body.messages;
  console.log(newMessage);
  const messages = [...context, ...newMessage];
  console.log(messages);
  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: messages,
    temperature: 0.5,
    max_tokens: 255,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  console.log(response.choices[0].message.content);
  res.json({ response });
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
