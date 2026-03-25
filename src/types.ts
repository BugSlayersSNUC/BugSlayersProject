export interface User {
  id: string;
  name: string;
  avatar?: string;
  totalDonations: number;
  regularityScore: number; // 0-100
  lastDonationDate?: string;
  location?: string;
}

export interface Donation {
  id: string;
  userId: string;
  userName: string;
  date: string;
  location: string;
  type: 'Blood' | 'Plasma' | 'Platelets';
  proofUrl?: string;
  status: 'verified' | 'pending';
}

export interface Circle {
  id: string;
  name: string;
  description?: string;
  members: User[];
  donations: Donation[];
  activityScore: number; // 0 to 100
  points: number;
  distance?: string; // For exploration
  isPrivate?: boolean;
}

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  content: string;
  timestamp: string;
  upvotes: number;
}

export interface Post {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  title: string;
  content: string;
  timestamp: string;
  upvotes: number;
  commentsCount: number;
  tags?: string[];
  imageUrl?: string;
  userVote?: 'up' | 'down' | null;
  comments?: Comment[];
}

export interface Reward {
  id: string;
  title: string;
  description: string;
  pointsCost: number;
  imageUrl?: string;
  category: 'Coupon' | 'Product' | 'Benefit' | 'Donation';
}

export interface Nomination {
  id: string;
  rewardId: string;
  circleId: string;
  nominatedBy: string;
  votes: string[]; // User IDs
  status: 'pending' | 'redeemed' | 'failed';
  timestamp: string;
}
