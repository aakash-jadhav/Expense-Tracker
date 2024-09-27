import React from "react";
import { Link, useNavigate, useRouteError } from "react-router-dom";
import { HomeIcon, ArrowUturnLeftIcon } from "@heroicons/react/24/solid";

/**
 * Renders an error page with a message and navigation options.
 *
 * This component is used to display an error page when a route error occurs. It
 * displays the error message and provides two navigation options: a "Go back"
 * button that navigates to the previous page, and a "Go home" link that
 * navigates to the root of the application.
 *
 * @returns {JSX.Element} The error page component.
 */
export default function Error() {
  const error = useRouteError();
  const navigate = useNavigate();
  return (
    <div className="error">
      <h1>Uh oh! We've got a problem</h1>
      <p>{error.message || error.statusText}</p>
      <div className="flex-md">
        <button className="btn btn--dark" onClick={() => navigate(-1)}>
          <ArrowUturnLeftIcon width={20} />
          Go back
        </button>
        <Link to="/" className="btn btn--dark">
          <HomeIcon width={20} />
          <span>Go home</span>
        </Link>
      </div>
    </div>
  );
}
