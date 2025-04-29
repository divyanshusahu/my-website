import Head from "next/head";
import Script from "next/script";

import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const jsonld_website = {
    "@context": "http://schema.org",
    "@type": "WebSite",
    name: "Divyanshu Sahu",
    url: "https://www.divyanshu.pro",
    creator: { "@type": "Person", name: "Divyanshu Sahu" },
    keywords: [
      "Divyanshu Sahu",
      "Senior Software Engineer",
      "DevOps",
      "Apache Lucene",
      "Search Technologies",
      "Elasticsearch",
      "Solr",
      "Full Stack",
      "Developer",
      "IIT",
      "Roorkee",
      "Zeus Numerix",
      "Blinkit",
      "Grofers",
      "Zomato",
      "ReactJS",
      "Django",
      "NextJS",
      "NodeJS",
      "CI/CD",
      "Kubernetes",
      "Docker",
      "Cloud Infrastructure",
      "AWS",
      "Indexing",
      "Search Architecture",
      "Information Retrieval",
      "Full-text Search",
      "Blog",
      "Technical Blog"
    ],
    sameAs: [
      "https://www.facebook.com/divyanshu.sahu1997",
      "https://www.instagram.com/_divyanshusahu_/",
      "https://www.linkedin.com/in/divyanshu-sahu/",
    ],
  };
  
  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Divyanshu Sahu's Blog",
    "description": "Technical writings on DevOps, Apache Lucene, search technologies, and software engineering",
    "url": "https://www.divyanshu.pro/blogs",
    "author": {
      "@type": "Person",
      "name": "Divyanshu Sahu",
      "url": "https://www.divyanshu.pro"
    }
  };

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Divyanshu Sahu | Senior Software Engineer</title>
        <meta
          name="description"
          content="Divyanshu Sahu. Senior Software Engineer with expertise in DevOps and Apache Lucene search technologies.
        B.Tech in Computer Science from Indian Institute of Technology, Roorkee. Currently 
        in Blinkit(formerly Grofers) and Zomato. Blog about search technologies and DevOps practices."
        />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />

        <meta name="robots" content="index,follow" />
        <meta name="googlebot" content="index,follow" />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="divyan5hu" />
        <meta name="twitter:creator" content="divyan5hu" />
        <meta
          name="twitter:url"
          content="https://www.divyanshu.pro"
        />
        <meta name="twitter:title" content="Divyanshu Sahu" />
        <meta
          name="twitter:description"
          content="Senior Software Engineer with expertise in DevOps and Apache Lucene. Read my tech blog for insights on search technologies and cloud infrastructure."
        />
        <meta
          name="twitter:image"
          content="https://www.divyanshu.pro/profile.jpeg"
        />
        <meta name="twitter:image:alt" content="Profile" />

        <meta
          property="og:url"
          content="https://www.divyanshu.pro"
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Divyanshu Sahu" />
        <meta
          property="og:description"
          content="Senior Software Engineer with expertise in DevOps and Apache Lucene. Read my tech blog for insights on search technologies and cloud infrastructure."
        />
        <meta
          property="og:image"
          content="https://www.divyanshu.pro/profile.jpeg"
        />
        <meta property="og:image:alt" content="Profile" />
        <meta property="og:site_name" content="Divyanshu's Personal Website" />
        <meta property="og:locale" content="en_US" />
      </Head>

      {/* Theme script - runs before the page renders to prevent flash of wrong theme */}
      <Script
        id="theme-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              try {
                const storedPreference = localStorage.getItem('darkMode');
                // Default to dark mode if preference is not set
                const isDarkMode = storedPreference === null ? true : storedPreference === 'true';
                if (isDarkMode) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (e) {
                // If localStorage is not available or throws an error, default to dark mode
                document.documentElement.classList.add('dark');
                console.error('Error accessing localStorage:', e);
              }
            })();
          `,
        }}
      />

      <Script
        key="jsonld_website"
        id="jsonld-website"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonld_website) }}
      />
      
      <Script
        key="jsonld_blog"
        id="jsonld-blog"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />

      <Script
        id="google-tag-manager"
        src="https://www.googletagmanager.com/gtag/js?id=UA-169266417-2"
        async
      />
      <Script
        id="google-tag-mamager-2"
        dangerouslySetInnerHTML={{
          __html: ` window.dataLayer = window.dataLayer || [];
                      function gtag(){dataLayer.push(arguments);}
                      gtag('js', new Date());
                      gtag('config', 'UA-169266417-2');`,
        }}
      />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
