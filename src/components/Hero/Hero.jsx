import React from "react";
import styles from "./Hero.module.css";
import { BlackHole } from "../Blackhole/BlackHole";

export const Hero = () => {
  return (
    <section className={styles.container}>
      <BlackHole />

      <div className={styles.content}>
        <h1 className={styles.title}>Hi, I'm Ritam Bhattacharya</h1>

        <p className={styles.description}>
          I am a Software Engineer and Computer Science undergraduate
          specializing in scalable backend architectures, System Design (LLD),
          and AI/ML integrations. I build production-grade MERN
          applications—including enterprise API gateways protected by Redis
          caching and cryptographic authentication—anchored by a strong
          foundation in Java Core and Data Structures.I am currently seeking
          career opportunities to tackle complex distributed infrastructure
          challenges.
        </p>

        <a
          href="mailto:ritambhattacharya2003@gmail.com"
          className={styles.contactBtn}
        >
          Contact Me
        </a>
      </div>
    </section>
  );
};
