import React from "react";

const page = () => {
  return (
    <div>
      <div className="flex h-[100vh] flex-col items-center justify-center align-middle">
        <svg
          width="100"
          height="100"
          className="align-center"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
        >
          <g data-name="60-Check">
            <path d="M16 0a16 16 0 1 0 16 16A16 16 0 0 0 16 0zm0 30a14 14 0 1 1 14-14 14 14 0 0 1-14 14z" />
            <path d="m13 20.59-4.29-4.3-1.42 1.42 5 5a1 1 0 0 0 1.41 0l11-11-1.41-1.41z" />
          </g>
        </svg>
        <h1 className="mt-10 text-center">
          Thanks for chosing First Condom You'll recive a call from our dispatch
          department
        </h1>
        <a className="align-center btn-primary btn mt-10" href="/">
          Countine shopping
        </a>
      </div>
    </div>
  );
};

export default page;
