// Journal articles published on lenainthewild.com. Paste an article in as one
// entry; it gets its own page at /journal/<slug>, joins the sitemap, and the
// home page's "Entries From My Journal" card with the same slug links to it.
// While this list is empty, /journal stays hidden (404) and links fall back
// to Substack.

export type JournalBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'quote'; text: string }
  | { type: 'image'; src: string; alt: string; caption?: string };

export type JournalArticle = {
  slug: string; // the URL: /journal/<slug>
  title: string;
  description: string; // ~150 characters, shown in Google and share previews
  date: string; // YYYY-MM-DD, first published
  category: string;
  tags: string[];
  image?: { src: string; alt: string; pos?: string };
  substackUrl?: string; // where it also lives on Substack, if anywhere
  // The offer to point readers to at the end, if it fits the article.
  offer?: 'The 5 Day Reconnect' | 'The Freedom Frequency';
  body: JournalBlock[];
};

export const journal: JournalArticle[] = [];

export const journalPage = {
  label: 'Journal',
  heading: 'Entries From My Journal',
  intro: 'Honest stories from starting over: the leaps, the fear, the healing and the everyday moments in between.',
};

export const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' });

export const findArticle = (slug: string) => journal.find((a) => a.slug === slug);

// Newest first.
export const sortedJournal = () => [...journal].sort((a, b) => b.date.localeCompare(a.date));
