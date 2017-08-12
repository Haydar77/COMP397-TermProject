/**
 * @file level1.ts
 * @author Ostap Hamarnyk
 * @date August 9 2017
 * @version 0.3
 * @description The first level of the game. Difficulty: easy. 
 */
module Scenes {
    export class Level1 extends Scenes.GameScene {
        // public instance variables
        public closestZombie:objects.Zombie;
        // private instance variables
        private _zombies:objects.Zombie[];
        private _currentTime:number = createjs.Ticker.getTime();
        private _zombiesAdded:number = 0;
        public _turret:objects.Turret;
        private _turretArea:objects.TurretArea;
        private _turretArea2:objects.TurretArea;
        private _bullet:objects.Bullet;
        private _bTime:number;

        // Constructor
        constructor() {
            super("mapOne", "levelOne_s");
            if(!this.onPause) {
                this.start();
            }
        }

        public start():void {
            this._zombies = new Array<objects.Zombie>();
            this._bTime = createjs.Ticker.getTime();
            
            // testing turet area
            this._turretArea = new objects.TurretArea("turretArea", 195, 150);
            this._turretArea2 = new objects.TurretArea("turretArea", 455, 150)
            this._bullet = new objects.Bullet("bullet", 195, 150)

            for(var i:number = 0; i < 6; i++) {
                if(i < 3) {
                    this._zombies.push(new objects.Zombie("walkerRight","walker", 0, 260));
                } else {
                    this._zombies.push(new objects.Zombie("mumblerRight", "mumbler", 0, 260));
                }
                this._zombies[i].on("click", this._zombie_Click, this);
            }
            this.closestZombie = this._zombies[0];

            this.addChild(this._turretArea, this._turretArea2, this._bullet);
            
            stage.addChild(this);


           
        }

        public update():void {
            if(this._bullet.isVisible() == true)
                {
                    if(this.closestZombie.x != 0) {
                        
                        if(this._bullet.y <= this.closestZombie.y || this._bullet.x <= this.closestZombie.x) {
                            this.removeChild(this._bullet);
                            
                            if(createjs.Ticker.getTime() > this._bTime + 1000) {
                                this._bullet = new objects.Bullet("bullet", this._turretArea.x, this._turretArea.y )
                                this.addChild(this._bullet);
                                this._bTime = createjs.Ticker.getTime();
                            }
                        } else {
                            createjs.Tween.get(this._bullet).to({y:this.closestZombie.y, x:this.closestZombie.x}, 700, createjs.Ease.linear);
                        }
                    }
                }
                
    
            // calculate the angle for the gun to follow the zombie
            if(this._turretArea.notNull) {
                this._turretArea.update().calculateAngle(this.closestZombie);
            }
            if(this._turretArea2.notNull) {
                this._turretArea2.update().calculateAngle(this.closestZombie);
            }
            if(this.startGame) {
                this.addZombies(this._zombies);

                this._zombies.forEach(zombie => {
                    if(zombie.x > this.closestZombie.x && zombie.y > this.closestZombie.y) {
                        this.closestZombie = zombie;
                    }
                });

                if(this.closestZombie.x >= 640) {
                    if(this._zombies.length != 0) {
                        this.lifeCounterAmt--;
                        this._zombies.shift();
                    } else  {
                        scene = config.Scene.OVER_SCENE;
                        changeScene();
                    }
                    
                    gameScene.updateScore();
                }
            }

            if(this._zombies.length <= 0) {
                // scene = config.
            }
            
        }

        // method to add zombies of any type to the stage and make them move in the desired direction
        public addZombies(arr:objects.Zombie[]) {
            arr.forEach(zombie => {
                if(this._zombiesAdded != arr.length && !zombie.added) {
                    if(createjs.Ticker.getTime() > this._currentTime + 1000) {
                        this.addChild(zombie);
                        this._currentTime = createjs.Ticker.getTime();
                        zombie.added = true;
                    } 
                }
                if(zombie.added) {
                    zombie.update();
                }
            });
        }

        // Event handlers
        private _zombie_Click(event:createjs.MouseEvent) {
            this._zombies.shift()
            this.removeChild(this.closestZombie);
            // this.removeChild(event.target);
            if(this._zombies.length !== 0) {
                this.closestZombie = this._zombies[0];
            } else {
                this.closestZombie.x = 0;
                this.closestZombie.y = 0;
            } 
        }
        
        private _gun_Click(event:createjs.MouseEvent) {
            this._bullet.visible = true;
        }
    }
}
