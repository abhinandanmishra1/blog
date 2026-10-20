"use client";

import React, { useState } from "react";
import { Copy, Check, Download, Sparkles, FileText, Code2, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NewArticleAdminPage() {
  const [title, setTitle] = useState("Microservice Event Choreography with Apache Kafka");
  const [slug, setSlug] = useState("microservice-event-choreography-kafka");
  const [brief, setBrief] = useState(
    "How to design resilient event-driven architectures with Kafka topic partitions, consumer groups, and outbox patterns."
  );
  const [tags, setTags] = useState("Kafka, System Design, Microservices");
  const [series, setSeries] = useState("System Design");
  const [coverImage, setCoverImage] = useState(
    "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&q=80"
  );
  const [readTime, setReadTime] = useState(10);
  const [content, setContent] = useState(`When orchestrating microservices in distributed applications, synchronous REST calls introduce tight coupling and cascading latency.

In this article, we explore how event choreography using Apache Kafka eliminates point-to-point dependencies while guaranteeing at-least-once message delivery.

---

## The Outbox Pattern

To prevent dual-write anomalies between relational database updates and Kafka publishing, use the Transactional Outbox Pattern:

\`\`\`sql
-- In the same ACID transaction:
INSERT INTO orders (id, user_id, amount) VALUES (1, 'user-101', 250);
INSERT INTO outbox_events (aggregate_id, event_type, payload)
VALUES (1, 'OrderCreated', '{"amount": 250}');
\`\`\`

A Debezium CDC connector reads the outbox table via Postgres Write-Ahead Log (WAL) and publishes directly to Kafka.

---

## Consumer Group Partitioning

Kafka assigns each topic partition to exactly one consumer within a group, ensuring strict ordering per partition key:

\`\`\`typescript
const consumer = kafka.consumer({ groupId: 'order-processing-group' });
await consumer.subscribe({ topic: 'orders', fromBeginning: false });

await consumer.run({
  eachMessage: async ({ topic, partition, message }) => {
    console.log(\`Received event on partition \${partition}: \${message.value?.toString()}\`);
  },
});
\`\`\`
`);

  const [copied, setCopied] = useState(false);

  // Auto-slugify
  const handleTitleChange = (val: string) => {
    setTitle(val);
    const generatedSlug = val
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
    setSlug(generatedSlug);
  };

  const tagList = tags.split(",").map((t) => t.trim()).filter(Boolean);

  const fullMdx = `---
title: "${title}"
brief: "${brief}"
publishedAt: "${new Date().toISOString()}"
readTimeInMinutes: ${readTime}
tags:
${tagList.map((t) => `  - name: "${t}"\n    slug: "${t.toLowerCase().replace(/\s+/g, "-")}"`).join("\n")}
series:
  name: "${series}"
  slug: "${series.toLowerCase().replace(/\s+/g, "-")}"
coverImage:
  url: "${coverImage}"
author:
  name: "Abhinandan Mishra"
  profilePicture: "https://github.com/abhinandanmishra1.png"
---

${content}
`;

  const handleCopy = () => {
    navigator.clipboard.writeText(fullMdx);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([fullMdx], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${slug || "new-article"}.mdx`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
        <div>
          <Link
            href="/admin"
            className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white mb-2 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Dashboard</span>
          </Link>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Live MDX Article Composer
          </h1>
          <p className="text-xs text-zinc-400 mt-0.5">
            Craft full-featured MDX articles with compliant YAML frontmatter.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-200 text-xs font-semibold hover:bg-zinc-800 transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied MDX</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Full MDX</span>
              </>
            )}
          </button>

          <button
            onClick={handleDownload}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-500 transition-colors shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download .mdx File</span>
          </button>
        </div>
      </div>

      {/* Two column grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form: Frontmatter Metadata */}
        <div className="lg:col-span-5 space-y-4 p-5 rounded-xl border border-zinc-800 bg-zinc-900/40">
          <div className="flex items-center gap-2 pb-2 border-b border-zinc-800 text-xs font-mono font-semibold text-blue-400">
            <FileText className="w-4 h-4" />
            <span>Article Frontmatter Metadata</span>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-zinc-300">Article Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              className="w-full px-3 py-1.5 rounded-lg border border-zinc-800 bg-zinc-950 text-white text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-zinc-300">URL Slug</label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="w-full px-3 py-1.5 rounded-lg border border-zinc-800 bg-zinc-950 text-zinc-300 font-mono text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-zinc-300">Brief / Excerpt</label>
            <textarea
              value={brief}
              onChange={(e) => setBrief(e.target.value)}
              rows={3}
              className="w-full px-3 py-1.5 rounded-lg border border-zinc-800 bg-zinc-950 text-white text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-medium text-zinc-300">Series Name</label>
              <input
                type="text"
                value={series}
                onChange={(e) => setSeries(e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg border border-zinc-800 bg-zinc-950 text-white text-xs"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-zinc-300">Read Time (min)</label>
              <input
                type="number"
                value={readTime}
                onChange={(e) => setReadTime(Number(e.target.value))}
                className="w-full px-3 py-1.5 rounded-lg border border-zinc-800 bg-zinc-950 text-white text-xs font-mono"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-zinc-300">Tags (comma-separated)</label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full px-3 py-1.5 rounded-lg border border-zinc-800 bg-zinc-950 text-white text-xs"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-zinc-300">Cover Image URL</label>
            <input
              type="text"
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
              className="w-full px-3 py-1.5 rounded-lg border border-zinc-800 bg-zinc-950 text-xs font-mono text-zinc-400"
            />
          </div>

          <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20 text-xs text-zinc-300 leading-relaxed">
            <div className="font-semibold text-blue-400 mb-1 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>How to publish:</span>
            </div>
            Click <strong>Download .mdx File</strong> and drop it into <code>src/content/</code> in the blog repository, or copy the code and save directly!
          </div>
        </div>

        {/* Right Editor: Markdown content */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-5 rounded-xl border border-zinc-800 bg-zinc-900/40 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
              <div className="flex items-center gap-2 text-xs font-mono font-semibold text-emerald-400">
                <Code2 className="w-4 h-4" />
                <span>Markdown & MDX Body</span>
              </div>
              <span className="text-[11px] font-mono text-zinc-500">
                {content.split(/\s+/).filter(Boolean).length} words
              </span>
            </div>

            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={18}
              className="w-full px-4 py-3 rounded-lg border border-zinc-800 bg-zinc-950 text-zinc-200 text-xs sm:text-sm font-mono focus:outline-none focus:ring-1 focus:ring-blue-500 resize-y leading-relaxed"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
