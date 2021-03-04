import express, { Application, Request, Response } from 'express';
import { promises } from 'fs';
import chokidar from 'chokidar';

import { AccountSpend } from './types';
import { aggregateData, genAdResponses, maxMinAvg } from './helpers';

const dataPath = `${__dirname}/data`;
const watcher = chokidar.watch(dataPath, {ignored: /^\./, persistent: true});
watcher
  .on('add', async(path) => {
    console.log('File', path, 'has been added');
    const outputData: AccountSpend[] = await aggregateData(path);
    const desc = outputData.sort((a, b) => a.spend < b.spend ? 1 : a.spend > b.spend ? -1 : 0).slice(0, 3);
    const content: string[] = [];
    content.push(JSON.stringify(desc[0]));
    content.push(JSON.stringify(desc[1]));
    content.push(JSON.stringify(desc[2]));
    for (const chunk of desc) {
      const mma = maxMinAvg(chunk.impressions);
      content.push(JSON.stringify(mma));
    }
    await promises.writeFile(`${__dirname}/output`, JSON.stringify(content))
  })

const app: Application = express();
const port = 8080;

app.get(' /posts/:postId', async(req: Request, res: Response) => {
  const { postId } = req.params;
  const insights = await promises.readFile(`${dataPath}/ad_insights.json`);
  const posts = await promises.readFile(`${dataPath}/post_ads.json`);
  const insightsData = JSON.parse(insights.toString());
  const postsData = JSON.parse(posts.toString());
  const output = await genAdResponses(postId, postsData, insightsData);
  res.send(output);
});

app.listen( port, () => {
  console.log( `server started at http://localhost:${ port }` );
});