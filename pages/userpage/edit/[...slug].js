import React, { useEffect, useState } from "react";
import firebase from "firebase";
import { useRouter } from "next/router";
import { allUserPref } from "../../../helpers/wrappers/userPrefwrap";
import StartItem from "../../../components/startitem";
import CreateEvent from "../../../components/createEvent";

const Slug = () => {
  const [data, seTdata] = useState();
  const router = useRouter();
  const query = router.query.slug;
  useEffect(() => {
    return new Promise(async (resolve, reject) => {
      const mess = await fetch("/api/users/validateSesion");
      resolve(mess);
    }).then((response) => {
      if (response.status === 400) {
        console.log(response.message);
        router.push("/login");
      }
    });
  }, []);
  useEffect(() => {
    let isTrue = true;
    if (query && isTrue) {
      return allUserPref(query[1])
        .then(async (t) => {
          const dtObj = await t;
          return seTdata(dtObj);
        })
        .then(() => console.log("hh"))
        .catch((err) => console.log(err));
    }
    return () => (isTrue = false);
  }, []);
  const uid = query && query[1];
  const addUserInt = (id) => {
    if (uid) {
      const docref = firebase.firestore().collection("cookies").doc(uid);
      return docref
        .update({
          pref_events: firebase.firestore.FieldValue.arrayUnion(id),
        })
        .then(() => alert("done"));
    }
  };

  return (
    <div>
      {query && query[0] === "addNewPref" ? (
        <div>
          {data !== undefined &&
            data.map((items, indx) => (
              <div key={items.id}>
                <StartItem items={items} addUserInt={addUserInt} />
              </div>
            ))}
        </div>
      ) : (
        <div>
          {query ? <CreateEvent uid={query && query[1]} /> : <p>Loading</p>}
        </div>
      )}
    </div>
  );
};

export default Slug;