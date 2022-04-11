
const Styles = () => {
    function LightModeStyles() {
        this.lbg = "#e2e8f0"
        this.lnavBarBg = "#161853"
        this.lcontainerCol = 'white'

        this.llogoCol = "dodgerblue"
        this.ltextCol = 'black'
        this.lborderCol = "#e2e8f0"
    }
    const lightModeColors = new LightModeStyles()

    function DarkModeStyles() {
        // this.dbg = "#726A95"
        // this.dnavBarBg = "#351F39"
        // this.dcontainerCol = "#3C415C"
        this.dbg = "#263859"
        this.dnavBarBg = "#17223B"
        this.dcontainerCol = "#6B778D"

        this.dlogoCol = "#B4A5A5"
        this.dtextCol = 'white'
        this.dborderCol = "#B4A5A5"
    }
    const darkModeColors = new DarkModeStyles()

    return { lightModeColors, darkModeColors, delay:"0.5s" }
}



export default Styles

