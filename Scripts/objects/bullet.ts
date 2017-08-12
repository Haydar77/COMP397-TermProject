module objects {
    // button class
    export class Bullet extends createjs.Sprite {
        // private instance variables
        public position:Vector;
        public height:number;
        public width:number;
        // constructor
        constructor(path: string, x:number, y: number) {
            super(textureSprite, path);
            this.x = x;
            this.y = y;
            this.width = this.getBounds().width;
            this.height = this.getBounds().height;
            this.position = new Vector(x, y);
        }


    }
}