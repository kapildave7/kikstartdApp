import React from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "../routes";

export default () => {
  return (
    <Menu style={{ marginTop: "20px" }}>
      <Link route="/">
        <a className="item">Croud Coin</a>
      </Link>
      <Menu.Menu position="right"></Menu.Menu>
      <Link route="/">
        <a className="item">Campagin</a>
      </Link>
      <Link route="/campaigns/new">
        <a className="item">+</a>
      </Link>
    </Menu>
  );
};
