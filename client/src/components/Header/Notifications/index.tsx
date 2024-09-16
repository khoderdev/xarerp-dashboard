import { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import * as C from './styles';
import { NotificationsNone } from '@mui/icons-material';

// Define the structure for notifications in ThemeContext
type ThemeContextType = {
  notifications: {
    icon: string;
  };
};

const Notifications = () => {
  const { notifications } = useContext(ThemeContext) as ThemeContextType;

  return (
    <C.Container>
      <NotificationsNone style={{ color: notifications.icon, fontSize: '26px' }} />
    </C.Container>
  );
}

export default Notifications;
