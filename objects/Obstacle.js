export default class Obstacle extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture)

        this.scene = scene
        this.scene.add.existing(this)
        this.scene.physics.add.existing(this, true)
        let rotations = [0, Math.PI * 0.5, Math.PI, Math.PI * 1.5]
    }
}
