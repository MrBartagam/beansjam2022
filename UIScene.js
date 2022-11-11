export default class UIScene extends Phaser.Scene {
    constructor(game) {
        super({ key: 'UIScene', active: true })
        this.game = game
        this.highscore
    }
    preload() {
        this.load.image('barFull', '/assets/img/bar_full.png')
        this.load.image('barEmpty', '/assets/img/bar_empty.png')
    }
    create() {
        this.worldScene = this.scene.get('World')
        this.barEmpty = this.add.image(
            this.game.config.width / 2,
            30,
            'barEmpty'
        )
        this.scoreText = this.add.text(30, 30, `Score: 0`)
        this.barEmpty.scale = 10
        this.barFull = this.add.image(this.game.config.width / 2, 30, 'barFull')
        this.barFull.scale = 10

        this.worldScene.events.on(
            'updateTiredness',
            (tiredness, highscore = this.highscore) => {
                this.highscore = highscore
                this.scoreText.setText(`Score: ${highscore}`)
                this.barFull.setCrop(
                    0,
                    0,
                    this.barFull.width * (tiredness / 30),
                    this.barFull.height
                )
            }
        )
    }
}
