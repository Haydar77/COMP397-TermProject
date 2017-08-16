module objects {
    export class Zombie extends createjs.Sprite {

        // private instance variables 
        private _zombieName:string;
        private _zombieType:string;
        public health:number;
        private rewardPoints:number;
        public position:Vector;
        public isDead:boolean;
        public _healthBar:createjs.Shape;

        // public instance variables
        public width:number;
        public height:number;

        constructor(zombieName:string, zombieType:string, x:number, y:number, public added:boolean=false) {
            super(textureSprite, zombieName);
            this.width = this.getBounds().width;
            this.height = this.getBounds().height;

            this.x = x;
            this.y = y;
            this.position = new Vector(x, y);
            this.isDead = false;
            
            this._healthBar = new createjs.Shape();
            this._healthBar.graphics.beginStroke("#000")
            this._healthBar.graphics.beginFill("#b21616").rr(0,0, this.width, 5, 2);
            
            
            this._zombieName = zombieName;
            this._zombieType = zombieType;
            this.start();

            // this is to randomize the path of each zombie
            //this.y = y * (Math.round((Math.random() * (0.4-0.3) + 0.3)*100)/100);
            
        }

        public start():void {
            switch(this._zombieType) {
                case "walker": 
                    this.health = 30;
                    break;
                case "mumbler":
                    this.health = 50;
                    break;
            }

        }

        public move(direction:number, destX:number, destY:number):void {
            switch(direction) {
                case 0:
                    createjs.Tween.get(this).to({y:destY}, Math.abs((this.y - destY) * 40));
                    break;
                case 2:
                    createjs.Tween.get(this).to({y:destY}, Math.abs((this.y - destY) * 40));
                    break;
                case 1:
                    createjs.Tween.get(this).to({x: destX}, Math.abs((this.x - destX) * 40));
                    break;
                case 3:
                    createjs.Tween.get(this).to({x: destX}, Math.abs((this.x - destX) * 40));
                    break;
            }
        }

        public update():void {
            this.position = new Vector(this.x, this.y)
            if(this.health <= 0) {
                this.isDead = true;
                console.log("Health: " + this.health);
            }
            this._healthBar.x = this.x;
            this._healthBar.y = this.y - 10;
            this._healthBar.graphics.beginFill("#2bce2b");
            
            
            //this._healthBar.y = this._healthBar.y - this.y;
            
            if(this.x < 120 && this.y == 260) {
                this.move(config.Direction.RIGHT, 120, 260);
                if(this.x == 0) {
                    this.changeDirection(this._zombieType,config.Direction.RIGHT)
                } 
            }
            if(this.x == 120 && this.y > 60) {
                if(this.y == 260) {
                    this.changeDirection(this._zombieType, config.Direction.UP);
                }
                this.move(config.Direction.UP, 120, 60);
            }
            if(this.x < 505 && this.y == 60) {
                if(this.x == 120) {
                    this.changeDirection(this._zombieType, config.Direction.RIGHT)
                }
                this.move(config.Direction.RIGHT, 505, 60)
            }
            if(this.x == 505 && this.y < 130) {
                if(this.y == 60) {
                    this.changeDirection(this._zombieType, config.Direction.DOWN)
                }
                this.move(config.Direction.DOWN, 505, 130);
            }
            if(this.x < 640 && this.y == 130) {
                if(this.x == 505) {
                    this.changeDirection(this._zombieType, config.Direction.RIGHT)
                }
                this.move(config.Direction.RIGHT, 640, 130);
            }
        }

        public changeDirection(zombieName:string, dir:number) {
            switch(zombieName) {
                case "walker":
                    switch(dir) {
                        case 0:
                            this.gotoAndPlay("walkerUp");
                            break;
                        case 1:
                            this.gotoAndPlay("walkerRight");
                            break;
                        case 2:
                            this.gotoAndPlay("walkerDown");
                            break;
                        case 3:
                            this.gotoAndPlay("walkerLeft");
                            break;
                    }
                    break;
                case "mumbler":
                    switch(dir) {
                        case 0:
                            this.gotoAndPlay("mumblerUp");
                            break;
                        case 1:
                            this.gotoAndPlay("mumblerRight");
                            break;
                        case 2:
                            this.gotoAndPlay("mumblerDown");
                            break;
                        case 3:
                            this.gotoAndPlay("mumblerLeft");
                            break;
                    }
            } 

                
        }
    }
} 