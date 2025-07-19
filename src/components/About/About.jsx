import React from "react";
import styles from "./About.module.css";
import { getImageUrl } from "../../utils";

export const About = () => {
  return (
    <section className={styles.container} id="about">
      <h2 className={styles.title}>About</h2>
      <div className={styles.content}>
        <img
          src={getImageUrl("about/aboutImage.png")}
          alt="Ritam Bhattacharya"
          className={styles.aboutImage}
        />
        <ul className={styles.aboutItems}>
          <li className={styles.aboutItem}>
            <img
              src={getImageUrl("about/mern.png")}
              alt="MERN icon"
              width="256"
              height="256"
              style={{ marginRight: "16px" }}
            />
            <div className={styles.aboutItemText}>
              <h3>MERN Stack Developer</h3>
              <p>
                Experienced in building full-stack applications using the MERN stack. Developed scalable apps like a personalized news dashboard and an F1 chatbot platform with GenAI and secure authentication.
              </p>
            </div>
          </li>
          <li className={styles.aboutItem}>
            <img
              src={getImageUrl("about/javadev.png")}
              alt="Java icon"
              width="256"
              height="256"
              style={{ marginRight: "16px" }}
            />
            <div className={styles.aboutItemText}>
              <h3>Java & DSA Enthusiast</h3>
              <p>
                Strong foundation in object-oriented programming and data structures with Java. Proficient in solving algorithmic problems and applying core CS principles to real-world challenges.
              </p>
            </div>
          </li>
          <li className={styles.aboutItem}>
            <img
              src={getImageUrl("about/ml.png")}
              alt="ML icon"
              width="256"
              height="256"
              style={{ marginRight: "16px" }}
            />
            <div className={styles.aboutItemText}>
              <h3>Machine Learning & Research</h3>
              <p>
                Worked on ML projects involving pollutant prediction, business analytics, and classification accuracy improvements. Completed internships in data science and research roles, with NPTEL certifications in core CS areas.
              </p>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
};
