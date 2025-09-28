import React from "react";
import { BrowserRouter, Routes, Route, Link, useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Feather, ArrowRight, Tag as TagIcon, Home, BookOpen } from "lucide-react";

// ---------- Sample Data ----------
const POSTS = [
  {
    id: "design-systems-2025",
    title: "Design Systems in 2025: Shipping Consistency at Scale",
    excerpt:
      "How modern teams use tokens, theming, and component governance to keep UI consistent as they move faster.",
    cover:
      "https://images.unsplash.com/photo-1587614382346-4ec70e388b28?q=80&w=1600&auto=format&fit=crop",
    tags: ["Design", "Systems", "Process"],
    date: "2025-06-11",
    read: 8,
    content: `\n### TL;DR\nDesign systems are no longer just component libraries. They are living contracts between design and engineering.\n\n---\n\n#### 1) Tokens First\n• Color, radius, spacing, and typography are managed with tokens.\n• Tokens compile into CSS variables for runtime theming.\n\n#### 2) Governance\n• Lightweight RFCs for component changes.\n• Lint rules and PR templates keep consistency.\n\n#### 3) Metrics That Matter\n• Track adoption, drift, and reusability.\n• Ship fewer variants, document more patterns.\n\n> Pro tip: Start from a real product surface, not from a figma playground.`,
  },
  {
    id: "ops-to-strategy",
    title: "From Operations to Strategy: Leveraging Systems Thinking",
    excerpt:
      "A practical path to move from execution-heavy roles into strategic impact using metrics, playbooks, and automation.",
    cover:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1600&auto=format&fit=crop",
    tags: ["Operations", "Career", "Playbooks"],
    date: "2025-07-21",
    read: 6,
    content:
      `### Why it matters\nExecution scales with effort. Strategy scales with leverage.\n\n#### Playbook Stack\n1. Intake > triage > SLA\n2. Definition of Done\n3. Risk pre-mortem\n4. KPI tree (leading vs lagging)\n\n#### Automate\n• Templates, snippets, and checklists\n• Routing with forms and tags\n• Dashboards for visibility\n\nTry this next week: replace a recurring 30-min meeting with an async doc + form.`,
  },
  {
    id: "visual-notes",
    title: "Visual Notes: Turn Meetings Into Shareable Maps",
    excerpt:
      "Use lightweight diagrams and color tokens to publish meeting summaries that people actually read.",
    cover:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1600&auto=format&fit=crop",
    tags: ["Visualization", "Meetings", "Productivity"],
    date: "2025-05-04",
    read: 4,
    content:
      `### Kit\n• 1 page canvas\n• 3 color accents\n• Action lanes\n\n### Flow\nCapture → Cluster → Commit → Circulate.\n\n> When in doubt, draw boxes first, arrows later.`,
  },
];

// ---------- UI Helpers ----------
const containerVariants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

function Chip({ children }) {
  return (
    <span className="inline-flex items-center rounded-full bg-emerald-50 text-emerald-700 px-3 py-1 text-xs font-medium ring-1 ring-emerald-100">
      {children}
    </span>
  );
}

function Button({ to, children, onClick, icon }) {
  const Cmp = to ? Link : "button";
  return (
    <Cmp
      to={to}
      onClick={onClick}
      className="group inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-medium shadow-sm ring-1 ring-gray-200 bg-white/60 hover:bg-white transition backdrop-blur"
    >
      {icon}
      {children}
      <ArrowRight className="size-4 opacity-60 group-hover:translate-x-0.5 transition" />
    </Cmp>
  );
}

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-slate-50 to-emerald-50">
      <header className="sticky top-0 z-20 backdrop-blur bg-white/60 border-b border-white/60">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="size-9 rounded-2xl bg-gradient-to-br from-emerald-200 via-teal-200 to-cyan-200 grid place-items-center shadow-sm ring-1 ring-emerald-100">
              <Feather className="size-5 text-emerald-700" />
            </div>
            <div className="font-semibold tracking-tight text-slate-800">SoftBlog</div>
          </Link>
          <nav className="ml-auto hidden md:flex items-center gap-1">
            <NavLink to="/" icon={<Home className="size-4" />}>首頁</NavLink>
            <NavLink to="/topics" icon={<BookOpen className="size-4" />}>主題</NavLink>
            <a href="#" className="inline-flex items-center gap-2 rounded-2xl px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900">
              關於
            </a>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>

      <footer className="mt-16 border-t border-white/60 bg-white/50">
        <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-slate-500">
          © {new Date().getFullYear()} SoftBlog — Crafted with soft colors & round corners.
        </div>
      </footer>
    </div>
  );
}

