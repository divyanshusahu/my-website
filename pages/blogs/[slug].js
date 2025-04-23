import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import Layout from "../../components/Layout";
import Footer from "../../components/Footer";
import { getAllBlogSlugs, getBlogBySlug } from "../../lib/blog";

function BlogPost({ blog, mdxSource }) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>{blog.title} | Divyanshu Sahu</title>
        <meta name="description" content={blog.description} />
      </Head>

      <div className="flex-grow">
        <Layout>
          <div className="px-4 py-16">
            <div className="mb-6">
              <Link
                href="/blogs"
                className="text-slate-600 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-400 inline-flex items-center"
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
                Back to blogs
              </Link>
            </div>

            <article>
              <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 transition-colors duration-200">
                {blog.title}
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 mb-6">
                {new Date(blog.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {blog.tags && blog.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-slate-100 dark:bg-slate-700 px-3 py-1 text-xs text-slate-500 dark:text-slate-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="prose prose-slate dark:prose-invert max-w-none">
                <MDXRemote {...mdxSource} />
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