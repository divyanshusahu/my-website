---
title: "Understanding Apache Lucene - Documents, Fields, Stored Values, DocValues, and Points (Part 3)"
date: '2026-04-12'
description: "A deeper look at Lucene document modeling: how to represent one logical record with multiple fields, when to use TextField vs StringField, and how stored fields, DocValues, and point fields support different query patterns."
tags: ['lucene', 'java', 'search', 'document-modeling', 'field-types', 'docvalues', 'points', 'information-retrieval']
---

# Understanding Apache Lucene (Part 3)

In [Part 2](/blogs/understanding-apache-lucene-part-2), we explored the inverted index: term dictionaries, postings, positions, offsets, and how Lucene answers queries efficiently. But real search systems are not built from terms alone. Before you can benefit from Lucene's index structures, you need to decide **how your application data is represented inside the index**.

Part 1 introduced documents, fields, and FieldTypes at a high level. In this part, we go deeper and answer the practical design question:

**How should one logical record be modeled so Lucene can search it, return it, sort it, facet it, and filter it efficiently?**

That question is where many Lucene systems succeed or fail.

---

## A Lucene document is not your domain object

This is one of the most important mindset shifts in Lucene.

Your application might have a domain object like:

```text
BlogPost {
  id: "post-42",
  title: "Lucene field modeling",
  body: "...",
  author: "Divyanshu Sahu",
  tags: ["lucene", "search"],
  publishedAt: 2026-04-12T10:00:00Z,
  views: 1350
}
```

Your application sees that as a single structured object.

Lucene does not.

Lucene sees a **Document** as a container of **Fields**, and each field is configured for a specific retrieval or query behavior. That means the Lucene representation of one logical record may contain **multiple physical fields for the same logical value**.

For example, `publishedAt` may need to support:

- display in search results
- sorting newest first
- filtering by date range

Those are three different access patterns, and Lucene does not optimize all of them with one field representation.

So the mental model should be:

```text
Application record
        |
        v
Lucene document
        |
        +--> fields for full-text retrieval
        +--> fields for exact matching
        +--> fields for sorting/faceting
        +--> fields for numeric/date ranges
        +--> fields for returning original values
```

This is why Lucene field modeling is not just a schema exercise. It is an **access-pattern design exercise**.

---

## The five questions to ask for every field

Whenever you add a field to a Lucene document, ask:

1. **Should this be searchable?**
2. **If searchable, should it be tokenized or exact-match only?**
3. **Should the original value be retrievable in results?**
4. **Should it support sorting, faceting, or aggregations?**
5. **Should it support numeric/date range queries?**

Each answer points you toward a different Lucene field strategy.

Here is the simplest mental map:

| Need | Typical Lucene strategy |
|---|---|
| Full-text search | `TextField` |
| Exact match / identifier / keyword filter | `StringField` |
| Return original value | `StoredField` or a stored searchable field |
| Sorting / faceting / aggregations | `DocValues` field |
| Numeric/date range query | `IntPoint`, `LongPoint`, `FloatPoint`, `DoublePoint` |

The important part is that **one logical field may need more than one of these at the same time**.

---

## Full-text fields vs exact-match fields

The most common beginner mistake is to treat all strings the same.

Lucene does not.

### `TextField`: for analyzed full-text content

Use `TextField` when you want text to be broken into searchable terms by an analyzer.

Typical examples:

- title
- body
- comments
- description

If the value is:

```text
"Understanding Lucene internals"
```

an analyzer may produce terms like:

```text
understanding, lucene, internals
```

This makes it suitable for:

- term queries
- phrase queries
- full-text matching
- relevance scoring

But it also means the field is **not an exact string container anymore**.

### `StringField`: for exact-match semantics

Use `StringField` when the entire value should be treated as one exact token.

Typical examples:

- document ID
- SKU
- status
- category key
- country code
- tag value when tags are exact keywords

If the value is:

```text
"ORDER_PENDING"
```

Lucene indexes it as one whole term, not as `order` and `pending`.

That makes `StringField` ideal for:

- filters
- exact term lookup
- structured metadata

It is a bad choice for free-text fields like article body or title.

If you need **exact-match semantics with light normalization** (for example lowercasing or accent folding on identifiers, tags, or country codes), the usual pattern is to normalize the value before indexing or to keep a separate keyword-style field with `KeywordTokenizer` plus light filters. Do not treat structured values like prose just to get normalization.

### The wrong pairings to avoid

- `TextField` for IDs -> tokenization breaks exact matching
- `StringField` for article body -> no real full-text search behavior

This single distinction drives a large part of practical Lucene correctness.

---

## Searchable is not the same as retrievable

Another very common confusion:

