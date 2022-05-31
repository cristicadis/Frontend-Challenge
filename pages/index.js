
import React, { useState } from "react";
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Heading from "./components/Heading";
import Records from "./frontend_challenge_activities.json";

export default function Home() {

  function handleSubmit(event){
    alert("You have booked your workout: " + event.target.value+ "!");
  }

  return (
    <div className={styles.container}>

      <Head>
        <title>myClubs frontend challenge</title>
        <meta name="description" content="myClubs frontend challenge" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.content}>
        <div className={styles.main}>
          <h1 className={styles.title}>
            Book your workout to <a href="https://www.myclubs.com/at/en/">myClubs</a>
          </h1>
          <div className={styles.workouts}>
            <h2 className={styles.stepTitle}>Choose Your Workout</h2>
            {
              Records.hits.hits.map(record => {

                return(

                    <div div className={styles.itemscontainer} key={record._id}>
                      <div className={styles.item}>
                        <div>

                          <div className={styles.infotime}>
                            {record._source.activityDate.start.iso.replace(/^[^:]*([0-2]\d:[0-5]\d).*$/, "$1")}&nbsp;-&nbsp;

                            {record._source.activityDate.end.iso.replace(/^[^:]*([0-2]\d:[0-5]\d).*$/, "$1")}
                          </div>

                          <div className={styles.location}>
                            {record._source.city}
                          </div>

                          <div className={styles.infoitem}>
                            {record._source.name}
                          </div>

                        </div>

                        <button
                          className={styles.button}
                          onClick={handleSubmit}
                          value={record._source.name}
                          type="submit"
                          name="book">
                          Book
                        </button>

                      </div>

                    </div>

                );
              })
            }
          </div>
        </div>

        <footer className={styles.footer}>
          myClubs
        </footer>
      </div>

    </div>
  );
}