function NavLink({ to, icon, children }) {
  return (
    <Link
      to={to}
      className="inline-flex items-center gap-2 rounded-2xl px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-white/80 ring-1 ring-transparent hover:ring-gray-200 transition"
    >
      {icon}
      {children}
    </Link>
  );
}

// ---------- Cards & Lists ----------
function PostCard({ post }) {
  return (
    <motion.article
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="overflow-hidden rounded-3xl bg-white/70 ring-1 ring-gray-200 shadow-sm hover:shadow-md transition"
    >
      <Link to={`/post/${post.id}`} className="block">
        <div className="aspect-[16/9] overflow-hidden">
          <img
            src={post.cover}
            alt={post.title}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-[1.03]"
            loading="lazy"
          />
        </div>
        <div className="p-5">
          <div className="flex items-center justify-between">
            <div className="text-xs text-slate-500">{new Date(post.date).toLocaleDateString()}</div>
            <div className="text-xs text-slate-500">{post.read} min read</div>
          </div>
          <h3 className="mt-2 text-lg font-semibold tracking-tight text-slate-800">{post.title}</h3>
          <p className="mt-1 text-slate-600 text-sm line-clamp-2">{post.excerpt}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {post.tags.map((t) => (
              <Chip key={t}>{t}</Chip>
            ))}
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

function PostGrid({ items }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((p) => (
        <PostCard key={p.id} post={p} />
      ))}
    </div>
  );
}

// ---------- Pages ----------
function HomePage() {
  const [q, setQ] = React.useState("");
  const filtered = POSTS.filter(
    (p) =>
      p.title.toLowerCase().includes(q.toLowerCase()) ||
      p.tags.join(" ").toLowerCase().includes(q.toLowerCase())
  );

  return (
    <Layout>
      <section className="flex flex-col md:flex-row md:items-center gap-6 mb-10">
        <div className="flex-1">
          <motion.h1
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-3xl md:text-4xl font-bold tracking-tight text-slate-800"
          >
            柔和配色・圓角風格的部落格
          </motion.h1>
          <p className="mt-2 text-slate-600 max-w-2xl">
            精選文章、系統化流程、視覺化筆記。用舒服的色彩與圓角設計呈現內容。
          </p>
          <div className="mt-4 flex items-center gap-3">
            <Button to="/topics" icon={<TagIcon className="size-4" />}>瀏覽主題</Button>
            <Button to="#latest" icon={<ArrowRight className="size-4" />}>最新文章</Button>
          </div>
        </div>
        <div className="flex-1">
          <div className="rounded-3xl ring-1 ring-gray-200 bg-white/70 p-3 shadow-sm">
            <div className="flex items-center gap-2 rounded-2xl bg-slate-50 px-3 py-2 ring-1 ring-slate-200">
              <Search className="size-4 text-slate-500" />
              <input
                className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
                placeholder="搜尋文章或標籤..."
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      <section id="latest" className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="size-2 rounded-full bg-emerald-400" />
          <h2 className="text-lg font-semibold text-slate-800">最新文章</h2>
        </div>
        <PostGrid items={filtered} />
      </section>
    </Layout>
  );
}

