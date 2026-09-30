"use client";

import {
  Check,
  EllipsisVertical,
  ListFilter,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";
import { useId, useRef, useState } from "react";

import { cn } from "@/lib/cn";
import { formatCount, formatDaysAgo } from "@/lib/format";
import type { Comment } from "@/lib/videos";

type SortOrder = "top" | "newest";

const SORT_LABELS: Record<SortOrder, string> = {
  top: "Top comments",
  newest: "Newest first",
};

const countFormatter = new Intl.NumberFormat("en");

function sortComments(comments: Comment[], order: SortOrder): Comment[] {
  return comments.toSorted((a, b) =>
    order === "top" ? b.likes - a.likes : a.postedDaysAgo - b.postedDaysAgo,
  );
}

type CommentsProps = {
  count: number;
  initialComments: Comment[];
};

export function Comments({ count, initialComments }: CommentsProps) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [order, setOrder] = useState<SortOrder>("top");
  const [sortOpen, setSortOpen] = useState(false);
  // The viewer's own comments stay pinned on top, newest first, like YouTube.
  const [ownComments, setOwnComments] = useState<Comment[]>([]);
  const [draft, setDraft] = useState("");
  const [composing, setComposing] = useState(false);

  const cancel = () => {
    setDraft("");
    setComposing(false);
    inputRef.current?.blur();
  };

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const text = draft.trim();
    if (!text) return;
    setOwnComments((current) => [
      {
        id: crypto.randomUUID(),
        author: "@you",
        text,
        likes: 0,
        postedDaysAgo: 0,
      },
      ...current,
    ]);
    cancel();
  };

  const replyTo = (author: string) => {
    setDraft(`${author} `);
    setComposing(true);
    inputRef.current?.focus();
  };

  const comments = [...ownComments, ...sortComments(initialComments, order)];

  return (
    <section aria-labelledby="comments-heading" className="mt-6">
      <div className="flex items-center gap-8">
        <h2 id="comments-heading" className="text-xl font-bold">
          {countFormatter.format(count + ownComments.length)} Comments
        </h2>
        <div
          className="relative"
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) {
              setSortOpen(false);
            }
          }}
          onKeyDown={(event) => {
            if (event.key === "Escape") setSortOpen(false);
          }}
        >
          <button
            type="button"
            onClick={() => setSortOpen((open) => !open)}
            aria-haspopup="menu"
            aria-expanded={sortOpen}
            className="flex items-center gap-2 rounded-full px-2 py-1 text-sm font-medium hover:bg-surface-hover"
          >
            <ListFilter className="size-5" aria-hidden />
            Sort by
          </button>
          {sortOpen && (
            <div
              role="menu"
              aria-label="Sort comments"
              className="absolute top-full left-0 z-10 mt-1 w-48 rounded-xl border border-line bg-canvas py-2 text-sm shadow-lg"
            >
              {(Object.keys(SORT_LABELS) as SortOrder[]).map((option) => (
                <button
                  key={option}
                  type="button"
                  role="menuitemradio"
                  aria-checked={option === order}
                  onClick={() => {
                    setOrder(option);
                    setSortOpen(false);
                  }}
                  className="flex w-full items-center gap-3 px-4 py-2 text-left hover:bg-surface-hover"
                >
                  <Check
                    className={cn("size-4", option !== order && "invisible")}
                    aria-hidden
                  />
                  {SORT_LABELS[option]}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <form onSubmit={submit} className="mt-6 flex gap-4">
        <div aria-hidden className="size-10 shrink-0 rounded-full bg-avatar" />
        <div className="flex-1">
          <label htmlFor={inputId} className="sr-only">
            Add a comment
          </label>
          <input
            ref={inputRef}
            id={inputId}
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            onFocus={() => setComposing(true)}
            placeholder="Add a comment..."
            autoComplete="off"
            className="w-full border-b border-line bg-transparent pb-1 text-sm placeholder:text-muted focus:border-fg focus:outline-none"
          />
          {composing && (
            <div className="mt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={cancel}
                className="h-9 rounded-full px-4 text-sm font-medium hover:bg-surface-hover"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!draft.trim()}
                className="h-9 rounded-full bg-accent px-4 text-sm font-medium text-white hover:bg-accent-hover disabled:bg-surface disabled:text-muted"
              >
                Comment
              </button>
            </div>
          )}
        </div>
      </form>

      <ul className="mt-6 space-y-6">
        {comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} onReply={replyTo} />
        ))}
      </ul>
    </section>
  );
}

function CommentItem({
  comment,
  onReply,
}: {
  comment: Comment;
  onReply: (author: string) => void;
}) {
  const [rating, setRating] = useState<"like" | "dislike" | null>(null);
  const likes = comment.likes + (rating === "like" ? 1 : 0);

  return (
    <li className="flex gap-4">
      <div aria-hidden className="size-10 shrink-0 rounded-full bg-avatar" />
      <div className="min-w-0 flex-1">
        <p className="text-sm">
          <span className="font-medium">{comment.author}</span>{" "}
          <span className="text-xs text-muted">
            {comment.postedDaysAgo === 0
              ? "just now"
              : formatDaysAgo(comment.postedDaysAgo)}
          </span>
        </p>
        <p className="mt-1 text-sm break-words whitespace-pre-line">
          {comment.text}
        </p>
        <div className="mt-1 -ml-2 flex items-center gap-1 text-xs text-muted">
          <button
            type="button"
            onClick={() => setRating((r) => (r === "like" ? null : "like"))}
            aria-pressed={rating === "like"}
            aria-label="Like this comment"
            className="grid size-8 place-items-center rounded-full hover:bg-surface-hover hover:text-fg"
          >
            <ThumbsUp
              className={cn("size-4", rating === "like" && "fill-current")}
              aria-hidden
            />
          </button>
          {likes > 0 && <span className="mr-1">{formatCount(likes)}</span>}
          <button
            type="button"
            onClick={() =>
              setRating((r) => (r === "dislike" ? null : "dislike"))
            }
            aria-pressed={rating === "dislike"}
            aria-label="Dislike this comment"
            className="grid size-8 place-items-center rounded-full hover:bg-surface-hover hover:text-fg"
          >
            <ThumbsDown
              className={cn("size-4", rating === "dislike" && "fill-current")}
              aria-hidden
            />
          </button>
          <button
            type="button"
            onClick={() => onReply(comment.author)}
            className="ml-2 rounded-full px-3 py-1.5 font-medium text-fg hover:bg-surface-hover"
          >
            Reply
          </button>
        </div>
      </div>
      <button
        type="button"
        aria-label={`More actions for comment by ${comment.author}`}
        className="grid size-8 shrink-0 place-items-center self-start rounded-full text-muted hover:bg-surface-hover hover:text-fg"
      >
        <EllipsisVertical className="size-5" aria-hidden />
      </button>
    </li>
  );
}
