import { toast } from 'react-toastify';
import { ToastProps } from '../../@types';

const notify = (props: ToastProps) => {
  const {
    message,
    position = 'top-right',
    autoClose = 5000,
    hideProgressBar = false,
    closeOnClick = true,
    pauseOnHover = true,
    draggable = true,
    progress,
    theme = 'dark',
    type = 'info',
  } = props;

  toast(message, {
    position,
    autoClose,
    hideProgressBar,
    closeOnClick,
    pauseOnHover,
    draggable,
    progress,
    type,
    theme,
  });
};

export { notify };
