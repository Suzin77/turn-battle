import { BattleAnnouncer } from 'components/BattleAnnouncer';
import { BattleMenu } from 'components/BattleMenu';
import { PlayerSummary } from 'components/PlayerSummary';
import { useState } from 'react';
import { opponentStats, playerStats } from 'shared/characters';
import styles from './styles.module.css';

export const Battle = ({onStartClick}) => {

    const [opponentHealth, setOpponentHealth] = useState(opponentStats.maxHealth);
    const [playerHealth, setplayerHealth] = useState(playerStats.maxHealth);

    const [announceMessage, setAnnounceMessage] = useState('');
    return (
        <>
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

            <div className={styles.characters}>
                <div className={styles.gameHeader}>
                    {playerStats.name} vs {opponentStats.name}
                </div>
                <div className={styles.gameImages}>
                    <div className={styles.playerSprite}>
                        <img src={playerStats.img} alt={playerStats.name} />
                    </div>
                    <div className={styles.opponentSprite}>
                        <img src={opponentStats.img} alt= {opponentStats.name}/>
                    </div>
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

                <div className={styles.hud}>
                    <div className={styles.hudChild}>
                        <BattleAnnouncer 
                            message = {announceMessage || `what will ${playerStats.name} do?`}
                        />
                    </div>
                    <div className={styles.hudChild}>
                        <BattleMenu 
                            onAttack={()=> console.log(playerStats.attack)}
                            onMagic={()=> console.log(playerStats.magic)}
                            onHeal={()=> console.log(playerStats.maxHealth)}
                        />
                    </div>
                </div> 
            </div>
            
         
        </>         
        )
}