/** @jsxRuntime classic */
/** @jsx jsx */
import { VFC, useState } from 'react';
import { slide as Menu } from 'react-burger-menu';
import { Link } from 'react-router-dom';

import { css, jsx } from '@emotion/react';

const burger = css`
  /* Position and sizing of burger button */
  .bm-burger-button {
    position: fixed;
    width: 36px;
    height: 30px;
    right: 36px;
    top: 36px;
  }

  /* Color/shape of burger icon bars */
  .bm-burger-bars {
    background: #373a47;
  }

  /* Color/shape of burger icon bars on hover*/
  .bm-burger-bars-hover {
    background: #a90000;
  }

  /* Position and sizing of clickable cross button */
  .bm-cross-button {
    height: 24px;
    width: 24px;
  }

  /* Color/shape of close button cross */
  .bm-cross {
    background: #bdc3c7;
  }

  /*
Sidebar wrapper styles
Note: Beware of modifying this element as it can break the animations - you should not need to touch it in most cases
*/
  .bm-menu-wrap {
    position: fixed;
    height: 100%;
  }

  /* General sidebar styles */
  .bm-menu {
    background: white;
    padding: 2.5em 1.5em 0;
    font-size: 1.35em;
    font-weight: bold;
  }

  /* Wrapper for item list */
  .bm-item-list {
    color: #b8b7ad;
    padding: 1.8em;
  }

  /* Individual item */
  .bm-item {
    display: inline-block;
  }

  /* Styling of overlay */
  .bm-overlay {
    background: rgba(0, 0, 0, 0.3);
  }

  a {
    margin-bottom: 30px;
  }

  button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    outline: none;
    padding: 0;
    appearance: none;
  }
`;

const BurgerMenu: VFC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleIsOpen = () => setIsOpen(!isOpen);

  return (
    <div css={burger}>
      <Menu
        right
        disableAutoFocus
        noOverlay
        isOpen={isOpen}
        onOpen={handleIsOpen}
        onClose={handleIsOpen}
      >
        <Link id="react-burger-cross-btn" className="menu-item" to="/">
          <button type="button" onClick={() => setIsOpen(false)}>
            Home
          </button>
        </Link>
        <Link id="react-burger-cross-btn" className="menu-item" to="/">
          <button type="button" onClick={() => setIsOpen(false)}>
            Services
          </button>
        </Link>
        <Link id="react-burger-cross-btn" className="menu-item" to="/">
          <button type="button" onClick={() => setIsOpen(false)}>
            Research
          </button>
        </Link>
        <Link id="react-burger-cross-btn" className="menu-item" to="/">
          <button type="button" onClick={() => setIsOpen(false)}>
            Clients
          </button>
        </Link>
        <Link id="react-burger-cross-btn" className="menu-item" to="/">
          <button type="button" onClick={() => setIsOpen(false)}>
            Contact
          </button>
        </Link>
      </Menu>
    </div>
  );
};
export default BurgerMenu;
