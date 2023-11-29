import { postNewGameMessage } from './script';
import { JSDOM } from 'jsdom';

jest.mock('node-fetch', () => require('fetch-mock-jest').sandbox());
const fetch = require('node-fetch');

describe('postNewGameMessage', () => {
  let sliderElement;
  let difficultyElement;

  beforeEach(() => {
    fetch.mockClear();

    // Set up our document body
    const dom = new JSDOM(`
    <div>
      <input type="range" id="slider" min="1" max="10" step="1" value="10" />
      <span id="difficulty" />
    </div>
  `);
    // After setting up the JSDOM document
    document.dispatchEvent(new Event('DOMContentLoaded'));

    global.window = dom.window;
    global.document = dom.window.document;
    sliderElement = document.querySelector('#slider');
    difficultyElement = document.querySelector('#difficulty');
  });

  test('should post new game message successfully', async () => {
    const messageHistory = ['message1', 'message2'];
    const mockResponse = {
      response: {
        choices: [
          {
            message: {
              content: 'mock content',
            },
          },
        ],
      },
    };

    fetch.mockResponseOnce(JSON.stringify(mockResponse));

    const updateMessageDisplay = jest.fn();
    await postNewGameMessage.call({ messageHistory, updateMessageDisplay });

    expect(fetch).toHaveBeenCalledWith('http://localhost:3000/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: messageHistory }),
    });
    expect(updateMessageDisplay).toHaveBeenCalledWith(
      mockResponse.response.choices[0].message.content
    );
  });

  test('should handle error when posting new game message', async () => {
    const messageHistory = ['message1', 'message2'];
    const mockError = new Error('mock error');

    fetch.mockReject(mockError);

    const updateMessageDisplay = jest.fn();
    await postNewGameMessage.call({ messageHistory, updateMessageDisplay });

    expect(fetch).toHaveBeenCalledWith('http://localhost:3000/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: messageHistory }),
    });
    expect(updateMessageDisplay).toHaveBeenCalledWith(
      'Error starting a new game. Please try again.'
    );
    expect(console.error).toHaveBeenCalledWith(
      'Failed to post new game message:',
      mockError
    );
  });
});
