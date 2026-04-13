---
title: "Understanding Apache Lucene - IndexWriter, Flushes, Commits, Updates, Deletes, and Near-Real-Time Search (Part 5)"
date: '2026-04-13'
description: "A systems-level deep dive into Lucene's write path: how IndexWriter buffers changes, creates segments, handles updates and deletes, distinguishes flush from commit, and enables near-real-time visibility."
tags: ['lucene', 'java', 'search', 'indexwriter', 'segments', 'commit', 'near-real-time', 'indexing']
---

# Understanding Apache Lucene (Part 5)

In [Part 4](/blogs/understanding-apache-lucene-part-4), we looked at how analyzers transform raw text into the final terms Lucene indexes and queries. Now we move one step later in the lifecycle:

**once Lucene has terms, how does it actually write them into the index and make them visible?**

That is the job of the write path, centered around **`IndexWriter`**.

This part is where many Lucene concepts finally connect:

- analyzers produce terms
- documents become buffered write operations
- buffered writes become new segments
- commits make changes durable
- reader reopening makes changes visible
- updates and deletes reshape the index over time

If Part 2 explained **what the index contains**, and Part 4 explained **how terms are produced**, this part explains **how the index evolves**.

---

## `IndexWriter` is the engine of change

At a high level, Lucene does not let every document write directly into some single giant monolithic index file.

Instead, indexing flows through **`IndexWriter`**, which manages:

- buffering documents in memory
- applying analysis
- writing new segment files
- tracking deletes and updates
- coordinating commits
- managing merge activity

A useful mental model is:

```text
Incoming document operations
        |
        v
    IndexWriter
        |
        +--> in-memory buffers
        +--> new segment creation
        +--> delete/update bookkeeping
        +--> commit coordination
        +--> merge management
```

This design matters because Lucene is optimized for **append-oriented segment creation**, not in-place mutation of one huge structure.

That single idea explains a lot of Lucene behavior:

- why updates are not true in-place rewrites
- why deletes do not immediately reclaim space
- why flush and commit are different
- why near-real-time visibility is possible

---

## Lucene does not rewrite the whole index for every document

A beginner often imagines indexing like this:

```text
add document -> rewrite index
add document -> rewrite index
add document -> rewrite index
```

That would be extremely expensive.

Lucene instead behaves more like:

```text
add document -> buffer in memory
add document -> buffer in memory
add document -> buffer in memory
flush         -> write a new segment
```

So the write path is typically:

1. accept document operations
2. analyze fields
3. buffer postings and metadata in memory
4. periodically flush buffered state into a new segment
5. later commit that state for durability

This is one reason Lucene scales much better than a naive "rewrite everything" design.

---

## Flush: from in-memory buffers to a new segment

A **flush** happens when Lucene decides buffered indexing state should be written out as segment files.

Flush can be triggered for reasons like:

- RAM usage crossing a configured threshold
- internal buffering conditions
- certain lifecycle events inside the writer

Conceptually:

```text
Document additions
   |
   v
Analyzed and buffered in memory
   |
   v
Flush
   |
   v
New segment written
```

### What flush does mean

- buffered document changes are written into one or more segment files
- the writer has converted in-memory indexing work into on-disk index structures

### What flush does **not** necessarily mean

- the changes are durable across crashes
- external readers automatically see the changes
- the index now has a new stable commit point

This distinction is critical. Many Lucene misunderstandings start with assuming flush and commit are the same thing.

---

## Commit: making changes durable

A **commit** is about durability and stable index state.

When Lucene commits, it records a new committed view of the index so that the changes survive process restarts or crashes according to Lucene's durability semantics.

Conceptually:

```text
Buffered writes -> flush -> segment files exist
                               |
                               v
                             commit
                               |
                               v
                    new durable commit point
```

### The simplest distinction

| Operation | Main purpose |
|---|---|
| flush | write buffered indexing state into segment files |
| commit | publish a durable committed index state |

That means:

- flush is about **materializing work**
- commit is about **durability**

### Why frequent commits are expensive

