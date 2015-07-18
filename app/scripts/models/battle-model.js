define([], function() {
  // player is a player model. adversary is an enemy model
  // which can probably be a player model still
  var BattleModel = function(player, adversary) {
    this.player = player;
    this.adversary = adversary;
    this.simulateBattle = function() {
      console.log('starting battle');
      while (!this.winner) {
        this.executeTurn();
      }
      console.log('battle over. winner: ' + this.winner);
    };
    this.executeTurn = function() {
      // await user input. assume attack for now
      player.attack(adversary);
      if (adversary.health <= 0) {
        this.winner = player;
        console.log('adversary destroyed!');
      } else {
        adversary.attack(player);
        if (player.health <= 0) {
          // game over!!!!
          this.winner = adversary;
          console.log('you dun fucked up homie :/');
        }
      }
    };
  }

  return BattleModel;
});
