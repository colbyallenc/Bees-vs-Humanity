var enemy = function(type){

  this.points = 25;
  this.type = type;
  this.speed = rand(-7, -2);
  this.live = false;
  this.id = 'enemy_ship2' + '_' + level.distance;

  this.playground = document.getElementById('playground');
  this.enemy = document.createElement('div');
  this.enemy.id = this.id;
  this.enemy.className = 'enemy_ship2';
  this.playground.appendChild(this.enemy);
  this.enemy = document.getElementById(this.id);
  //Initial POS
//  this.pos = {
//    top: rand($('#playground').offset().top, $('#playground').offset().top + $('#playground').height() - 40),
//    left: $('#playground').offset().left + $('#playground').width() - 30
//  };
  this.pos = {
    top: rand($(this.playground).offset().top, $(this.playground).offset().top + $(this.playground).height()-70),
    left: $(this.playground).offset().left + $(this.playground).width() - 30
  };

  this.explode = function(){
    this.pos.top -= 10;
    this.pos.left -= 10;
    //$('#'+this.id).addClass('explode');
    $(this.enemy).addClass('explode');
    this.draw();
  }

  this.draw = function(){


    $(this.enemy).css({
      top: (this.pos.top) + "px",
      left: (this.pos.left) + "px"
    });
    this.live = true;
  //console.log(this);
    };
    this.draw();
    this.live = true;
    enemies.onscreen++;

}


for(i in enemies.enemy){
  if(enemies.enemy[i] != undefined){
    //console.log(enemies.enemy[i]);
    if((enemies.enemy[i].pos.left < ($(level.playground).offset().left + 30)) && enemies.enemy[i].live){
      //missiles[i].destroy();
      //$("#"+enemies.enemy[i].id).remove();
      $(enemies.enemy[i].enemy).remove();
      //delete enemies.enemy[i];
      item_remove(enemies.enemy, i, 1)
      enemies.onscreen--;
      this.live = false;

    }
    else if(
      (enemies.enemy[i].pos.left < ($(player1.player).offset().left + $(player1.player).width())) &&
      (
        //(enemies.enemy[i].pos.top + 20) > $(player1.player).offset().top - 36 &&
        //(enemies.enemy[i].pos.top + 20) < $(player1.player).offset().top + 40
        Math.abs(
          (enemies.enemy[i].pos.top + ($('.enemy_ship2').height())/2) -
          ($(player1.player).offset().top + ($(player1.player).height())/2)
          )
        < 70
        )
      )
      {
      //console.log('Boom');
      //level.gameOver = true;
      //return;
      player1.explode();
      enemies.enemy[i].explode();
      enemies.onscreen--;
      setTimeout(function(){
        level.gameOver = true;
        $('.explode').hide();
        endGame();
      }, 500);

    }
    else{
      //console.log(missiles[i].pos.left);
      //console.log(missiles[i].speed);
      enemies.enemy[i].pos.left += enemies.enemy[i].speed;
      enemies.enemy[i].draw();

    }
  }
}
//Move the Missiles
for(i in missiles){
  if(missiles[i] != undefined){
    if(missiles[i].pos.left > ($(level.playground).offset().left + $(level.playground).width()-30)){
      //console.log($("#"+missiles[i].id).hide().remove());
      //$("#"+missiles[i].id).remove();
      //$(missiles[i].missile).remove();
      missiles[i].remove();
      item_remove(missiles, i, 1);
    }
    else{
      //console.log(missiles[i].pos.left);
      //console.log(missiles[i].speed);
      missiles[i].pos.left += missiles[i].speed;
      missiles[i].draw();

      //check for collision with enemy and blow em up!
      //distance calculation..
      if(enemies.enemy.length){
        for(j in enemies.enemy)
          dist = parseInt(Math.sqrt(
            Math.pow((enemies.enemy[j].pos.left - missiles[i].pos.left), 2) +
            Math.pow((enemies.enemy[j].pos.top - missiles[i].pos.top), 2)
            ));
        if(dist < 80){
          player1.score += enemies.enemy[j].points;
          //Explode the Enemy
          enemies.enemy[j].explode();
          setTimeout(function(){
            $('.explode').hide();
            enemies.onscreen--;
          }, 500);
          //Remove Missile
          //$("#"+missiles[i].id).remove();
          //$(missiles[i].missile).remove();
          missiles[i].remove();
          item_remove(missiles, i, 1);
          item_remove(enemies.enemy, j, 1);

        }
      }
    }
  }
}

//Generate new enemies if the total on screen is < 3
//and there are still more left to be killed
if(level.distance > 100)
  if(enemies.onscreen < enemies.maxInPage && enemies.dead < enemies.total){
    enemies.enemy.push(new enemy('ship2'));
  //console.log(enemies.enemy);
  }
