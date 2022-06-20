import styles from './styles.module.css'; 
import { useState } from 'react';
import { StartMenu, BattleMenu } from 'components';

export const App = () =>  {

    const [mode, setMode] = useState('start');

    return <div className={styles.main}>
      {mode === 'start' && <StartMenu onStartClick={() => setMode('battle')}/>}
      {mode === 'battle' && <BattleMenu/>}
      {mode === 'gameOver' && <>gameOver mode</>}
      
    </div>
}


