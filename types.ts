export interface AccountSpend {
  accountId: string;
  campaignId: string;
  spend: number;
  impressions: number[];
}
export interface Campaign {
  id: string;
  objective: string;
}
export interface AdSet {
  id: string;
  optimization_goal: string;
}

export interface Action {
  action_type: string;
  value: string;
}

export interface InsightData {
  actions: Action[];
  date_start: string;
  date_stop: string;
  impressions: string;
  outbound_clicks: Action[];
  spend: string;
}

export interface Insights {
  data: InsightData;
}
export interface AdInsight {
  id: string;
  account_id: string;
  campaign: Campaign;
  adset: AdSet;
  insights: Insights;
}

export interface AdPost {
  id: string;
  profile_id: string;
  account_id: string;
  currency: string;
  ad_id: string;
}

export interface PostResponse {
  id: string;
  ad_id: string;
}

export interface InsightResponse {
  id: string;
  insight: Insights;
}

export interface MinMaxAvg {
  min: string;
  max: string;
  avg: string;
}