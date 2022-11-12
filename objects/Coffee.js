export default class Coffee extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture)
        this.scene = scene
        this.scene.add.existing(this)
        this.scale = 0.2
        this.scene.physics.add.existing(this)
        this.baseValue = 1
    }
}
