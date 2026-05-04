import { useState } from 'react';
import { postComment } from '../../api/wp';

export default function CommentForm({ postId, onSubmitted }: { postId: number; onSubmitted: () => void }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [content, setContent] = useState('');
  const [hp, setHp] = useState(''); // honeypot
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setMsg(null);
    try {
      const res = await postComment({ post: postId, author_name: name, author_email: email, content, honeypot: hp });
      if ((res as any).status === 'spam-suspected') {
        setMsg('Submission blocked.');
      } else if ((res as any).status === 'hold') {
        setMsg('Submitted for review.');
        setName(''); setEmail(''); setContent('');
      } else {
        setMsg('Posted!');
        setName(''); setEmail(''); setContent('');
        onSubmitted();
      }
    } catch (err: any) {
      setMsg(`Error: ${err.message || 'failed'}`);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={submit} className="space-y-3 max-w-xl">
      <div className="grid sm:grid-cols-2 gap-3">
        <input 
          value={name} 
          onChange={e => setName(e.target.value)} 
          required 
          placeholder="Your name" 
          className="w-full border rounded-lg px-3 py-2" 
        />
        <input 
          value={email} 
          onChange={e => setEmail(e.target.value)} 
          required 
          type="email" 
          placeholder="Email" 
          className="w-full border rounded-lg px-3 py-2" 
        />
      </div>
      <textarea 
        value={content} 
        onChange={e => setContent(e.target.value)} 
        required 
        placeholder="Write a comment..." 
        className="w-full border rounded-lg px-3 py-2 h-28" 
      />
      {/* Honeypot: hidden to humans */}
      <input 
        value={hp} 
        onChange={e => setHp(e.target.value)} 
        tabIndex={-1} 
        autoComplete="off" 
        className="hidden" 
        aria-hidden="true" 
      />
      <div className="flex items-center gap-3">
        <button 
          disabled={submitting} 
          className="px-4 py-2 rounded-lg border bg-[#0074ED] text-white hover:bg-[#0060C9] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitting ? 'Posting…' : 'Post comment'}
        </button>
        {msg && <span className="text-sm text-slate-600">{msg}</span>}
      </div>
    </form>
  );
}