function TopicsPage() {
  const allTags = Array.from(new Set(POSTS.flatMap((p) => p.tags)));
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="max-w-3xl">
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">主題分類</h1>
        <p className="mt-2 text-slate-600 text-sm">依照主題瀏覽所有內容。</p>
        <div className="mt-6 flex flex-wrap gap-3">
          {allTags.map((t) => (
            <button
              key={t}
              onClick={() => navigate(`/topics/${encodeURIComponent(t)}`)}
              className="rounded-2xl px-4 py-2 text-sm ring-1 ring-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
            >
              #{t}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-10 space-y-6">
        {allTags.map((t) => (
          <section key={t} className="space-y-3">
            <div className="flex items-center gap-2">
              <TagIcon className="size-4 text-emerald-600" />
              <h2 className="font-semibold text-slate-800">{t}</h2>
            </div>
            <PostGrid items={POSTS.filter((p) => p.tags.includes(t))} />
          </section>
        ))}
      </div>
    </Layout>
  );
}

function TopicDetailPage() {
  const { tag } = useParams();
  const decoded = decodeURIComponent(tag || "");
  const items = POSTS.filter((p) => p.tags.includes(decoded));

  return (
    <Layout>
      <div className="flex items-center gap-2 mb-6">
        <TagIcon className="size-4 text-emerald-600" />
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">#{decoded}</h1>
      </div>
      {items.length ? <PostGrid items={items} /> : <EmptyState label="此主題目前沒有文章" />}
    </Layout>
  );
}

function EmptyState({ label }) {
  return (
    <div className="rounded-3xl ring-1 ring-gray-200 bg-white/60 p-10 text-center">
      <p className="text-slate-500">{label}</p>
    </div>
  );
}

function ArticlePage() {
  const { id } = useParams();
  const post = POSTS.find((p) => p.id === id);
  if (!post) return (
    <Layout>
      <EmptyState label="找不到這篇文章" />
    </Layout>
  );

  return (
    <Layout>
      <article className="mx-auto max-w-3xl">
        <div className="overflow-hidden rounded-3xl ring-1 ring-gray-200 bg-white/70 shadow-sm">
          <img src={post.cover} alt={post.title} className="w-full object-cover max-h-[360px]" />
          <div className="p-6 md:p-8">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>{new Date(post.date).toLocaleDateString()}</span>
              <span>{post.read} min read</span>
            </div>
            <h1 className="mt-2 text-2xl md:text-3xl font-bold tracking-tight text-slate-800">{post.title}</h1>
            <div className="mt-3 flex flex-wrap gap-2">
              {post.tags.map((t) => (
                <Chip key={t}>{t}</Chip>
              ))}
            </div>

            <div className="prose prose-slate max-w-none mt-6 prose-headings:scroll-mt-24">
              {post.content.split("\n").map((line, idx) => (
                <p key={idx} className="whitespace-pre-wrap">
                  {line}
                </p>
              ))}
            </div>

            <div className="mt-8 flex items-center justify-between">
              <Link
                to="/"
                className="inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm ring-1 ring-gray-200 bg-white/60 hover:bg-white"
              >
                ← 返回首頁
              </Link>
              <div className="text-sm text-slate-500">感謝閱讀！</div>
            </div>
          </div>
        </div>

        <section className="mt-10">
          <h3 className="text-lg font-semibold text-slate-800 mb-3">你可能也會喜歡</h3>
          <PostGrid items={POSTS.filter((p) => p.id !== post.id).slice(0, 3)} />
        </section>
      </article>
    </Layout>
  );
}

// ---------- App ----------
export default function App() {
  return (
    <BrowserRouter>
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/topics" element={<TopicsPage />} />
          <Route path="/topics/:tag" element={<TopicDetailPage />} />
          <Route path="/post/:id" element={<ArticlePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
    </BrowserRouter>
  );
}

function NotFound() {
  return (
    <Layout>
      <div className="max-w-xl">
        <h1 className="text-2xl font-bold text-slate-800">頁面不存在</h1>
        <p className="mt-2 text-slate-600">請檢查網址是否正確，或返回首頁。</p>
        <div className="mt-6">
          <Button to="/" icon={<Home className="size-4" />}>回首頁</Button>
        </div>
      </div>
    </Layout>
  );
}
