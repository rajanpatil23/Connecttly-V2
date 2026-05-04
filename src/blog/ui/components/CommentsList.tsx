import type { WpComment } from '../../api/wp';

export default function CommentsList({ comments }: { comments: WpComment[] }) {
  if (!comments?.length) return <p className="text-sm text-slate-600">Be the first to comment.</p>;
  return (
    <ul className="space-y-4">
      {comments.map(c => (
        <li key={c.id} className="border rounded-lg p-4">
          <div className="text-sm text-slate-600 mb-1">
            {c.author_name} • {new Date(c.date).toLocaleDateString()}
          </div>
          <div className="prose prose-sm" dangerouslySetInnerHTML={{ __html: c.content.rendered }} />
        </li>
      ))}
    </ul>
  );
}
