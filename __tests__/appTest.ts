import fetch from 'node-fetch';

// import { } from './helpers';

it('returns endpoint response', async () => {
  const postId = '23845211039190675';
  const results1 = await (await fetch(`http://localhost:8080/${postId}`, {})).json();
  const data = JSON.parse(results1.toString());
  expect(Array.isArray(data)).toBeTruthy();
});
