import React from "react";

import styles from "./Hero.module.css";
import { getImageUrl } from "../../utils";

export const Hero = () => {
  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Hi, I'm Ritam Bhattacharya</h1>
        <p className={styles.description}>
          I'm a Mern stack developer along with proficiency in Java Core and Data Structures & Algorithms, skilled in React, Node.js, and deep learning with hands-on experience in AI/ML research and cloud fundamentals. GSoC 2024 Contributor. Passionate about building scalable and performant web apps.
        </p>
        <a href="mailto:ritambhattacharya2003@gmail.com" className={styles.contactBtn}>
          Contact Me
        </a>
      </div>
      <img
        src={getImageUrl("hero/heroImage.png")}
        alt="Hero image of me"
        className={styles.heroImg}
        width="500"
        height="700"
      />
      <div className={styles.topBlur} />
      <div className={styles.bottomBlur} />
    </section>
  );
};
