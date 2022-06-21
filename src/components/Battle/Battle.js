import { PlayerSummary } from 'components/PlayerSummary';
import { useState } from 'react';
import { opponentStats, playerStats } from 'shared/characters';
import styles from './styles.module.css';

export const Battle = ({onStartClick}) => {

    const [opponentHealth, setOpponentHealth] = useState(opponentStats.maxHealth);
    const [playerHealth, setplayerHealth] = useState(playerStats.maxHealth);
    return (
        <div className={styles.main}> Battle Menu Component
            <div className={styles.opponent}>
                <div className={styles.summary}>
                    <PlayerSummary 
                        mainHuman={false}
                        name = {opponentStats.name}
                        level = {opponentStats.level}
                        health = {opponentHealth}
                        maxHealth = {opponentStats.maxHealth}
                    />
                </div>
            </div>

            <div className={styles.user}>
                <div className={styles.summary}>
                    <PlayerSummary 
                        mainHuman={true}
                        name = {playerStats.name}
                        level = {playerStats.level}
                        health = {playerHealth}
                        maxHealth = {playerStats.maxHealth}
                    />
                </div>
            </div>
        </div>
            
        )
}