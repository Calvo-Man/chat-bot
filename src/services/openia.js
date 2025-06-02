import axios from "axios";
const apiKey = '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';
const openai = axios.create({
  baseURL: 'https://api.openai.com/v1',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`,
  },
});
export function sendMessageToOpenAI(messages) {
  return openai.post('/chat/completions', {
    model: 'gpt-4o-mini',
    messages: messages,
    temperature: 0.5
  });
}