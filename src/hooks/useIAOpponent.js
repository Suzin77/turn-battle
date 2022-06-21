import { useEffect, useState } from "react";

export const useIAOpponent = (turn) => {

    const [iaChoice, setIAChoice] = useState('');

    useEffect(()=> {
        if(turn === 1 ){
            const options = ['attack', 'magick', 'heal'];
            setIAChoice(options[Math.floor(Math.random() * options.length)]);
        }
    },[turn]);
}