> "If a field is indexed, Lucene can return its original value, right?"

Not necessarily.

An indexed field is optimized for search structures, not for reconstructing your original document in display form.

For example, if you index:

```text
body = "Lucene builds efficient inverted indexes"
```

as a non-stored `TextField`, Lucene can search it, but it may not return the original text in the search result.

That is where **stored fields** come in.

### Stored fields

Stored fields are for retrieval, not query acceleration.

They are useful when you want to return:

- title
- URL
- author name
- short excerpt
- metadata shown in result cards

Conceptually:

```text
searchable index path   -> "Can this field help match a query?"
stored field path       -> "Can I return this original value to the caller?"
```

Those are different concerns.

### A useful rule of thumb

- **Indexed** answers: "Can I search/filter on it?"
- **Stored** answers: "Can I return it directly from Lucene?"

You often want both, but they are not the same feature.

---

## DocValues: column-oriented data for sorting and faceting

The inverted index is optimized for **term -> documents** access.

Sorting and faceting need a different access pattern. They often need something closer to:

```text
document -> value
```

That is why Lucene has **DocValues**.

DocValues are column-oriented field representations designed for:

- sorting
- faceting/grouping foundations
- aggregations
- fast per-document value access during query evaluation

If you want to sort blog posts by `publishedAt` or products by `price`, the right question is not:

> "Is this field searchable?"

It is:

> "Can Lucene access this value efficiently for every matching document during sorting?"

That is what DocValues are for.

### Common DocValues families

| Field type | Typical use |
|---|---|
| `NumericDocValuesField` | numeric sort keys, scores, counters, timestamps |
| `SortedDocValuesField` | single-valued keyword sort/group field |
| `SortedSetDocValuesField` | multi-valued keyword faceting/grouping field |
| `SortedNumericDocValuesField` | multi-valued numeric field support |

### What DocValues are not

DocValues are not a replacement for full-text indexing.

If you add only a `SortedDocValuesField` for `author`, you can sort or group on it, but you have not automatically made it full-text searchable.

This is another place where one logical field may need two physical representations:

```text
author -> StringField / TextField for search
author -> DocValues field for sorting/faceting
```

---

## Point fields: for numeric and range queries

Full-text indexing is not the right tool for numeric and date range queries.

You do not want a price field to behave like text. You want efficient questions like:

- `price between 500 and 1500`
- `publishedAt >= last_30_days`
- `rating > 4.5`

That is what **point fields** are for.

Typical point types include:

- `IntPoint`
- `LongPoint`
- `FloatPoint`
- `DoublePoint`

These are backed by spatial/numeric index structures optimized for range lookup rather than text retrieval.

### Important limitation

Point fields are excellent for filtering and range search, but they are **not stored automatically** and they are **not DocValues automatically**.

So if you want:

- range query on `price`
- sort by `price`
- show `price` in results

you may need:

```text
price -> DoublePoint
price -> NumericDocValuesField
price -> StoredField
```

This is one of the cleanest examples of Lucene's design philosophy:

**different access patterns, different structures**

---

## One logical field, multiple Lucene fields

This is the core design pattern of practical Lucene indexing.

Take a `publishedAt` field:

| Requirement | Lucene representation |
|---|---|
| Filter by date range | `LongPoint` |
| Sort newest first | `NumericDocValuesField` |
| Return value in results | `StoredField` |

Or a `tags` field:

| Requirement | Lucene representation |
|---|---|
| Exact tag filtering | `StringField` |
| Faceting over tags | `SortedSetDocValuesField` |
| Display tags in result payload | stored variant or stored keyword field |

Or a `title` field:

| Requirement | Lucene representation |
|---|---|
| Full-text search | `TextField` |
| Show exact title in results | stored `TextField` or additional `StoredField` |
| Optional custom sorting | separate keyword/DocValues representation if needed |

This pattern can feel redundant at first, but it is actually a strength. Lucene is explicit about what you want the system to optimize for.

---

## A realistic blog-post mapping

Let us model a blog post more rigorously than Part 1 did.

```text
BlogPost {
  id: "lucene-part-3",
  title: "Documents, Fields, and DocValues",
  body: "...long article body...",
  author: "Divyanshu Sahu",
  tags: ["lucene", "search", "java"],
  publishedAt: 1712966400000,
  readingTimeMinutes: 12
}
```

One reasonable Lucene mapping could look like this:

