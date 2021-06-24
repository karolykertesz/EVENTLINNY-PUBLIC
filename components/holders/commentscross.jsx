import React, {
  Fragment,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import { getComments } from "../../data";
import firebase from "firebase";
import { Nocomments } from "./indexholders";
import CommentHead from "../holders/commentsHead";
import Loader from "../UI/loader";
import CommentsBody from "../holders/commentsbody";
const ComentsCross = ({ id }) => {
  const [comments, setComments] = useState();
  const [loading, setLoading] = useState(false);
  const modeRef = useRef(true);
  const datafetch = useCallback(() => {
    firebase
      .firestore()
      .collection("comments")
      .doc(id)
      .onSnapshot(async (snapShot) => {
        if (snapShot.exists) {
          if (modeRef.current) {
            const data = await snapShot.data();
            setComments({
              id: snapShot.id,
              data: data,
            });
          } else {
            if (modeRef.current) {
              setComments(null);
            }
          }
        }
      });
  }, [setComments, comments]);
  useEffect(() => {
    datafetch();
    return () => {
      modeRef.current = false;
    };
  }, []);
  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      {!comments ? (
        <div>
          <Nocomments docid={comments && comments.id} id={id} />
        </div>
      ) : (
        <div>
          {comments && (
            <Fragment>
              <CommentHead
                id={comments.data.added_by}
                likes={comments.data.likes}
                docid={comments.id}
                commentBody={comments.data.comment_body}
              />
              <CommentsBody
                arr={comments && comments.data.replies}
                docid={comments && comments.id}
              />
            </Fragment>
          )}
        </div>
      )}
    </div>
  );
};

export default ComentsCross;