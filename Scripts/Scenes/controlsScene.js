var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Scenes;
(function (Scenes) {
    var ControlsScene = (function (_super) {
        __extends(ControlsScene, _super);
        function ControlsScene() {
            return _super.call(this) || this;
        }
        ControlsScene.prototype.start = function () {
            this._background = new createjs.Bitmap(assets.getResult("instructionsBackground"));
            this._backBtn = new objects.Button("backBtn", 95, 450);
            this.addChild(this._background, this._backBtn);
            stage.addChild(this);
            // event listeners for close button click
            this._backBtn.on("click", this._backBtn_Click, this);
        };
        // Event handlers
        ControlsScene.prototype._backBtn_Click = function (event) {
            scene = config.Scene.START_SCENE;
            changeScene();
        };
        return ControlsScene;
    }(objects.Scene));
    Scenes.ControlsScene = ControlsScene;
})(Scenes || (Scenes = {}));
//# sourceMappingURL=controlsScene.js.map