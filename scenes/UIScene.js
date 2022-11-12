export default class UIScene extends Phaser.Scene {
    constructor(game) {
        super({ key: 'UIScene', active: true })
        this.game = game
        this.highscore = 0
        this.highScoresList = []
    }
    preload() {
        this.load.image('barFull', '/assets/img/bar_full.png')
        this.load.image('barEmpty', '/assets/img/bar_empty.png')
    }
    create() {
        this.worldScene = this.scene.get('World')
        this.uiSceneScene = this.scene.get('UIScene')
        this.barEmpty = this.add.image(
            this.game.config.width / 2,
            30,
            'barEmpty'
        )
        this.scoreText = this.add.text(30, 30, `Score: 0`)
        this.highScoresListText = this.add.text(this.game.config.width -120, 30, 'HighScores:')
        this.barEmpty.scale = 10
        this.barFull = this.add.image(this.game.config.width / 2, 30, 'barFull')
        this.barFull.scale = 10

        this.worldScene.events.on(
            'updateTiredness',
            (tiredness) => {
                this.barFull.setCrop(
                    0,
                    0,
                    this.barFull.width * (tiredness / 30),
                    this.barFull.height
                )
            }
        )

        this.worldScene.events.on('updateHighscore', (addValue = 1)=>{
                this.highscore += addValue
                console.log(addValue, this.highscore)
                this.scoreText.setText(`Score: ${this.highscore}`)
        })

        this.uiSceneScene.events.on('resetHighScore', ()=>{
            this.highscore = 0;
            this.scoreText.setText(`Score: ${this.highscore}`)
        })

        this.uiSceneScene.events.on('saveHightScore', ()=>{
            this.highScoresList.push(this.highscore)

            let scoreString = "HighScores:";

            for(var i = 0; i < this.highScoresList.length; i++){
                scoreString += `\nYou:${this.highScoresList[i]}`
            }
            this.highScoresListText.setText(scoreString)
        })
    }
}
