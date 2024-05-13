import React from 'react'

const Back = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20px"
      height="20px"
      viewBox="0 0 1024 1024"
      {...props}
    >
      <path
        fill="black"
        d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64"
      ></path>
      <path
        fill="black"
        d="m237.248 512l265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312z"
      ></path>
    </svg>
  );
}

export default Back