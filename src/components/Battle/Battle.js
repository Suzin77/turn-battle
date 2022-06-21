import { BattleAnnouncer } from 'components/BattleAnnouncer';
import { BattleMenu } from 'components/BattleMenu';
import { PlayerSummary } from 'components/PlayerSummary';
import { useBattleSequence } from 'hooks/useBattleSequence';
import { useEffect, useState } from 'react';
import { useIAOpponent } from 'hooks/useIAOpponent';
import { opponentStats, playerStats } from 'shared/characters';
import styles from './styles.module.css';

export const Battle = ({onStartClick}) => {

    const [sequence, setSequence] = useState({});
    const {
        turn,
        inSequence,
        playerHealth,
        opponentHealth,
        announceMessage,
        playerAnimation,
        opponentAnimation
    } = useBattleSequence(sequence);

    const aiChoice = useIAOpponent(turn);

    useEffect(()=>{
        if(aiChoice && turn === 1 && !inSequence){
            setSequence({turn, aiChoice})
        }
    }, [turn, aiChoice, inSequence]);

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
                        <img 
                            src={playerStats.img} 
                            alt={playerStats.name}
                            className={styles[playerAnimation]}
                        />
                    </div>
                    <div className={styles.opponentSprite}>
                        <img 
                            src={opponentStats.img} 
                            alt= {opponentStats.name}
                            className={styles[opponentAnimation]}
                        />
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
                            onAttack={()=> setSequence({turn, mode: 'attack'}) }
                            onMagic={()=> setSequence({turn, mode: 'magic'})}
                            onHeal={()=> setSequence({turn, mode: 'heal'})}
                        />
                    </div>
                </div> 
            </div>
            
         
        </>         
        )
}