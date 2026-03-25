import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { 
  ArrowBigUp, 
  ArrowBigDown, 
  MessageSquare, 
  Share2, 
  MoreHorizontal, 
  Plus,
  Search,
  TrendingUp,
  Award,
  Clock,
  Filter,
  Image as ImageIcon,
  Link as LinkIcon,
  X,
  Send
} from 'lucide-react';
import { Post, Comment } from '../types';
import { cn } from '../lib/utils';

const MOCK_POSTS: Post[] = [
  {
    id: '1',
    userId: 'u1',
    userName: 'Sarah_Donates',
    userAvatar: 'https://picsum.photos/seed/sarah/100/100',
    title: 'Just finished my 10th donation! Feeling amazing.',
    content: 'It never gets old. The staff at the downtown center were so professional. If you\'re on the fence about donating, just do it! You\'re literally saving lives.',
    timestamp: '2026-03-25T05:36:52Z',
    upvotes: 156,
    commentsCount: 2,
    tags: ['Milestone', 'Inspiration'],
    imageUrl: 'https://picsum.photos/seed/donation/800/400',
    comments: [
      { id: 'c1', userId: 'u4', userName: 'John_Doe', content: 'Congrats! That is a huge achievement.', timestamp: '1h ago', upvotes: 5 },
      { id: 'c2', userId: 'u5', userName: 'Jane_Smith', content: 'You are a hero!', timestamp: '30m ago', upvotes: 3 }
    ]
  },
  {
    id: '2',
    userId: 'u2',
    userName: 'Mike_The_Hero',
    userAvatar: 'https://picsum.photos/seed/mike/100/100',
    title: 'Quick question about iron levels...',
    content: 'Hey everyone, I was deferred today because my iron was slightly low. Any tips on what to eat before my next appointment in two weeks? I really want to make sure I can donate next time.',
    timestamp: '2026-03-25T02:36:52Z',
    upvotes: 42,
    commentsCount: 1,
    tags: ['Advice', 'Health'],
    comments: [
      { id: 'c3', userId: 'u6', userName: 'Doc_Brown', content: 'Try eating more spinach and red meat. Also, avoid tea right after meals as it inhibits iron absorption.', timestamp: '4h ago', upvotes: 12 }
    ]
  },
  {
    id: '3',
    userId: 'u3',
    userName: 'PulseLink_Official',
    title: 'New Circle Challenge: The Spring Sprint!',
    content: 'We\'re launching a new challenge for all Circles! The group with the most verified donations this month wins a special badge and a feature on our homepage. Let\'s go!',
    timestamp: '2026-03-24T07:36:52Z',
    upvotes: 892,
    commentsCount: 0,
    tags: ['Announcement', 'Challenge']
  }
];

