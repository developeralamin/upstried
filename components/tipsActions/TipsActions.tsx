import React, { useState } from 'react';
import styles from './TipsActions.module.scss';

export interface TipsActionsProps {
  tip: any;
  onTipDeleted?: any;
  onTipUpdated: any;
}

const TipsActions: React.FC<TipsActionsProps> = () => {
  const [dropdown, setDropdown] = useState(false);

  return (
    <>
      <div className={`${styles.TipsActions} TipsActions`}>
        <button
          className={styles.Toggler}
          onClick={() => (dropdown ? setDropdown(false) : setDropdown(true))}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </>
  );
};

export default TipsActions;
