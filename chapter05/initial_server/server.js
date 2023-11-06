// This code is for v4 of the openai package: npmjs.com/package/openai
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const response = await openai.chat.completions.create({
  model: 'gpt-4',
  messages: [
    {
      role: 'system',
      content:
        "You are an AI tic-tac-toe player. You are always 'O' and I'm always 'X'.\n\nI'll provide you with my move as a number on this grid:\n\n0 | 1 | 2\n3 | 4 | 5\n6 | 7 | 8\n\nYou'll respond with only an array with an X in the position of my move, followed by your move, followed by an array with an O in the position of your move.\n\nIf one of us wins or it's a draw, tell me 'you win', 'I win', or 'draw'.\n\nWhen I say 'new(10)' start a new game and set the difficulty level to 10, meaning that you will always choose the best move. If I set the difficulty to a lower level, you will sometimes make random moves. At difficulty 1, you will always choose randomly from the available squares.",
    },
    {
      role: 'user',
      content: 'new(10)',
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
      content:
        "['X', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']\nMy move: 4\n['X', ' ', ' ', ' ', 'O', ' ', ' ', ' ', ' ']",
    },
    {
      role: 'user',
      content: '1',
    },
    {
      role: 'assistant',
      content:
        "['X', 'X', ' ', ' ', 'O', ' ', ' ', ' ', ' ']\nMy move: 2\n['X', 'X', 'O', ' ', 'O', ' ', ' ', ' ', ' ']",
    },
    {
      role: 'user',
      content: '6',
    },
    {
      role: 'assistant',
      content:
        "['X', 'X', 'O', ' ', 'O', ' ', 'X', ' ', ' ']\nMy move: 8\n['X', 'X', 'O', ' ', 'O', ' ', 'X', ' ', 'O']",
    },
    {
      role: 'user',
      content: '5',
    },
    {
      role: 'assistant',
      content:
        "['X', 'X', 'O', ' ', 'O', 'X', 'X', ' ', 'O']\nMy move: 3\n['X', 'X', 'O', 'O', 'O', 'X', 'X', ' ', 'O']",
    },
    {
      role: 'user',
      content: '7',
    },
    {
      role: 'assistant',
      content: "['X', 'X', 'O', 'O', 'O', 'X', 'X', 'X', 'O']\nIt's a draw. ",
    },
    {
      role: 'user',
      content: 'new(1)',
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
      content:
        "['X', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']\nMy move: 7\n['X', ' ', ' ', ' ', ' ', ' ', ' ', 'O', ' ']",
    },
    {
      role: 'user',
      content: '8',
    },
    {
      role: 'assistant',
      content:
        "['X', ' ', ' ', ' ', ' ', ' ', ' ', 'O', 'X']\nMy move: 1\n['X', 'O', ' ', ' ', ' ', ' ', ' ', 'O', 'X']",
    },
    {
      role: 'user',
      content: '2',
    },
    {
      role: 'assistant',
      content:
        "['X', 'O', 'X', ' ', ' ', ' ', ' ', 'O', 'X']\nMy move: 3\n['X', 'O', 'X', 'O', ' ', ' ', ' ', 'O', 'X']",
    },
    {
      role: 'user',
      content: '4',
    },
    {
      role: 'assistant',
      content:
        "['X', 'O', 'X', 'O', 'X', ' ', ' ', 'O', 'X']\nMy move: 5\n['X', 'O', 'X', 'O', 'X', 'O', ' ', 'O', 'X']",
    },
    {
      role: 'user',
      content: '6',
    },
    {
      role: 'assistant',
      content: "['X', 'O', 'X', 'O', 'X', 'O', 'X', 'O', 'X']\nYou win!",
    },
    {
      role: 'user',
    },
  ],
  temperature: 0.5,
  max_tokens: 255,
  top_p: 1,
  frequency_penalty: 0,
  presence_penalty: 0,
});