export function Community() {
  const { t } = useTranslation();
  const [posts, setPosts] = useState<Post[]>(MOCK_POSTS);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newPost, setNewPost] = useState({ title: '', content: '', tags: '' });
  const [sortBy, setSortBy] = useState<'new' | 'top' | 'hot'>('hot');
  const [expandedPostId, setExpandedPostId] = useState<string | null>(null);
  const [newComment, setNewComment] = useState('');

  const sortedPosts = useMemo(() => {
    return [...posts].sort((a, b) => {
      if (sortBy === 'top') {
        return b.upvotes - a.upvotes;
      }
      if (sortBy === 'hot') {
        // Simple hot algorithm: upvotes + comments
        return (b.upvotes + b.commentsCount) - (a.upvotes + a.commentsCount);
      }
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    });
  }, [posts, sortBy]);

  const handleVote = (postId: string, type: 'up' | 'down') => {
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        let newUpvotes = post.upvotes;
        let newVote = post.userVote;

        if (post.userVote === type) {
          // Remove vote
          newUpvotes += (type === 'up' ? -1 : 1);
          newVote = null;
        } else {
          // Change or add vote
          if (post.userVote === 'up') newUpvotes -= 1;
          if (post.userVote === 'down') newUpvotes += 1;
          
          newUpvotes += (type === 'up' ? 1 : -1);
          newVote = type;
        }

        return { ...post, upvotes: newUpvotes, userVote: newVote };
      }
      return post;
    }));
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    const post: Post = {
      id: Math.random().toString(36).substr(2, 9),
      userId: 'current-user',
      userName: 'You',
      title: newPost.title,
      content: newPost.content,
      timestamp: new Date().toISOString(),
      upvotes: 1,
      commentsCount: 0,
      tags: newPost.tags.split(',').map(t => t.trim()).filter(t => t !== ''),
      userVote: 'up'
    };
    setPosts([post, ...posts]);
    setIsCreateModalOpen(false);
    setNewPost({ title: '', content: '', tags: '' });
  };

  const handleAddComment = (postId: string) => {
    if (!newComment.trim()) return;
    
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        const comment: Comment = {
          id: Math.random().toString(36).substr(2, 9),
          userId: 'current-user',
          userName: 'You',
          content: newComment,
          timestamp: 'Just now',
          upvotes: 1
        };
        return {
          ...post,
          comments: [comment, ...(post.comments || [])],
          commentsCount: post.commentsCount + 1
        };
      }
      return post;
    }));
    setNewComment('');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Feed */}
        <div className="lg:col-span-8 space-y-6">
          {/* Create Post Trigger */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center text-red-500 font-bold">
              Y
            </div>
            <button 
              onClick={() => setIsCreateModalOpen(true)}
              className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-left text-gray-400 hover:bg-white/10 transition-colors"
            >
              {t('community.share_exp')}
            </button>
            <button onClick={() => setIsCreateModalOpen(true)} className="p-2 text-gray-400 hover:text-white transition-colors">
              <ImageIcon size={20} />
            </button>
            <button onClick={() => setIsCreateModalOpen(true)} className="p-2 text-gray-400 hover:text-white transition-colors">
              <LinkIcon size={20} />
            </button>
          </div>

          {/* Filter Bar */}
          <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-xl p-2">
            <button 
              onClick={() => setSortBy('hot')}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                sortBy === 'hot' ? "bg-white/10 text-white" : "text-gray-400 hover:text-white"
              )}
            >
              <TrendingUp size={16} className={sortBy === 'hot' ? "text-red-500" : ""} />
              Hot
            </button>
            <button 
              onClick={() => setSortBy('new')}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                sortBy === 'new' ? "bg-white/10 text-white" : "text-gray-400 hover:text-white"
              )}
            >
              <Clock size={16} className={sortBy === 'new' ? "text-red-500" : ""} />
              {t('community.new')}
            </button>
            <button 
              onClick={() => setSortBy('top')}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                sortBy === 'top' ? "bg-white/10 text-white" : "text-gray-400 hover:text-white"
              )}
            >
              <Award size={16} className={sortBy === 'top' ? "text-red-500" : ""} />
              {t('community.top')}
            </button>
          </div>

          {/* Posts List */}
          <div className="space-y-4">
            {sortedPosts.map((post) => (
              <motion.div 
                key={post.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/5 border border-white/10 rounded-xl overflow-hidden flex"
              >
                {/* Voting Sidebar */}
                <div className="w-12 bg-white/5 flex flex-col items-center py-4 gap-1">
                  <button 
                    onClick={() => handleVote(post.id, 'up')}
                    className={cn(
                      "transition-colors",
                      post.userVote === 'up' ? "text-red-500" : "text-gray-400 hover:text-red-500"
                    )}
                  >
                    <ArrowBigUp size={24} className={post.userVote === 'up' ? "fill-current" : ""} />
                  </button>
                  <span className={cn(
                    "text-sm font-bold",
                    post.userVote === 'up' ? "text-red-500" : post.userVote === 'down' ? "text-blue-500" : "text-gray-300"
                  )}>
                    {post.upvotes}
                  </span>
                  <button 
                    onClick={() => handleVote(post.id, 'down')}
                    className={cn(
                      "transition-colors",
                      post.userVote === 'down' ? "text-blue-500" : "text-gray-400 hover:text-blue-500"
                    )}
                  >
                    <ArrowBigDown size={24} className={post.userVote === 'down' ? "fill-current" : ""} />
                  </button>
                </div>

                {/* Content Area */}
                <div className="flex-1 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    {post.userAvatar ? (
                      <img src={post.userAvatar} alt={post.userName} className="w-6 h-6 rounded-full" referrerPolicy="no-referrer" />
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center text-[10px] text-red-500 font-bold">
                        {post.userName[0]}
                      </div>
                    )}
                    <span className="text-xs font-bold text-white">u/{post.userName}</span>
                    <span className="text-xs text-gray-500">• {post.timestamp.includes('T') ? new Date(post.timestamp).toLocaleDateString() : post.timestamp}</span>
                  </div>

                  <h3 className="text-lg font-bold mb-2 text-white">{post.title}</h3>
                  <p className="text-gray-300 text-sm mb-4 leading-relaxed">{post.content}</p>

                  {post.imageUrl && (
                    <div className="mb-4 rounded-xl overflow-hidden border border-white/10">
                      <img src={post.imageUrl} alt="Post content" className="w-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                  )}

                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map(tag => (
                        <span key={tag} className="px-2 py-1 bg-red-500/10 text-red-500 text-[10px] uppercase tracking-wider font-bold rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => setExpandedPostId(expandedPostId === post.id ? null : post.id)}
                      className="flex items-center gap-2 text-gray-400 hover:bg-white/5 px-2 py-1 rounded transition-colors text-sm"
                    >
                      <MessageSquare size={18} />
                      {post.commentsCount} {t('community.comments')}
                    </button>
                    <button className="flex items-center gap-2 text-gray-400 hover:bg-white/5 px-2 py-1 rounded transition-colors text-sm">
                      <Share2 size={18} />
                      {t('community.share')}
                    </button>
                    <button className="flex items-center gap-2 text-gray-400 hover:bg-white/5 px-2 py-1 rounded transition-colors text-sm">
                      <MoreHorizontal size={18} />
                    </button>
                  </div>

                  {/* Comments Section */}
                  <AnimatePresence>
                    {expandedPostId === post.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="mt-4 pt-4 border-t border-white/10 space-y-4 overflow-hidden"
                      >
                        {/* Add Comment */}
                        <div className="flex gap-2">
                          <input 
                            type="text"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Add a comment..."
                            className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-red-500/50"
                          />
                          <button 
                            onClick={() => handleAddComment(post.id)}
                            className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                          >
                            <Send size={16} />
                          </button>
                        </div>

                        {/* Comments List */}
                        <div className="space-y-4">
                          {post.comments?.map(comment => (
                            <div key={comment.id} className="flex gap-3">
                              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-gray-400">
                                {comment.userName[0]}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-xs font-bold text-white">{comment.userName}</span>
                                  <span className="text-[10px] text-gray-500">{comment.timestamp}</span>
                                </div>
                                <p className="text-sm text-gray-300">{comment.content}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Search size={20} className="text-red-500" />
              About Community
            </h2>
            <p className="text-sm text-gray-400 mb-6 leading-relaxed">
              Welcome to the heart of PulseLink. Share your stories, ask questions, and connect with fellow donors who are making a difference every day.
            </p>
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Members</span>
                <span className="font-bold">12.4k</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Online</span>
                <span className="font-bold text-green-500">842</span>
              </div>
            </div>
            <button 
              onClick={() => setIsCreateModalOpen(true)}
              className="w-full py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <Plus size={20} />
              {t('community.create_post')}
            </button>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <TrendingUp size={20} className="text-red-500" />
              Trending Topics
            </h2>
            <div className="space-y-4">
              {['#FirstTimeDonor', '#IronRichDiet', '#PlasmaPower', '#CircleChallenge'].map(topic => (
                <div key={topic} className="flex flex-col">
                  <span className="text-sm font-bold text-white hover:underline cursor-pointer">{topic}</span>
                  <span className="text-xs text-gray-500">2.4k posts this week</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Create Post Modal */}
      <AnimatePresence>
        {isCreateModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCreateModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
            >
              <div className="p-6 border-b border-white/10 flex justify-between items-center">
                <h2 className="text-xl font-bold">{t('community.create_post')}</h2>
                <button onClick={() => setIsCreateModalOpen(false)} className="text-gray-400 hover:text-white">
                  <X size={24} />
                </button>
              </div>
              
              <form onSubmit={handleCreatePost} className="p-6 space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">{t('community.post_title')}</label>
                  <input 
                    required
                    type="text"
                    value={newPost.title}
                    onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                    placeholder="An interesting title"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-red-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">{t('community.post_content')}</label>
                  <textarea 
                    required
                    rows={6}
                    value={newPost.content}
                    onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                    placeholder={t('community.post_content')}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-red-500 transition-colors resize-none"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">{t('community.post_tags')}</label>
                  <input 
                    type="text"
                    value={newPost.tags}
                    onChange={(e) => setNewPost({...newPost, tags: e.target.value})}
                    placeholder="Advice, Milestone, Health"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-red-500 transition-colors"
                  />
                </div>
                
                <div className="pt-4 flex justify-end gap-4">
                  <button 
                    type="button"
                    onClick={() => setIsCreateModalOpen(false)}
                    className="px-6 py-3 border border-white/10 rounded-xl font-bold hover:bg-white/5 transition-colors"
                  >
                    {t('community.cancel')}
                  </button>
                  <button 
                    type="submit"
                    className="px-8 py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl transition-colors"
                  >
                    {t('community.post')}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
