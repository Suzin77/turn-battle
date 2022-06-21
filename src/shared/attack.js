export const attack = ({ attacker, receiver }) => {
    const receivedDamage =
      attacker.attack - (attacker.level - receiver.level) * 1.25;
  
    const finalDamage = receivedDamage - receiver.defense / 2;
  
    return finalDamage;
  };