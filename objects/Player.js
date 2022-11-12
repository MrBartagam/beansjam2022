export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture)
        this.scene = scene
        this.scene.add.existing(this)
        this.scene.physics.add.existing(this)
        this.body.setCollideWorldBounds(true)
        this.tiredness = 5
        this.scene.time.addEvent({
            delay: 1000,
            callback: () => {
                if (this.tiredness > 0) {
                    this.tiredness--
                } else {
                    this.scene.scene.start('GameOver')
                }
                this.scene.events.emit('updateTiredness', this.tiredness)
            },
            loop: true
        })
        this.scene.anims.createFromAseprite('player')
    }
    update() {
        if (
            this.body.velocity.x > 0 ||
            this.body.velocity.x < 0 ||
            this.body.velocity.y > 0 ||
            this.body.velocity.y < 0
        ) {
            this.anims.play('run', true)
        } else {
            this.anims.play('idle', true)
        }

        if (this.scene.keys.up.isDown) {
            this.body.setVelocityY(-200)
            this.rotation = Math.PI
        } else if (this.scene.keys.down.isDown) {
            this.body.setVelocityY(200)
            this.rotation = 0
        } else {
            this.body.setVelocityY(0)
        }

        if (this.scene.keys.left.isDown) {
            this.body.setVelocityX(-200)
            this.rotation = Math.PI * 0.5
        } else if (this.scene.keys.right.isDown) {
            this.body.setVelocityX(200)
            this.rotation = Math.PI * 1.5
        } else {
            this.body.setVelocityX(0)
        }
    }
}
