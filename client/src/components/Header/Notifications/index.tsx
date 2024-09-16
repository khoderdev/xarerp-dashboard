import { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import * as C from './styles';
import { NotificationsNone } from '@mui/icons-material';

const Notifications = () => {
  const { notifications } = useContext(ThemeContext);

  return (
    <C.Container>
      <NotificationsNone style={{ color: notifications.icon, fontSize: '26px' }} />
    </C.Container>
  );
}

export default Notifications;
