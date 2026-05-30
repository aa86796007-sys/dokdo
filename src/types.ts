export interface DocumentItem {
  id: string;
  title: string;
  year: string;
  category: 'kr_doc' | 'jp_doc';
  source: string;
  translation: string;
  significance: string;
}

export interface MapItem {
  id: string;
  title: string;
  year: string;
  creator: string;
  type: 'kr_map' | 'jp_map';
  description: string;
  keyFact: string;
}

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  details?: string[];
  badge?: string;
}

export interface ReflectionAnswer {
  q1: string;
  q2: string;
  q3: string;
}

export interface JointTextbookData {
  memberKr: string;
  memberJp: string;
  chapterTitle: string;
  content: string;
  rating: number;
}
