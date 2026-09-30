import Link from "next/link";

export function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label="Hoytube home"
      className="flex items-center gap-2 rounded-lg"
    >
      <span className="grid size-9 place-items-center rounded-lg bg-linear-to-br from-red-500 to-red-600">
        <svg
          viewBox="0 0 24 24"
          aria-hidden
          className="ml-0.5 size-5 fill-white"
        >
          <path d="M7 4.5v15a1 1 0 0 0 1.52.85l12-7.5a1 1 0 0 0 0-1.7l-12-7.5A1 1 0 0 0 7 4.5Z" />
        </svg>
      </span>
      <span className="hidden text-2xl font-bold tracking-tight sm:inline">
        Hoytube
      </span>
    </Link>
  );
}
