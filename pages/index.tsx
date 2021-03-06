import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import jsbeautify from "js-beautify";
import { CopyToClipboard } from "react-copy-to-clipboard";

const Home: NextPage = () => {
  const [clipboard, setClipboard] = useState("Copy to clipboard");
  const [intefaceContent, setInterfaceContent] = useState(`
  interface IEmployee {
    empCode: number;
    empName: string;
    salary: number; 
    managerName: string; 
}`);
  const [sampleJsonContent, setSampleJsonContent] = useState("");

  useEffect(() => {
    let sampleJson = intefaceContent.trim().split("{")[1];
    sampleJson = "{\n" + sampleJson;
    sampleJson = sampleJson
      .replace(/number+/g, "2")
      .replace(/string+/g, "test")
      .replace(/;+/g, ",")
      .replace(/:+/g, ":")
      .substring(2, sampleJson.length - 4);
    // .substring(0, sampleJson.length - 5) + "}".trim();

    let words = sampleJson.split(",");

    let final;
    for (let s of words) {
      final =
        final + `"${s.trim().split(":")[0]}":"${s.trim().split(":")[1]}",`;
      console.log(`"${s.split(":")[1]}"`);
    }
    final = final?.replace(/undefined+/g, "");
    final = final?.substring(0, final.length - 8);

    final = `{${final}}`;

    setClipboard("Copy to clipboard");
    setSampleJsonContent(
      jsbeautify(final, { indent_size: 2, space_in_empty_paren: true })
    );
  }, [intefaceContent]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Interface to JSON</title>
        <meta name="description" content="convert Interface to JSON" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h2 className={styles.title}>
          Convert Interfaces to Sample JSON Payload
        </h2>

        <p className={styles.description}>
          Paste or write your interface below
        </p>
      </main>

      <div className={styles.containereditor}>
        <div style={{ flexDirection: "column" }}>
          <h3>Interface</h3>
          <textarea
            className={styles.editor}
            value={intefaceContent}
            onChange={(e) => setInterfaceContent(e.target.value)}
          ></textarea>
        </div>
        <div style={{ flexDirection: "column" }}>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <h3>JSON Payload</h3>
            <CopyToClipboard
              text={sampleJsonContent}
              onCopy={() => setClipboard("copied")}
            >
              <button className={styles.btncopy}>{clipboard}</button>
            </CopyToClipboard>
          </div>

          <textarea
            className={styles.editor}
            value={sampleJsonContent}
            onChange={(e) => setSampleJsonContent(e.target.value)}
          ></textarea>
        </div>
      </div>
      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>

        <a
          href="https://github.com/jitunayak"
          target="_blank"
          rel="noopener noreferrer"
        >
          Build by Jitu Nayak
        </a>
      </footer>
    </div>
  );
};

export default Home;
