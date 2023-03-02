import React from "react";
import moment from "moment";

const UsersData = ({ dataInfo }) => {
  return (
    <>
      {/* map function */}
      {dataInfo.map((item, i) => {
        return (
          <div key={i} className="main">
            <div className="container">
              <div className="all-card">
                <div className="card">
                  <div className="card-content">
                    {/* avatar of the owner. */}
                    <img className="img" src={item.owner.avatar_url} alt="" />
                    <div className="text">
                      {/* Repository name */}
                      <div className="title">{item.name}</div>
                      {/* Repository description */}
                      <div className="paragraph">{item.description}</div>
                      <div className="description">
                        <div className="btn stars">
                          {/* Number of stars for the repo. */}
                          stars : {item.stargazers_count}
                        </div>
                        <div className="btn issues">
                          {/* Number of issues for the repo. */}
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
