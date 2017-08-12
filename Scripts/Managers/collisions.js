/**
 * @file collisions.ts
 * @author Ostap Hamarnyk
 * @date August 11 2017
 * @version 0.3
 * @description The collisions class to manage game collisions.
 */
var Managers;
(function (Managers) {
    var Collision = (function () {
        function Collision() {
            this.start();
        }
        Collision.prototype.start = function () {
        };
        Collision.prototype.check = function (object1, object2) {
            //console.log("object 1: " + object1.position);
            //console.log("object 2: " + object2.position);
            if (objects.Vector.calcDistance(object1.position, object2.position) < object2.height) {
                return true;
            }
        };
        return Collision;
    }());
    Managers.Collision = Collision;
})(Managers || (Managers = {}));
//# sourceMappingURL=collisions.js.map