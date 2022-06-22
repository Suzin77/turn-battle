import { useEffect, useState } from "react"
import {wait, attack, magic, heal, opponentStats, playerStats} from "shared";


export const useBattleSequence = (sequence) => {

    const [turn, setTurn] = useState(0);
    const [inSequence, setInSequence] = useState(false);

    const [opponentHealth, setOpponentHealth] = useState(opponentStats.maxHealth);
    const [playerHealth, setPlayerHealth] = useState(playerStats.maxHealth);

    const [announceMessage, setAnnounceMessage] = useState('');

    const [playerAnimation, setPlayerAnimation] = useState('static');
    const [opponentAnimation, setOpponentAnimation] = useState('static');

    useEffect(()=>{
        const {mode, turn} = sequence;
        if(mode) {

            const attacker = turn === 0 ? playerStats : opponentStats;
            const receiver = turn === 0 ? opponentStats : playerStats;

            switch (mode) {
                case 'attack': {
                    const damage = attack({ attacker, receiver });

                    (async() => {
                        setInSequence(true);
                        setAnnounceMessage(`${attacker.name} has chosen attack`);

                        await wait(1000);

                        turn === 0 
                            ? setPlayerAnimation('attack') 
                            : setOpponentAnimation('attack');
                        await wait(100);

                        turn === 0 
                            ? setPlayerAnimation('static') 
                            : setOpponentAnimation('static');
                        await wait(500);

                        turn === 0 
                            ? setOpponentAnimation('damage') 
                            : setPlayerAnimation('damage');
                        await wait(750);

                        turn === 0 
                            ? setOpponentAnimation('static') 
                            : setPlayerAnimation('static');
                        setAnnounceMessage(`${receiver.name} feld that`);

                        turn === 0 
                            ? setOpponentHealth(h => (h- damage > 0 ? h - damage : 0 )) 
                            : setPlayerHealth(h => (h- damage > 0 ? h - damage : 0 ))
                        await wait(2000);

                        setAnnounceMessage(`Now it's ${receiver.name} turn ` );
                        await wait(1500);

                        setTurn(turn === 0 ? 1 : 0);
                        setInSequence(false);

                    })();
                    break;
                }

                case 'magic': {
                    const damage = attack({ attacker, receiver });

                    (async() => {
                        setInSequence(true);
                        setAnnounceMessage(`${attacker.name} has cast spell!`);

                        await wait(1000);

                        turn === 0 
                            ? setPlayerAnimation('magic') 
                            : setOpponentAnimation('magic');
                        await wait(100);

                        turn === 0 
                            ? setPlayerAnimation('static') 
                            : setOpponentAnimation('static');
                        await wait(500);

                        turn === 0 
                            ? setOpponentAnimation('damage') 
                            : setPlayerAnimation('damage');
                        await wait(750);

                        turn === 0 
                            ? setOpponentAnimation('static') 
                            : setPlayerAnimation('static');
                        setAnnounceMessage(`${receiver.name} feld that`);

                        turn === 0 
                            ? setOpponentHealth(h => (h- damage > 0 ? h - damage : 0 )) 
                            : setPlayerHealth(h => (h- damage > 0 ? h - damage : 0 ))
                        await wait(2000);

                        setAnnounceMessage(`Now it's ${receiver.name} turn ` );
                        await wait(1500);

                        setTurn(turn === 0 ? 1 : 0);
                        setInSequence(false);

                    })();
                    break;
                }

                case 'heal': {
                    const recovered = heal({receiver: attacker});

                    (async()=>{
                        setInSequence(true);
                        setAnnounceMessage(`${attacker.name} choose to heal!`);
                        await wait(1000);

                        turn === 0 ? setPlayerAnimation('magic') : setOpponentAnimation('magic');
                        await wait(1000);

                        turn === 0 
                            ? setPlayerAnimation('static') 
                            : setOpponentAnimation('static');
                        await wait(500);

                        setAnnounceMessage(`${attacker.name} has recoverd ${recovered} health points.`);
                        turn === 0 
                            ? setPlayerHealth(h => h + recovered <= attacker.maxHealth ? h + recovered : attacker.maxHealth)
                            : setOpponentHealth(h => h + recovered <= attacker.maxHealth ? h + recovered : attacker.maxHealth)

                        await wait(2500);

                        setAnnounceMessage(`Now it's ${receiver.name}'s turn`);
                        await wait(500);

                        setTurn(turn === 0 ? 1 : 0);
                        setInSequence(false);

                    })();
                }
                default:
                    break;
            }
        }
    },[sequence]);

    return {
        turn,
        inSequence,
        playerHealth,
        opponentHealth,
        announceMessage,
        playerAnimation,
        opponentAnimation
    }
}