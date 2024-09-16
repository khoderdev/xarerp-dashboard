import { useContext } from "react";
import { AuthContext } from "../../contexts/auth/AuthContext";
import { GlobalContext } from "../../contexts/GlobalContext";
import { ThemeContext } from 'styled-components';
import { useWindowSize } from "../../hooks/useResize";
import * as C from './styles';
import { Menu } from '@mui/icons-material';

import SwitcherTheme from "../SwitcherTheme";
import UserMenu from "./UserMenu";
import Notifications from "./Notifications";

// Define the structure for menu state in ThemeContext
type ThemeContextType = {
  menu: {
    icon: string;
  }
};

// Define the structure of GlobalContext
type GlobalContextType = {
  state: {
    menu: {
      openedMenu: boolean;
    };
  };
  dispatch: React.Dispatch<{
    type: string;
    payload: { openedMenu: boolean };
  }>;
};

// Define the structure of AuthContext
type AuthContextType = {
  user: boolean;
};

const Header = () => {
  const { state, dispatch } = useContext(GlobalContext) as GlobalContextType;
  const { menu } = useContext(ThemeContext) as ThemeContextType;
  const [width] = useWindowSize();
  const auth = useContext(AuthContext) as unknown as AuthContextType;

  const handleOpenMenu = () => {
    dispatch({
      type: 'MENU_CHANGE_OPENED',
      payload: {
        openedMenu: !state.menu.openedMenu,
      },
    });
  };

  return (
    <>
      {auth.user ? (
        <C.Container>
          {width < 720 && (
            <C.MenuBtn onClick={handleOpenMenu}>
              <Menu style={{ color: menu.icon, fontSize: '32px' }} />
            </C.MenuBtn>
          )}

          <C.HeaderMenuArea>
            <Notifications />
            <UserMenu />
          </C.HeaderMenuArea>
        </C.Container>
      ) : (
        <SwitcherTheme noAuth="noAuth" />
      )}
    </>
  );
};

export default Header;
