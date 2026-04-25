import React from 'react';
import {
  AlertOctagon,
  AlertTriangle,
  CheckCircle,
  Info,
  X,
} from 'react-feather';

import { ToastContext } from '../ToastProvider';
import VisuallyHidden from '../VisuallyHidden';

import styles from './Toast.module.css';

const ICONS_BY_VARIANT = {
  notice: Info,
  warning: AlertTriangle,
  success: CheckCircle,
  error: AlertOctagon,
};

function Toast({ id, variant, children }) {
  const { dismissToast } = React.useContext(ToastContext);
  const Icon = ICONS_BY_VARIANT[variant];

  const [isExiting, setIsExiting] = React.useState(false);
  // Auto dismiss after 3s but trigger animation first
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
    }, 10000)

    return () => {
      clearTimeout(timer);
    }
  }, []);

  // React.useEffect(() => { 
  //   requestAnimationFrame(() => {

  //   })
  // }, []);

  // After animation is over, remove DOM node from the DOM
  function handleTransitonEnd() {
    if (isExiting) {
      dismissToast(id);
    }
  }


  return (
    <div 
      className={`
            ${styles.toast} 
            ${styles[variant]}
            ${isExiting ? styles.exit : styles.enter}
      `}
      onTransitionEnd={handleTransitonEnd}
    >
      <div className={styles.iconContainer}>
        <Icon size={24} />
      </div>
      <p className={styles.content}>
        <VisuallyHidden>{variant} -</VisuallyHidden>
        {children}
      </p>
      <button
        className={styles.closeButton}
        onClick={() => setIsExiting(true)}
        aria-label='dismiss message'
        aria-live='off'
      >
        <X size={24} />
      </button>
    </div>
  );
}

export default Toast;