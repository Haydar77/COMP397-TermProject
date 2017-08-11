/**
 * @file turret.ts
 * @author Ostap Hamarnyk
 * @date August 9 2017
 * @version 0.1
 * @description The class that has generic properties of the turret
 */
module objects {
    export class Turret extends createjs.Sprite {
        //private instance variables
        private _turretName:string;
        protected turretType:string;
        private _gun:objects.Gun;
        private _range:createjs.Shape;
        private _angle:number;

        // public instance variables
        public width:number;
        public height:number;
        
        // Constructor
        constructor(turretName:string, x:number, y:number) {
            super(turretTexture, turretName);
            this._turretName = turretName;
            this.x = x;
            this.y = y;
            this.regX = this.getBounds().width / 2;
            this.regY = this.getBounds().height / 2;
            this.start();
            this._range.graphics.drawCircle(this.x, this.y, this.getBounds().width);
            
        }



        public start():void {
            this._gun = new objects.Gun("gun", this.x, this.y)
            this._range = new createjs.Shape();
            this._range.graphics.beginFill("#98FB98");
            this._range.alpha = .4;
            this._range.graphics.beginStroke("#1db81d");
            this._range.visible = false;

             // event listeners
            stage.on("click", this._stage_Click, this);
            this._gun.on("click", this._gun_Click, this);
            
        }

        public update():void {
            gameScene.addChild(this._gun, this._range);
        }

        public calculateAngle(closestZombie:objects.Zombie):void {
            
            //if(this.inRange(closestZombie)) {
                this._angle = Math.atan2(closestZombie.y - this._gun.y, closestZombie.x - this._gun.x)
                this._angle = this._angle * (180/Math.PI);
                // this if statement is to set angle to (0 - 360) instead of (-180 - 180)
                if(this._angle < 0)  {
                    this._angle = 360 - ( - this._angle);
                }
                this._gun.rotation = this._angle + 90;
            //} 
        }
        // method tp calculate if the zombie is in the shooting range of the turret
        public inRange(zombie:objects.Zombie):boolean {
                       
            var distance = Math.pow(zombie.x - this._range.x, 2) + Math.pow(zombie.y - this._range.y, 2);
            
            if(Math.pow(this.getBounds().width/2, 2) >= distance) {
                return true;
            } else return false;
        }

        private _reset():void {

        }

        // Event handlers
        private _gun_Click(event:createjs.MouseEvent) {
            this._range.visible = true;
        }

        private _stage_Click(event:createjs.MouseEvent) {
            if(event.target != this._gun) {
                this._range.visible = false;
            } 
        }
    }
}