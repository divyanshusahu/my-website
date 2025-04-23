import Link from "next/link";
import Head from "next/head";
import Layout from "../../components/Layout";
import Footer from "../../components/Footer";
import { getAllBlogs } from "../../lib/blog";

function BlogCard({ blog }) {
  return (
    <div className="border px-4 py-4 rounded-xl dark:border-slate-700 transition-colors duration-200 dark:bg-slate-800 mb-6">
      <Link href={`/blogs/${blog.slug}`}>
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 transition-colors duration-200 hover:text-sky-600 dark:hover:text-sky-400">
          {blog.title}
        </h2>
      </Link>
      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
        {new Date(blog.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>
      <p className="text-slate-600 dark:text-slate-300 mt-3">{blog.description}</p>
      <div className="mt-4 flex flex-wrap gap-1">
        {blog.tags && blog.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-slate-100 dark:bg-slate-700 px-3 py-1 text-xs text-slate-500 dark:text-slate-300"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

function BlogIndex({ blogs }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>Blogs | Divyanshu Sahu</title>
        <meta
          name="description"
          content="Blogs by Divyanshu Sahu on technology, application security, and web development."
        />
      </Head>

      <div className="flex-grow">
        <Layout>
          <div className="px-4 py-16">
            <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 transition-colors duration-200 mb-8">
              Blog Posts
            </h1>
            
            {blogs.length > 0 ? (
              blogs.map((blog) => <BlogCard key={blog.slug} blog={blog} />)
            ) : (
              <p className="text-slate-600 dark:text-slate-300">No blog posts yet. Check back soon!</p>
            )}
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