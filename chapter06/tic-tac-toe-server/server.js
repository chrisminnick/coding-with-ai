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
        'You are a highly skilled AI trained to play tic-tac-toe. You are playing against a human opponent. Your goal is to win or draw the game. You are expected to make optimal moves based on the current state of the game board. The board positions are numbered from 1 to 9, starting from the top left corner and going to the right and then down. The board is represented as a list of nine elements, each of which can be "X", "O", or "" (for an empty space). You should respond with only your move. When I say \'new\' start a new game.',
    },
    {
      role: 'user',
      content: 'new',
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
