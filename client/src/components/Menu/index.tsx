import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../../contexts/auth/AuthContext";
import { GlobalContext } from "../../contexts/GlobalContext";
import { useWindowSize } from "../../hooks/useResize";
import { ThemeContext } from "styled-components";
import * as C from "./styles";
import { Menu as MenuIcon, MenuOpen } from "@mui/icons-material";
import MenuItem from "./MenuItem";

// Define the structure for the ThemeContext
type ThemeContextType = {
  menu: {
    icon: string;
  };
};

// Define the structure for each menu item
type MenuItemType = {
  title: string;
  icon: string;
  link: string;
  role: string;
};

const Menu = () => {
  const [width] = useWindowSize();
  const { menu } = useContext(ThemeContext) as ThemeContextType;
  const { state, dispatch } = useContext(GlobalContext);
  const ref = useRef<HTMLDivElement | null>(null);
  const token = localStorage.getItem("token");
  const auth = useContext(AuthContext);

  const handleOpenMenu = () => {
    dispatch({
      type: "MENU_CHANGE_OPENED",
      payload: {
        openedMenu: !state.menu.openedMenu,
      },
    });
  };

  useEffect(() => {
    const clickedOutside = (e: MouseEvent) => {
      if (state.menu.openedMenu && ref.current && !ref.current.contains(e.target as Node)) {
        dispatch({
          type: "MENU_CHANGE_OPENED",
          payload: {
            openedMenu: false,
          },
        });
      }
    };

    document.addEventListener("mousedown", clickedOutside);

    return () => {
      document.removeEventListener("mousedown", clickedOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.menu.openedMenu]);

  // Define the menu list with roles and links
  const menuList: MenuItemType[] = [
    { title: "Dashboard", icon: "Dashboard", link: "/", role: "view_dashboard" },
    { title: "Stores", icon: "Store", link: "/stores", role: "view_store" },
    { title: "Store", icon: "Store", link: "/stocks", role: "view_stock" },
    { title: "Products", icon: "Product", link: "/products", role: "view_product" },
    { title: "Clients", icon: "Client", link: "/clients", role: "view_client" },
    { title: "Sales", icon: "Sale", link: "/sales", role: "view_sale" },
    { title: "Carriers", icon: "Carrier", link: "/carriers", role: "view_carrier" },
    { title: "Providers", icon: "Provider", link: "/providers", role: "view_provider" },
    { title: "Sellers", icon: "Seller", link: "/sellers", role: "view_seller" },
    { title: "Purchases", icon: "Purchase", link: "/purchases", role: "view_purchase" },
    { title: "Financial", icon: "Financial", link: "/financial", role: "view_financial" },
    { title: "Users", icon: "User", link: "/users", role: "view_user" },
    { title: "Support", icon: "Ticket", link: "/tickets", role: "view_ticket" },
  ];

  return (
    <C.Container
      ref={ref}
      width={
        width < 720
          ? state.menu.openedMenu
            ? 216
            : 0
          : state.menu.openedMenu
            ? 216
            : 64
      }
    >
      <C.MenuButton onClick={handleOpenMenu}>
        {state.menu.openedMenu ? (
          <MenuOpen style={{ color: menu.icon, fontSize: "32px" }} />
        ) : (
          <MenuIcon style={{ color: menu.icon, fontSize: "32px" }} />
        )}
      </C.MenuButton>

      {token && auth.loadingValidation ? (
        <p>Carregando...</p>
      ) : !auth.user ? (
        <p>Faça login...</p>
      ) : (
        <C.MenuNavigation>
          {menuList.map((item, index) =>
            auth.permissions.includes(item.role) ? (
              <MenuItem key={index} title={item.title} icon={item.icon} link={item.link} />
            ) : null
          )}
        </C.MenuNavigation>
      )}
    </C.Container>
  );
};

export default Menu;
