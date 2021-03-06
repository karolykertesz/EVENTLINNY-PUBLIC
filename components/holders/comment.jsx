import React, { useState } from "react";
import {
  ComentContainer,
  CommentHolder,
  IconDock,
} from "../UI/icons/iconcovers";
import Image from "next/image";
import { useAuth } from "../Layout/UserContext";
import { BiLike } from "react-icons/bi";
import { IconContext } from "react-icons";
import Comments from "../UI/icons/comments";

const Comment = ({ item }) => {
  const [liked, setLiked] = useState(false);
  const userId = useAuth().user.uid;
  const humanReadableDate = (it) => {
    const t = it.toDate().toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    return t;
  };
  console.log(item);
  return (
    <Fragment>
      <ComentContainer>
        <CommentHolder>
          <Image
            width="35px"
            height="35px"
            src={i.url}
            className={classes.image}
            quality={100}
          />
          <p className={classes.liketext}>{i.name}</p>
          <p className={classes.liketext}>{humanReadableDate(i.data.when)}</p>
          <IconContext.Provider
            value={{
              className: !liked ? classes.icontop : classes.iconLike,
            }}
          >
            <button className={classes.button} onClick={() => setLiked(!liked)}>
              <BiLike />
            </button>
          </IconContext.Provider>
        </CommentHolder>
        <CommentHolder>
          <IconDock icon={Comments} />
          <p className={classes.liketext}>{i.data.what}</p>
          <p className={classes.liketext}>likes: ({i.data.likes.length})</p>
        </CommentHolder>
      </ComentContainer>
    </Fragment>
  );
};
