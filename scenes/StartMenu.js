export default class StartMenu extends Phaser.Scene {
    constructor(game) {
        super({ key: 'StartMenu' })
        this.game = game
    }
    preload() {
        this.load.image('StartMenuBackground', '/assets/img/CoffeeRushKappa.gif')
    }
    create() {
        this.add.image(0, 0, 'StartMenuBackground').setOrigin(0, 0)
        this.add.text(100, 100, 'Coffee Rush!?')
        this.add.text(100, 200, 'Press Space to Start')
        var spaceBar = this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.SPACE
        )
        spaceBar.on('up', () => { 
            this.scene.start('World')
        })
    }
}
