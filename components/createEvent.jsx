import React, { useState, Fragment, useEffect } from "react";
import firebase from "firebase";
import classes from "./UI/ui-modules/createevent.module.css";
import EventsTop from "./UI/eventstop";
import { categories } from "../data";
import Eventadder from "./UI/eventadder";
import { Pi } from "../components/UI/styledComponents";

const CreateEvent = ({ uid }) => {
  const [category, setCat] = useState();
  const [clicked, setcicked] = useState(false);
  const additem = (item) => {
    setCat(item);
    setcicked(!clicked);
    if (clicked) {
      setCat(null);
    }
  };
  return (
    <Fragment>
      <Pi>Create a category</Pi>
      <div className={classes.coverdiv}>
        <div className={classes.grid}>
          {categories.map((item) => (
            <EventsTop
              item={item}
              additem={additem}
              clicked={clicked}
              key={item}
            />
          ))}
        </div>
      </div>
      {category && (
        <div className={classes.coverdiv}>
          <Eventadder
            category={category}
            uid={uid}
            setcicked={setcicked}
            clicked={clicked}
            setCat={setCat}
          />
        </div>
      )}
    </Fragment>
  );
};
export default CreateEvent;
