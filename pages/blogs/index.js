import Link from "next/link";
import Head from "next/head";
import { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import Footer from "../../components/Footer";
import { getAllBlogs } from "../../lib/blog";

function BlogCard({ blog }) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="terminal-card group hover:scale-[1.01] transition-all duration-300 mb-6"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="terminal-card-header">
        <div className="terminal-dot terminal-dot-red"></div>
        <div className="terminal-dot terminal-dot-yellow"></div>
        <div className="terminal-dot terminal-dot-green"></div>
        <div className="ml-2 text-xs text-slate-400 font-mono">{blog.slug}.md</div>
      </div>
      
      <div className="px-5 py-4 dark:bg-slate-800 bg-slate-100">
        <Link href={`/blogs/${blog.slug}`} className="block">
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 transition-colors duration-200 hover:text-emerald-600 dark:hover:text-emerald-400 font-mono flex items-center">
            <span className="text-emerald-500 mr-2">&gt;</span>
            {blog.title}
            {isHovered && <span className="inline-block w-2 h-5 bg-emerald-500 ml-2 animate-pulse"></span>}
          </h2>
        </Link>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 font-mono">
          <span className="text-emerald-500">#</span> {new Date(blog.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <p className="text-slate-600 dark:text-slate-300 mt-3 pl-4 border-l-2 border-slate-300 dark:border-slate-600">
          {blog.description}
        </p>
        <div className="mt-4 flex flex-wrap gap-1">
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
      </div>
    </div>
  );
}

function BlogIndex({ blogs }) {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);
  
  // Create structured data for blog listing
  const blogListSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "headline": "Blog Posts by Divyanshu Sahu",
    "description": "Blogs on technology, application security, web development, and programming best practices.",
    "url": "https://www.divyanshu.pro/blogs",
    "author": {
      "@type": "Person",
      "name": "Divyanshu Sahu"
    },
    "inLanguage": "en-US",
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": blogs.map((blog, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "url": `https://www.divyanshu.pro/blogs/${blog.slug}`,
        "name": blog.title,
        "description": blog.description
      }))
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>Blog | Divyanshu Sahu</title>
        <meta
          name="description"
          content="Technical articles and insights on web development, application security, search engines, and programming best practices."
        />
        
        {/* SEO meta tags */}
        <meta name="keywords" content="blog, technical writing, coding tutorials, web development, application security, Lucene, search engine, programming, full-stack development" />
        <meta name="author" content="Divyanshu Sahu" />
        
        {/* Open Graph meta tags */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Blog | Divyanshu Sahu" />
        <meta property="og:description" content="Technical articles and insights on web development, application security, search engines, and programming best practices." />
        <meta property="og:url" content="https://www.divyanshu.pro/blogs" />
        <meta property="og:image" content="https://www.divyanshu.pro/profile.jpeg" />
        <meta property="og:site_name" content="Divyanshu Sahu's Blog" />
        
        {/* Twitter Card meta tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Blog | Divyanshu Sahu" />
        <meta name="twitter:description" content="Technical articles and insights on web development, application security, search engines, and programming best practices." />
        <meta name="twitter:image" content="https://www.divyanshu.pro/profile.jpeg" />
        
        {/* Schema.org structured data */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogListSchema) }} />
        
        {/* Additional meta tags for blog discovery */}
        <link rel="canonical" href="https://www.divyanshu.pro/blogs" />
      </Head>

      <div className="flex-grow">
        <Layout>
          <div className="px-4 py-16 relative">
            {/* Background decorative elements */}
            <div className="absolute top-10 right-10 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl -z-10"></div>
            <div className="absolute bottom-40 left-10 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl -z-10"></div>
            
            <div className={`opacity-0 ${isLoaded ? 'animate-fade-in' : ''}`}>
              <h1 className="mb-12 text-3xl font-bold text-center">
                <span className="relative inline-block">
                  <span className="text-slate-800 dark:text-slate-100 font-mono">
                    <span className="text-emerald-500">&lt;</span> Blog Posts <span className="text-emerald-500">/&gt;</span>
                  </span>
                  <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full transform origin-left"></span>
                </span>
              </h1>
              
              <div className="max-w-3xl mx-auto">
                {blogs.length > 0 ? (
                  blogs.map((blog, index) => (
                    <div 
                      key={blog.slug} 
                      className="opacity-0 animate-slide-up"
                      style={{ animationDelay: `${0.1 * index}s`, animationFillMode: 'forwards' }}
                    >
                      <BlogCard blog={blog} />
                    </div>
                  ))
                ) : (
                  <div className="terminal-card opacity-0 animate-fade-in" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
                    <div className="terminal-card-header">
                      <div className="terminal-dot terminal-dot-red"></div>
                      <div className="terminal-dot terminal-dot-yellow"></div>
                      <div className="terminal-dot terminal-dot-green"></div>
                      <div className="ml-2 text-xs text-slate-400 font-mono">status.log</div>
                    </div>
                    <div className="terminal-card-content">
                      <p className="text-slate-600 dark:text-slate-300 font-mono">
                        <span className="text-emerald-500">$</span> find ./posts -name &quot;*.md&quot;<br />
                        <span className="text-yellow-500">No files found.</span><br /><br />
                        <span className="text-emerald-500">$</span> echo &quot;No blog posts found. Check back soon!&quot;
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Layout>
      </div>
      <Footer />
    </div>
  );
}

export async function getStaticProps() {
  const blogs = getAllBlogs();
  return {
    props: {
      blogs,
    },
  };
}

export default BlogIndex;