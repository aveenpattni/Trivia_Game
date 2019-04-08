import React, { Component } from 'react';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';
import './index.scss';
import Home from './Home';
import Footer from './Footer';
import Game from './Game';
import GameHeader from './GameHeader';
import Modal from './Modal';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.state={
      questionNum: 10,
      category: "",
      difficulty: "",
      questions: [],
      score: 0,
      time: 0,
      fail: false
    }
    this.categories = {
      generalKnowledge: 9,
      books: 10,
      film: 11,
      music: 12,
      musicals: 13,
      tv: 14,
      videoGames: 15,
      boardGames: 16,
      scienceNature: 17,
      computers: 18,
      math: 19,
      mythology: 20,
      sports: 21,
      geography: 22,
      history: 23,
      politics: 24,
      art: 25,
      celebrities: 26,
      animals: 27,
      vehicles: 28,
      comics: 29,
      gadgets: 30,
      animeManga: 31,
      cartoons: 32
    }
  }
  toggleModal = () => {
    this.setState({
      fail: !this.state.fail
    });
  }
  submitGame = (e) => {
    e.preventDefault();
    const category = e.target.category.value;
    const difficulty = e.target.difficulty.value;
    const cat = `&category=${this.categories[category]}`;
    const type = "&type=multiple";
    let diff = `&difficulty=${difficulty}`;
    if (diff === "&difficulty=any"){
      diff = "";
    }
    axios.get("https://opentdb.com/api.php?amount=" + this.state.questionNum + cat + diff + type).then(res=>{
      if(res.data.results.length < this.state.questionNum){
        this.toggleModal();
      }
      else{
        this.setState({
          category: category,
          difficulty: difficulty,
          questions: res.data.results
        });
        this.props.history.push("/game");
      }
    }).catch(err=>{
      console.log(err);
    })
  }

  render() {
    return (
      <div className="App">
        <Modal show={this.state.fail} toggle={this.toggleModal} />
        <Switch>
          <Route path="/" exact render={() => {return <Home formSubmit={this.submitGame}/>}} />
          <Route path="/game" render={() => {
            return <>
                <GameHeader />
                <Game len={this.state.questionNum} questions={this.state.questions}/>
              </>
            }} />
          <Route path="/" render={()=>{return <Redirect to="/" />}} />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default withRouter(App);
