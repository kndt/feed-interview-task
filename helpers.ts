import { promises } from 'fs';
import { AccountSpend, AdInsight, MinMaxAvg, InsightResponse, PostResponse, AdPost, InsightData} from './types';

export const maxMinAvg = (arr: number[]): MinMaxAvg => {
  const min = Math.min(...arr).toString();
  const max = Math.max(...arr).toString();
  const avg = arr.reduce((a,b) => a + b, 0).toString()
  return { min, max, avg };
}

export const aggregateData = async(path: string): Promise<AccountSpend[]> => {
  const insight = await promises.readFile(path);
  const data = JSON.parse(insight.toString());
  
  const outputData: AccountSpend[] = [];
  for (const chunk of data) {
    for (const accSpend of outputData) {
      if (accSpend.accountId === (chunk as AdInsight).account_id) {
        const spendData = (chunk as AdInsight).insights.data.spend;
        const impression = (chunk as AdInsight).insights.data.impressions;
        accSpend.spend = accSpend.spend + parseFloat(spendData);
        accSpend.impressions.push(parseInt(impression));
      }
      const spendData = (chunk as AdInsight).insights.data.spend;
      const accountId = (chunk as AdInsight).account_id;
      const campaignId = (chunk as AdInsight).campaign.id;
      const impression = (chunk as AdInsight).insights.data.impressions;
      outputData.push({
        accountId,
        campaignId,
        spend: parseFloat(spendData),
        impressions: [parseInt(impression)]
      })
    }
  }
  return outputData;
}

export const genAdResponses = async(postId: string, postsData: AdPost[], insightsData: AdInsight[]): Promise<string[]> => {
  const postResponses: PostResponse[] = [];
  for (const chunk of postsData) {
    if ((chunk as AdPost).id === postId) {
      const id = (chunk as AdPost).id;
      const ad_id = (chunk as AdPost).ad_id;
      postResponses.push({
        id,
        ad_id,
      })
    }
  }

  const insightResponses: InsightResponse[] = [];
  for (const chunk of insightsData) {
    if ((chunk as AdInsight).id === postId) {
      const id = (chunk as AdInsight).id;
      const insight = (chunk as AdInsight).insights;
      insightResponses.push({
        id,
        insight,
      })
    }
  }

  const output: string[] = [];
  output.push(JSON.stringify(postResponses));
  output.push(JSON.stringify(insightResponses));
  return output;
}