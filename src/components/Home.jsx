import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import UsersData from "./UsersData";
import Loading from "./Loading";

const Home = () => {
  const [card, setCard] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  // 1.format dates from API by use: Moment.js library.
  const DATE_30_DAYS_BEFORE = moment()
    //updated with the formatted
    .subtract(30, "days")
    .format("YYYY-MM-DD");

  //  Fetch date by use: axios
  const fetchAxios = async () => {
    const res = await axios.get(
      `https://api.github.com/search/repositories?q=created:>${DATE_30_DAYS_BEFORE}&sort=stars&order=desc&page=${page}`
    );
    //Spread Operator
    setCard((prev) => [...prev, ...res.data.items]);
    setLoading(false);
  };
  // console.log(card);

  useEffect(() => {
    // Fetch date from API
    fetchAxios();
  }, [page, DATE_30_DAYS_BEFORE]);

  //=== scrolling (pagination)
  const handelInfiniteScroll = async () => {
    try {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        setLoading(true);
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handelInfiniteScroll);
    return () => window.removeEventListener("scroll", handelInfiniteScroll);
  }, []);
  //===

  return (
    <>
      <UsersData dataInfo={card} />
      {loading && <Loading />}
    </>
  );
};

export default Home;
