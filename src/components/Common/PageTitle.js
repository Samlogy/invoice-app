import React from "react";

function PageTitle(props) {
  return (
    <div>
      <h2 className="font-title text-2xl capitalize">{props.title}</h2>
    </div>
  );
}

export default PageTitle;
