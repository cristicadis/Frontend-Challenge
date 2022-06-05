
import React, { useState, useEffect } from "react";
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import images from "./images.js"



export default function Home() {

  let filter1 = [{key:1, name:"Country...", code:"Country..."},{key:2, name:"Switzerland",code:"CH"},{key:3, name:"Austria", code:"AT"}]
  let filter2 = [{key:1, name:"Day...", code:"Day..."},{key:2, name:"Monday"},{key:3, name:"Tuesday"},{key:4, name:"Wednesday"},{key:5, name:"Thursday"},{key:6, name:"Friday"},{key:7, name:"Saturday"},{key:8, name:"Sunday"}]

  let data = require('./frontend_challenge_activities.json').hits.hits;

  const [valueFilter1, setValueFilter1] = useState("Country...");
  const [valueFilter2, setValueFilter2] = useState("Day...")
  const [filterSelected, setFilterSelected] = useState("Any");
  const [click, setClick] = useState(0);


  function handleFilter1(event){
    setValueFilter1(event.target.value);
    setFilterSelected(event.target.id);
    setValueFilter2("Day...");
  }


  function handleFilter2(event){
    setValueFilter2(event.target.value);
    setFilterSelected(event.target.id);
    setValueFilter1("Country...");
  }

  //Filter data

  let arrayFiltered = data.filter(it=>{
    if(filterSelected==="filter1"){
      if(valueFilter1==="Switzerland"){
        return (it._source.country.includes("CH"));
      } else if(valueFilter1==="Austria"){
        return (it._source.country.includes("AT"))
      } else return it;
    } else if(filterSelected==="filter2"){
      if(valueFilter2==="Day..."){
        return it;
      } else if(valueFilter2=== new Date(it._source.activityDate.start.iso).toLocaleString('en-us', {weekday:'long'}) ) {
        return it;
      }
    } else return it;
  });


//detect which button is clicked and setClick = botton id
  const handleSubmit = (e) => {
      setClick(e.id);
    };



  return (
    <div className={styles.container}>

      <Head>
        <title>myClubs frontend challenge</title>
        <meta name="description" content="myClubs frontend challenge" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.title}>
        <h1 >
          Book a workout
        </h1>
      </div>

      <div className={styles.content}>
            <div className={styles.workouts}>
              <div className={styles.filters}>

                {/* First filter (country) */}

                  <div className={styles.filter}>
                    <select onChange={handleFilter1} id="filter1"  key="filter1"  className={styles.filter1} value={valueFilter1}>
                      {filter1.map(el =>{
                      return(<option key={el.key} value={el.name} >{el.name}</option>);
                      })}
                    </select>
                  </div>

                 {/* Second filter (Day) */}

                  <div className={styles.filter}>
                    <select onChange={handleFilter2} id="filter2"  key="filter2"  className={styles.filter2} value={valueFilter2}>
                      {filter2.map(el =>{
                      return(<option key={el.key} value={el.name} >{el.name}</option>);
                      })}
                    </select>
                  </div>
              </div>

                {/* I used a map function to render all the elements from "arrayFiltered"*/}


              <div className={styles.itemsContainer}>

              {arrayFiltered.map(record =>{
                  let tags = []
                  let foundImageTag = false;
                  tags.push({"key":1 , "tag":record._source.categories[0].slice(3)});

                  if (record._source.categories[1]){
                    tags.push({"key":2 , "tag":record._source.categories[1].slice(3)});
                  }


                return(
                    <div className={styles.item} key={record._source.id}>
                       <div className={styles.image}>

                       {/* I used a map function to render  the images from "Images.js" and see which one corespondes with the tag*/}

                         {images.map(img =>{
                           if (tags.filter(e => e.tag === img.name).length > 0 && !foundImageTag) {
                             foundImageTag=true;
                             return(<img key={img.id} src={img.image} />)
                            }
                            }
                            )
                         }
                       </div>
                       <div className={styles.itemDetail}>

                         <div className={styles.infoitem}>
                           {record._source.name}
                         </div>

                        <div className={styles.location}>
                          {record._source.city}
                        </div>

                        <div className={styles.details}>
                          {tags.map(tag =>{
                            return(<div key={tag.key}>{tag.tag}</div>)
                          })}
                        </div>
                       </div>

                       <button
                         className={styles.button}
                         onClick={() => handleSubmit(record._source)}
                         value={record._source.name}
                         type="button"
                         name="book"
                         key={record._source.id}
                         style={{ color: record._source.id === click ? "green" :"black" }}
                        >
                         {record._source.id === click?"Booked":"Book"}
                       </button>

                    </div>
                  )
              })}

              </div>
              </div>

        </div>
      <footer className={styles.footer}>
        myClubs
      </footer>

    </div>
  );
}
