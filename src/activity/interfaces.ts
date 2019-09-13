export interface PostActivityParam {
  processName: string;
  processTitle: string;
  processData: BrowsingData | any;
  timeBlock: number;
  timeSpent: number; // seconds
  activityPercentage: number; // [0,100]
}

export interface BrowsingData {
  url: string;
  title: string;
}