import classes from "../../components/UI/ui-modules/month.archive.module.css";
import React, { useRef, useState, useEffect, useCallback } from "react";
import { getArchiveMont } from "../../data";
import { useRouter } from "next/router";
import LogisticGrid from "../../components/event-detail/logistic-item-grid";
import { useRedirect } from "../../helpers/validatehelp";

const Months = () => {
  const getdata = useCallback(async () => {
    const d = await getArchiveMont(month && month);
    await setData(d);
  }, []);
  useRedirect();
  const trueRef = useRef(true);
  const [data, setData] = useState();
  const router = useRouter();
  const month = router.query.m;
  useEffect(() => {
    getdata();
  }, [getdata]);
  console.log(data);
  return (
    <div className={classes.top}>
      <div>
        <ul className={classes.grid}>
          {data &&
            data.map((item) => (
              <li key={item.id}>
                <LogisticGrid
                  start={item.start}
                  category={item.category}
                  location={item.location}
                  id={item.id}
                  attendies={item.attendies}
                  added_by={item.added_by}
                  isArchive={item.isArchive}
                />
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};
export default Months;
{
  /* <li className={classes.li} key={item.id}>
<LogisticGrid
  start={item.start}
  category={item.category}
  location={item.location}
  id={item.id}
  attendies={item.attendies}
  added_by={item.added_by}
  isArchive={item.isArchive}
/> */
}
