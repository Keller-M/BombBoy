var gameport = document.getElementById("gameport");

var renderer = PIXI.autoDetectRenderer(600, 600, {backgroundColor: 0xbdbdbd});
gameport.appendChild(renderer.view);

var stage = new PIXI.Container();

var alive = true;
var hero = new PIXI.Sprite(PIXI.Texture.fromImage("hero.png"));
var shield = new PIXI.Sprite(PIXI.Texture.fromImage("shield.png"));
var bomb = new PIXI.Sprite(PIXI.Texture.fromImage("bomb.png"));
var bomb2 = new PIXI.Sprite(PIXI.Texture.fromImage("bomb.png"));
var bomb3 = new PIXI.Sprite(PIXI.Texture.fromImage("bomb.png"));


var base = new PIXI.Container();
base.position.x = 300;
base.position.y = 332;
stage.addChild(base);

base.addChild(hero);
hero.anchor.x = 0.5;
hero.anchor.y = 0.5;
hero.position.x = 0;
hero.position.y = 0;

base.addChild(shield);
shield.anchor.x = .5;
shield.anchor.y = 1;
shield.position.x = 16;
shield.position.y = -32;

base.addChild(bomb);
bomb.position.x = -300;
bomb.position.y = -32;

base.addChild(bomb2);
bomb2.position.x = 300;
bomb2.position.y = -32;

base.addChild(bomb3);
bomb3.position.x = -34;
bomb3.position.y = -300;


function keydownEventHandler(e) 
{

  if (e.keyCode == 87) { // W key
    shield.rotation = 0;
	shield.position.x = 0;
	shield.position.y = -32;
  }

  if (e.keyCode == 65) { // A key
    hero.scale.x = 1;
	shield.position.x = -32;
	shield.position.y = 0;
    shield.rotation = -1.5708;
  }

  if (e.keyCode == 68) { // D key
    hero.scale.x = -1;
	shield.position.x = 32;
	shield.position.y = 0;
    shield.rotation = 1.5708;
  }
}

//Found this on this website http://www.html5gamedevs.com/topic/24408-collision-detection/ 
function shieldHit(shld, bmb)
{
  var ab = shld.getBounds();
  var bb = bmb.getBounds();
  return ab.x + ab.width > bb.x && ab.x < bb.x + bb.width && ab.y + ab.height > bb.y && ab.y < bb.y + bb.height;
}

function playerHit(player, bmb)
{
  var ab = player.getBounds();
  var bb = bmb.getBounds();
  return ab.x + ab.width > bb.x && ab.x < bb.x + bb.width && ab.y + ab.height > bb.y && ab.y < bb.y + bb.height;
}

document.addEventListener('keydown', keydownEventHandler);


function animate() {
	requestAnimationFrame(animate);

	
	
		bomb.position.x += 3;
		bomb2.position.x -= 3;
		bomb3.position.y += 3;
	if( alive )
	{
			
		if(shieldHit(shield, bomb))
		{
			bomb.position.x = -300;
		}
		
		if(shieldHit(shield, bomb2))
		{
			bomb2.position.x = 300;
		}
		
		if(shieldHit(shield, bomb3))
		{
			bomb3.position.y = -300;
		}
	}
	
	renderer.render(stage);
}
animate();
