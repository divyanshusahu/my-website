import Head from "next/head";

import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const jsonld_website = {
    "@context": "http://schema.org",
    "@type": "WebSite",
    name: "Divyanshu Sahu",
    url: "https://www.divyanshusahu.vercel.app",
    creator: { "@type": "Person", name: "Divyanshu Sahu" },
    keywords: [
      "Divyanshu Sahu",
      "Full Stack",
      "Developer",
      "Application",
      "Security",
      "Information Security",
      "IIT",
      "Roorkee",
      "Zeus Numerix",
      "Blinkit",
      "Grofers",
      "Zomato",
      "ReactJS",
      "Django",
      "NextJS",
      "Flask",
      "NodeJS",
      "Python",
      "FastAPI",
    ],
    sameAs: [
      "https://www.facebook.com/divyanshu.sahu1997",
      "https://www.instagram.com/_divyanshusahu_/",
      "https://www.linkedin.com/in/divyanshu-sahu/",
    ],
  };

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Divyanshu Sahu | Full Stack Developer</title>
        <meta
          name="description"
          content="Divyanshu Sahu. Full Stack Developer and Application Security Enthusiast.
        B.Tech in Computer Science from Indian Institute of technology, Roorkee. Currently 
        in Blinkit(formerly Grofers) and Zomato."
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
          content="https://www.divyanshusahu.vercel.app"
        />
        <meta name="twitter:title" content="Divyanshu Sahu" />
        <meta
          name="twitter:description"
          content="Full Stack Developer and Application Security Enthusiast."
        />
        <meta
          name="twitter:image"
          content="https://www.divyanshusahu.vercel.app/profile.jpeg"
        />
        <meta name="twitter:image:alt" content="Profile" />

        <meta property="og:url" content="https://www.divyanshusahu.vercel.app" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Divyanshu Sahu" />
        <meta
          property="og:description"
          content="Full Stack Developer and Application Security Enthusiast."
        />
        <meta
          property="og:image"
          content="https://www.divyanshusahu.vercel.app/profile.jpeg"
        />
        <meta property="og:image:alt" content="Profile" />
        <meta property="og:site_name" content="Divyanshu's Personal Website" />
        <meta property="og:locale" content="en_US" />

        <script
          key="jsonld_website"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonld_website) }}
        />

        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=UA-169266417-2"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: ` window.dataLayer = window.dataLayer || [];
                      function gtag(){dataLayer.push(arguments);}
                      gtag('js', new Date());
                      gtag('config', 'UA-169266417-2');`,
          }}
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
