import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import Layout from "../../components/Layout";
import Footer from "../../components/Footer";
import { getAllBlogSlugs, getBlogBySlug } from "../../lib/blog";

function BlogPost({ blog, mdxSource }) {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);
  // Calculate estimated reading time
  const readingTime = blog.content ? Math.ceil(blog.content.split(' ').length / 200) : 0;
  // Format date for display and structured data
  const formattedDate = new Date(blog.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  // ISO date for structured data
  const isoDate = new Date(blog.date).toISOString();
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  if (router.isFallback) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-emerald-500 border-r-transparent"></div>
          <p className="mt-4 text-slate-800 dark:text-slate-200 font-mono">Loading...</p>
        </div>
      </div>
    );
  }

  // Schema.org structured data for blog post
  const blogPostSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": blog.title,
    "description": blog.description,
    "keywords": blog.tags ? blog.tags.join(", ") : "",
    "author": {
      "@type": "Person",
      "name": "Divyanshu Sahu"
    },
    "datePublished": isoDate,
    "image": "https://www.divyanshu.pro/profile.jpeg",
    "publisher": {
      "@type": "Person",
      "name": "Divyanshu Sahu",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.divyanshu.pro/profile.jpeg"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://www.divyanshu.pro/blogs/${blog.slug}`
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>{blog.title} | Divyanshu Sahu</title>
        <meta name="description" content={blog.description} />
        
        {/* SEO meta tags */}
        <meta name="keywords" content={blog.tags ? blog.tags.join(', ') : 'blog, technology, programming'} />
        <meta name="author" content="Divyanshu Sahu" />
        <meta property="article:published_time" content={isoDate} />
        <meta property="article:author" content="Divyanshu Sahu" />
        {blog.tags && blog.tags.map((tag, index) => (
          <meta property="article:tag" content={tag} key={index} />
        ))}
        
        {/* Open Graph meta tags */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={`${blog.title} | Divyanshu Sahu`} />
        <meta property="og:description" content={blog.description} />
        <meta property="og:url" content={`https://www.divyanshu.pro/blogs/${blog.slug}`} />
        <meta property="og:image" content="https://www.divyanshu.pro/profile.jpeg" />
        
        {/* Twitter Card meta tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={blog.title} />
        <meta name="twitter:description" content={blog.description} />
        <meta name="twitter:image" content="https://www.divyanshu.pro/profile.jpeg" />
        
        {/* Schema.org structured data */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostSchema) }} />
      </Head>

      <div className="flex-grow">
        <Layout>
          <div className="px-4 py-16 relative">
            {/* Background decorative elements */}
            <div className="absolute top-40 right-0 w-72 h-72 bg-emerald-500/5 rounded-full blur-3xl -z-10"></div>
            <div className="absolute bottom-40 left-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl -z-10"></div>
            
            <div className={`mb-6 opacity-0 ${isLoaded ? 'animate-fade-in' : ''}`}>
              <Link
                href="/blogs"
                className="text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 inline-flex items-center transition-colors duration-200 font-mono"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 mr-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                  />
                </svg>
                cd ../blogs
              </Link>
            </div>

            <article className="max-w-3xl mx-auto">
              <div className="terminal-card opacity-0 animate-fade-in" style={{ animationDelay: '0.1s' }}>
                <div className="terminal-card-header">
                  <div className="terminal-dot terminal-dot-red"></div>
                  <div className="terminal-dot terminal-dot-yellow"></div>
                  <div className="terminal-dot terminal-dot-green"></div>
                  <div className="ml-2 text-xs text-slate-400 font-mono">{blog.slug}.md</div>
                </div>
                
                <div className="px-8 py-6 dark:bg-slate-800 bg-slate-100">
                  <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 transition-colors duration-200 mb-4 font-mono">
                    <span className="text-emerald-500"># </span>
                    {blog.title}
                  </h1>
                  
                  <div className="flex flex-wrap items-center mb-6 text-sm text-slate-500 dark:text-slate-400 font-mono">
                    <span className="inline-flex items-center mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                      </svg>
                      {formattedDate}
                    </span>
                    <span className="inline-flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {readingTime} min read
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {blog.tags && blog.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-slate-200 dark:bg-slate-700 px-3 py-1 text-xs text-slate-600 dark:text-slate-300 transition-colors duration-200 border border-slate-300 dark:border-slate-600"
                      >
                        <span className="text-emerald-500">&lt;</span>
                        {tag}
                        <span className="text-emerald-500">/&gt;</span>
                      </span>
                    ))}
                  </div>

                  <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:font-mono prose-headings:text-slate-800 dark:prose-headings:text-slate-100 prose-h1:text-2xl prose-h2:text-xl prose-h2:border-b prose-h2:border-slate-200 dark:prose-h2:border-slate-700 prose-h2:pb-2 prose-a:text-emerald-600 dark:prose-a:text-emerald-400 prose-code:text-emerald-600 dark:prose-code:text-emerald-400 prose-pre:bg-slate-800 prose-pre:border prose-pre:border-slate-700">
                    <MDXRemote {...mdxSource} />
                  </div>
                </div>
              </div>
            </article>
          </div>
        </Layout>
      </div>
      <Footer />
    </div>
  );
}

export async function getStaticPaths() {
  const paths = getAllBlogSlugs();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const blog = getBlogBySlug(params.slug);
  const mdxSource = await serialize(blog.content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypeHighlight],
    },
    scope: blog,
  });

  return {
    props: {
      blog,
      mdxSource,
    },
  };
}

export default BlogPost;