import React from 'react';
import ReactDOM from 'react-dom';
import data from "./wordlist"

class PlayModeToggle extends React.Component{
    render(){
        let text = this.props.manualMode ? "30sec.Challenge" : "Manual Mode"
        return(
        <button onClick={this.props.onClick}>{text}</button>
        )
    }

}

class NextButton extends React.Component{
    render(){
        return(
            <button onClick={this.props.onNext}>Next</button>
        )
        
    }
}

class NextTimer extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            seconds: 30
        }
        this.setTimer = this.setTimer.bind(this)
    }


    componentDidMount() {
        this.setTimer()
    }

    setTimer() {
        this.myInterval = setInterval(() => {
            this.setState(({ seconds }) => ({
                seconds: seconds - 1
            }))
            if (this.state.seconds === 0){
                clearInterval(this.myInterval)
                this.props.onNext()
                this.setState({seconds:30})
                this.setTimer()
                var audio = new Audio( 
                    'https://media.geeksforgeeks.org/wp-content/uploads/20190531135120/beep.mp3'); 
                audio.play(); 
            }
        }, 1000)
    }

    componentWillUnmount() {
        clearInterval(this.myInterval)
    }

    render(){
        return(
            <div>
                time: {this.state.seconds}
            </div>
        )
        
    }
}

class WordDisplay extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            word: "Word"
        }
        this.getWord = this.getWord.bind(this)
    }

    getWord(){
        let newWord = data.words[Math.floor(Math.random() * data.words.length)]
        this.setState({word: newWord})

    }

    componentDidMount(){
        this.getWord()
    }

    render(){
        let navigator = this.props.manualMode ? <NextButton onNext={this.getWord}/> : <NextTimer onNext={this.getWord}/>

        return(
            <div>
                <div>{this.state.word}</div>
                {navigator}
            </div>
            
        )
    }
}

class Game extends React.Component{
    constructor(props) {
        super(props);    
        this.state = {      
            manualMode: true,    
        };  
        this.toggleMode = this.toggleMode.bind(this)
    }

    toggleMode(){
        this.setState(prevState => ({manualMode:!prevState.manualMode}))
    }

    render(){
        return(
            <div>
                <PlayModeToggle manualMode={this.state.manualMode} onClick={this.toggleMode}/>
                <WordDisplay manualMode={this.state.manualMode}/>
            </div>
        )
    }
}


// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
