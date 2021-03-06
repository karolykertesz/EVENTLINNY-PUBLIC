import React, { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import classes from "../components/UI/ui-modules/user.module.css";
import Mail from "../components/UI/icons/mail";
import firebase from "firebase";
import { useRouter } from "next/router";
import { useAuth } from "./Layout/UserContext";
const UserCard = (props) => {
  const { user, events, id } = props;
  const currentUser = useAuth().user;
  const uid = currentUser && currentUser.uid;

  const router = useRouter();
  const [admin, setAdmin] = useState();
  const getUserdata = useCallback(async () => {
    if (id) {
      const getData = firebase.functions().httpsCallable("getuserData");
      await getData({ uid: id }).then((result) => {
        setAdmin(result.data.user);
      });
    }
  }, [setAdmin]);
  console.log(admin);
  const LastSigned = new Date(admin && admin.lastSignInTime).toLocaleDateString(
    "de-De",
    {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }
  );
  const created = new Date(admin && admin.creationTime).toLocaleDateString(
    "de-De",
    {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }
  );

  useEffect(() => {
    getUserdata();
  }, [getUserdata]);
  return (
    <div className={classes.container}>
      <div className={classes.topCont}>
        <div className={classes.imageHolder}>
          <Image
            width="80px"
            height="80px"
            quality={100}
            src={user && user.imgUrl ? user.imgUrl : "/images/noimages.svg"}
            alt="user image"
          />
        </div>
      </div>
      <div className={classes.buttCont}>
        <h4>{user && user.name}</h4>
        <p>Bio:{user && user.bio ? user.bio : "No Bio Shared"}</p>
        <p>
          Language:{" "}
          {user && user.language ? user.language : "No language shared"}
        </p>
        <p>
          Birthday:{" "}
          {user && user.birthday ? user.birthday : "No Birthday added"}
        </p>
        <p>Events Added: {events ? events.length : "(0)"}</p>
        <p>Account Created: {admin && created}</p>
        <p>Last Visit: {admin && LastSigned}</p>
        {uid !== id && (
          <div
            className={classes.mail}
            onClick={() => router.push(`/chat/message/?i=${id}`)}
          >
            <p>contact {user && user.name}</p>
            <Mail width="25px" color="#fff" />
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCard;