Commits are heavier because they must establish a durable index state. If you commit after every single document, you lose much of Lucene's batching advantage.

So in practice, Lucene systems often:

- buffer many changes
- flush as needed
- commit less frequently and more deliberately

This is one of the core performance trade-offs in indexing systems.

---

## Visibility is not identical to durability

Another crucial distinction:

> a document can become searchable before it is durably committed

This is the foundation of **near-real-time (NRT) search**.

You can think of Lucene as managing at least two related questions:

1. **Can a searcher see the latest changes yet?**
2. **Would those changes survive a crash right now?**

Those are not the same question.

That is why the write lifecycle must be understood in three separate dimensions:

| Dimension | Question |
|---|---|
| buffering | is the change still only in memory? |
| visibility | can a reader/searcher observe it? |
| durability | would it survive restart or crash? |

Once you separate those concerns, Lucene's behavior becomes much easier to reason about.

---

## Near-real-time search

Lucene's near-real-time model exists so applications do not need to wait for a full durable commit before freshly indexed content can be searched.

The basic idea is:

- writes go through `IndexWriter`
- new segments or writer-managed changes become available to a new reader
- a reopened reader can search newer content
- durability can still lag behind visibility

Conceptually:

```text
add/update/delete
      |
      v
  IndexWriter state changes
      |
      v
reopen / refresh reader
      |
      v
new searcher sees latest visible state
```

This is why Lucene-powered systems can feel responsive without committing after every write.

In Lucene applications, this is often coordinated by reopening readers from the writer and then handing them to search infrastructure such as `SearcherManager` rather than by forcing a full commit for each refresh cycle.

### Why NRT matters operationally

Without NRT, systems that need fresh search results would be forced into:

- very frequent commits, which are expensive
- or long delays before new content appears in search

NRT gives you a middle ground:

- **fast visibility**
- **separate durability timing**

That balance is one of Lucene's most important design strengths.

---

## Documents become segments, not row updates

As writes accumulate, Lucene creates **segments**.

A segment is effectively a self-contained mini-index with its own:

- term dictionary
- postings
- stored fields
- DocValues
- deletion state

During indexing, the picture often looks like:

```text
Index
├── older segment A
├── older segment B
└── newly flushed segment C
```

This is why Lucene is often described as append-friendly. It prefers creating new immutable-ish segment structures rather than constantly rewriting old ones in place.

That has major consequences for:

- write throughput
- merge behavior
- delete handling
- searcher reopening

We will go deeper into segment merging later, but even here you should keep one idea in mind:

> the write path creates segment growth over time, and merges are how Lucene later reorganizes that growth

---

## Updates are really delete plus add

This is one of the most important things to understand about Lucene writes.

When you "update" a document, Lucene does not typically open the old segment and surgically rewrite one record in place.

Conceptually, an update is:

```text
find old matching document(s)
mark them deleted
add the new replacement document
```

So:

```text
update id=42
```

behaves more like:

```text
delete old document where id=42
add new version of document id=42
```

More precisely, Lucene's `updateDocument(Term, doc)` is **term-based**. If that update term matches multiple existing documents, Lucene will delete all of those matches before adding the replacement document. That is why update keys should usually be unique exact-match identifiers.

### Why Lucene does this

Because Lucene's core storage model is segment-oriented and append-friendly. In-place mutation would be far more complex and expensive.

### What this means for practitioners

- updates create new index content
- old versions may remain physically present until merges reclaim them
- update-heavy workloads behave differently from append-only workloads

This also explains why identifier fields used for updates must be modeled carefully and usually require exact-match semantics.

---

## Deletes are logical first, physical later

Deletes in Lucene are usually **logical** before they become **physically reclaimed**.

That means:

- a document can be marked deleted
- searches stop treating it as a live match
- but the bytes used by the old document are not necessarily reclaimed immediately

Why?

Because Lucene avoids expensive in-place rewriting of old segments wherever possible.

Instead, reclaiming deleted space usually happens later when merges rewrite segments into cleaner consolidated ones.

