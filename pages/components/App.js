import '../styles/globals.css'
import Heading from "./components/Heading";
import Records from "../frontend_challenge_activities.json";

function MyApp() {
//  const {hits: {hits:[]}} = Record;
//  console.log(timed_out);

  return (
    <div>
      <Heading/>
      {
        Records.hits.hits.map(record =>{
          return(
            <div>{record._id}</div>
          );
        })
      }
    </div>
  );
}

export default MyApp
