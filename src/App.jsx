import axios from "axios";
import React, { useState, useEffect } from "react";
import moment from "moment";
import InfiniteScroll from "react-infinite-scroll-component";
import "./App.css";

let page = 1;
const fetchData = (setUser, user) => {
  const DATE_30_DAYS_BEFORE = moment()
    .subtract(30, "days")
    .format("YYYY-MM-DD");
  axios
    .get(
      `https://api.github.com/search/repositories?q=created:>${DATE_30_DAYS_BEFORE}&sort=stars&order=desc&page=${page}`
    )
    .then((res) => {
      setUser([...user, ...res.data.items]);
      page = page + 1;
    })
    .catch((error) => console.log(error));
};

const App = () => {
  const [user, setUser] = useState([]);

  //==
  const refresh = (setUser) => {};
  //=
  useEffect(() => {
    fetchData(setUser, user);
  }, [user]);

  return (
    <InfiniteScroll
      dataLength={user.length} //This is important field to render the next data
      next={() => {
        fetchData(setUser, user);
      }}
      hasMore={true}
      loader={<h4>Loading...</h4>}
      endMessage={
        <p style={{ textAlign: "center" }}>
          <b>Yay! You have seen it all</b>
        </p>
      }
      // below props only if you need pull down functionality
      refreshFunction={refresh}
      pullDownToRefresh
      pullDownToRefreshThreshold={50}
      pullDownToRefreshContent={
        <h3 style={{ textAlign: "center" }}># 8595; Pull down to refresh</h3>
      }
      releaseToRefreshContent={
        <h3 style={{ textAlign: "center" }}># 8593; Release to refresh</h3>
      }
    >
      {/* === */}
      {/* <div >
        {user.map((user) => (
          // eslint-disable-next-line jsx-a11y/alt-text
          <img src={user.url} height="100px" width="200px" />
        ))}
      </div> */}
      {/* === */}
      <div style={{ minHeight: "100vh" }}>
        {user.map((item) => (
          <>
            {/* === */}
            <div key={item.id} className="main">
              <div className="container">
                <div className="all-card">
                  <div className="card">
                    <div className="card-content">
                      <img className="img" src={item.owner.avatar_url} alt="" />
                      <div className="text">
                        <div className="title">{item.name}</div>
                        <div className="paragraph">{item.description}</div>
                        <div className="description">
                          {/* <Link to={item.html_url}>{item.name}</Link> */}
                          <div className="btn stars">
                            stars : {item.stargazers_count}
                          </div>
                          <div className="btn issues">
                            issues : {item.open_issues_count}
                          </div>
                          <div className="txt">
                            Submitted {moment(item.created_at).fromNow()} By{" "}
                            {item.owner.login}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ))}
      </div>
    </InfiniteScroll>
  );
};

export default App;