### Practical consequence

If you delete a lot of documents, do not assume index size instantly shrinks.

The search behavior may update quickly, while the storage footprint lags behind.

This is another recurring Lucene theme:

> logical search state and physical disk layout evolve on related but different timelines

---

## A simple write lifecycle example

Suppose you add three blog posts:

```text
add post-1
add post-2
add post-3
```

Lucene may:

1. analyze and buffer them in memory
2. flush them into a new segment
3. make them visible to a reopened searcher
4. later commit them durably

Now suppose you update `post-2`:

```text
update post-2
```

Lucene may effectively do:

1. mark the old `post-2` as deleted
2. add the new `post-2` version through the writer
3. expose the new version through NRT reopening
4. later reclaim the old bytes during merges

Now suppose you delete `post-1`:

```text
delete post-1
```

Lucene may:

1. mark `post-1` deleted
2. stop returning it in search results
3. keep its physical footprint around until merge cleanup

This sequence captures much of the real operational behavior of Lucene indexing.

---

## Why segments and merges already matter here

Even though a later part will cover segments and merges in more detail, you cannot really understand the write path without acknowledging them.

Every flush can produce more segments.

Too many small segments can hurt performance because searches may need to coordinate across more segment readers and metadata.

That is why Lucene later merges segments:

- to reduce fragmentation
- to reclaim deleted space
- to maintain healthier index structure

So the write path is not just "append forever." It is:

```text
buffer -> flush -> create segments -> accumulate changes -> merge later
```

This lifecycle is one of Lucene's core architectural rhythms.

---

## Common misunderstandings about writing to Lucene

### 1. Thinking flush means commit

It does not.

Flush materializes buffered work; commit establishes durability.

### 2. Thinking commit is required for every visible change

It is not.

Near-real-time search allows visibility before durable commit.

### 3. Thinking updates modify documents in place

They usually do not.

Updates are effectively delete-plus-add operations.

### 4. Thinking deletes instantly reclaim disk

They usually do not.

Deletes first change logical search visibility, while physical cleanup usually waits for merges.

### 5. Thinking too many commits are harmless

They are not.

Over-committing can severely reduce indexing efficiency.

---

## A practical debugging checklist for write-path confusion

When indexing behavior looks wrong, ask:

1. **Was the document actually added through the writer?**
2. **Was buffered state flushed yet?**
3. **Is the new state visible to the searcher I am using?**
4. **Was a durable commit required for this scenario, and did it happen?**
5. **Am I observing old and new versions because an update is really delete plus add?**
6. **Am I expecting deleted space to disappear before merges have run?**

Many "Lucene indexing bugs" are actually misunderstandings about which stage of the lifecycle you are currently observing.

---

## A compact mental model to keep

If you want one durable mental model for the write path, use this:

```text
IndexWriter accepts change operations
Buffers turn those changes into in-memory indexing state
Flush writes that state into new segments
Commit makes a stable durable index state
Reader reopening exposes newer visible state
Updates are delete + add
Deletes are logical first, physical later
Merges clean up and reorganize over time
```

This model is simple enough for a beginner but strong enough to explain real operational behavior in production systems.

---

## Key takeaways

- `IndexWriter` is the central engine of Lucene's write lifecycle.
- Lucene buffers writes and creates new segments instead of rewriting one giant index in place.
- Flush and commit are different: one materializes work, the other establishes durability.
- Visibility and durability are separate concerns.
- Near-real-time search lets new content appear before full commit.
- Updates are effectively delete-plus-add operations.
- Deletes affect logical visibility before physical storage is reclaimed.
- Segments and merges already shape write behavior long before you start tuning them explicitly.

Once this mental model clicks, Lucene indexing stops feeling mysterious. You can reason about whether a document is buffered, visible, committed, deleted, or simply waiting for merge cleanup.

---

## What's next?

In the next part, we will move from **how Lucene writes the index** to **how it reads and searches it**: `IndexReader`, `IndexSearcher`, query execution, collectors, and how Lucene turns query terms into ranked results.