| Logical field | Lucene field(s) | Why |
|---|---|---|
| `id` | `StringField` + stored | exact lookup and retrieval |
| `title` | stored `TextField` | full-text title matching plus display |
| `body` | non-stored `TextField` | large full-text content without retrieval overhead |
| `author` | `StringField` + `SortedDocValuesField` + stored | filter, sort/group, display |
| `tags` | multivalued `StringField` + `SortedSetDocValuesField` + stored | filtering, faceting, display |
| `publishedAt` | `LongPoint` + `NumericDocValuesField` + `StoredField` | range query, sorting, retrieval |
| `readingTimeMinutes` | `IntPoint` + `NumericDocValuesField` + `StoredField` | filtering, sorting, retrieval |

Notice what is happening here:

- the **body** is searchable but not stored
- **author** has both exact-match and DocValues representations
- **publishedAt** appears in three different forms

This is a very normal Lucene document.

---

## Multi-valued fields

Lucene allows multiple values for the same field name by adding the field more than once.

For example:

```text
tags: "lucene"
tags: "search"
tags: "java"
```

This works naturally for exact matching:

- `tags:lucene`
- `tags:java`

But multi-valued behavior becomes especially important when you want faceting or grouping. That is where `SortedSetDocValuesField` or other multi-valued DocValues representations come into play.

In practical Lucene applications, "faceting" often means using the **facets module**, commonly backed by either **taxonomy-based facets** or **sorted-set DocValues facets**. So DocValues are a very common substrate for faceting, but they are not the entire faceting story by themselves.

The key design point is:

> multi-valued is not a special schema flag first; it is often just repeated field insertion with compatible field types

That flexibility is powerful, but you still need the right structure for the operations you care about.

---

## Choosing field strategies by use case

Here is a practical cheat sheet.

| If you need... | Prefer... | Avoid... |
|---|---|---|
| search inside natural language text | `TextField` | `StringField` |
| exact lookup by ID or status | `StringField` | tokenized text fields |
| numeric/date range filtering | point fields | text-based numeric indexing |
| sorting by numeric/date/keyword values | DocValues | relying on stored fields |
| returning the original value | stored fields | assuming indexed fields are enough |
| tag/category faceting | exact-match field + DocValues | tokenized tags for structured filtering |

This table is simple, but it captures many of the decisions that separate a toy index from a production-ready one.

---

## Common mistakes in Lucene field modeling

### 1. Tokenizing identifiers

If you index order IDs, UUIDs, or status codes with `TextField`, you may get surprising matches and broken filters.

Use exact-match semantics for structured identifiers.

### 2. Expecting stored data from non-stored fields

Searchability and retrievability are separate.

If the field is not stored, do not expect Lucene to hand the original value back conveniently.

### 3. Using point fields and expecting sorting

Point fields help range search. They do not automatically solve sorting.

Sorting usually needs DocValues.

### 4. Using DocValues and expecting full-text search

DocValues are not your analyzer-driven text index.

They support efficient per-document value access, not normal full-text retrieval semantics.

### 5. Forgetting that the same logical value may need multiple fields

This is the biggest conceptual mistake of all. Many Lucene designs become awkward because the author keeps looking for one magical field type that does everything.

Lucene is deliberately more explicit than that.

---

## A helpful way to think about Lucene storage paths

When deciding how to model a field, mentally split Lucene into four broad paths:

```text
Logical value
   |
   +--> Inverted index   -> full-text / exact term matching
   +--> Stored fields    -> returning original values
   +--> DocValues        -> sorting / faceting / aggregations
   +--> Point structures -> numeric and date range filtering
```

Then ask:

- Which of these paths does this value need?
- Which of them can I safely skip?

That framing helps prevent both under-indexing and unnecessary duplication.

---

## Why this matters for performance and index size

Every field decision has a cost.

- storing large text bodies increases index size
- term vectors add more metadata
- DocValues create additional columnar structures
- point fields add numeric indexing structures
- duplicating the same logical value in multiple forms increases write cost

That does **not** mean duplication is bad. It means duplication should be intentional.

Good Lucene design is not:

> "Store everything everywhere just in case."

It is:

> "Represent each value only in the structures needed by real query and result behavior."

That balance is what keeps an index both capable and efficient.

---

## Key takeaways

- A Lucene document is a search-oriented representation, not a direct copy of your domain object.
- One logical field often needs multiple Lucene fields.
- `TextField` and `StringField` serve very different purposes.
- Stored fields handle retrieval, not search acceleration.
- DocValues handle sorting, faceting, and per-document value access.
- Point fields handle numeric and date range queries.
- Good field modeling starts from **access patterns**, not from raw data types alone.

Once you internalize this, Lucene schema decisions become much more mechanical. You stop guessing field types and start mapping behavior to storage structures deliberately.

---

## What's next?

In the next part, we will go deep into the **analysis pipeline** itself: how character filters, tokenizers, and token filters transform raw text into the terms that Lucene actually indexes and searches.
