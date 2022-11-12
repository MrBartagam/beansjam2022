export default class GameOver extends Phaser.Scene {
    constructor(game) {
        super({ key: 'GameOver' })
        this.game = game
    }
    preload() {}
    create() {
        this.add.text(100, 100, 'Game Over')
        this.add.text(100, 200, 'Press Space to restart')
        var spaceBar = this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.SPACE
        )
        spaceBar.on('up', () => {
            this.scene.get('UIScene').events.emit('saveHightScore')
            this.scene.get('UIScene').events.emit('resetHighScore')
            this.scene.start('World')
        })
    }
}
