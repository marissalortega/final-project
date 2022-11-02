import React from 'react';

export default function NotFound(props) {
  return (
    <div>
      <h3 className="mt-5 text-center">
        Uh oh, we could not find the page you were looking for!
      </h3>
      <p className="mt-3 text-center">
        <a href="#" className="return-home">Click here to return to Home Page</a>
      </p>
    </div>
  );
}
