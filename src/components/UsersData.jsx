import React from "react";
import moment from "moment";

const UsersData = ({ movieInfo }) => {
  return (
    <>
      {movieInfo.map((item, i) => {
        return (
          <div key={i} className="main">
            <div className="container">
              <div className="all-card">
                <div className="card">
                  <div className="card-content">
                    <img className="img" src={item.owner.avatar_url} alt="" />
                    <div className="text">
                      <div className="title">{item.name}</div>
                      <div className="paragraph">{item.description}</div>
                      <div className="description">
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
        );
      })}
    </>
  );
};

export default UsersData;
