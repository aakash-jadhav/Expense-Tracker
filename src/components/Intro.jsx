import React from "react";
import { Form } from "react-router-dom";
import { UserPlusIcon } from "@heroicons/react/16/solid";
import illustration from "../assets/illustration.jpg";

/**
 * Renders the Intro component, which displays a hero section with a form to create a new account.
 * The component includes a heading, a description, and a form with an input field for the user's name
 * and a button to create a new account.
 *
 * @returns {JSX.Element} The Intro component
 */
export default function Intro() {
  return (
    <div className="intro">
      <div>
        <h1>
          Take control of <span className="accent">Your Money</span>
        </h1>
        <p>
          Personal budgetting is the secret to financial freedom. Start your
          journey today.
        </p>
        <Form method="post">
          <input
            type="text"
            name="userName"
            required
            placeholder="what is your name?"
            aria-label="Your name"
            autoComplete="given-name"
          />
          <input type="hidden" name="_action" value="newUser" />
          <button className="btn btn--dark">
            <span>Create Account</span>
            <UserPlusIcon width={20} />
          </button>
        </Form>
      </div>
      <img src={illustration} alt="Person with money" width={600} />
    </div>
  );
}
