import { Link } from "react-router";
import { SVGS } from "../assets/svgs";

export const ChatHeader = () => {
  return (
    <div className="ChatHeaderContainer">
      <div className="app-max-width flex-x justify-between align-center inline-auto">
        <section>
          <Link to="/">
            <h2 className="assistant-color flex-x align-center">
              {SVGS.mentalHealth} MindAlly
            </h2>
          </Link>
        </section>
        <section>
          <Link to="/info">
            <h4 className="assistant-color">Info</h4>
          </Link>
        </section>
      </div>
    </div>
  );
};
