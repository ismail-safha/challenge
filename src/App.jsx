import "./App.css";
import moment from "moment";
// import { Link } from "react-router-dom";

import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [user, setUser] = useState([]);
  const page = 1;
  const DATE_30_DAYS_BEFORE = moment()
    .subtract(30, "days")
    .format("YYYY-MM-DD");

  console.log(user);

  useEffect(() => {
    axios
      .get(
        ` https://api.github.com/search/repositories?q=created:>${DATE_30_DAYS_BEFORE}&sort=stars&order=desc&page=${page}`
      )
      .then((res) => setUser(res.data.items))
      .catch((error) => console.log(error));
  }, [DATE_30_DAYS_BEFORE]);

  return (
    <div>
      {user.map((item, i) => (
        <>
          {/* === */}
          <div key={i.id} className="main">
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

          {/* === */}
        </>
      ))}
    </div>
  );
}

export default App;

// "https://api.github.com/search/repositories?q=created:>2017-10-22&sort=stars&order=desc"
