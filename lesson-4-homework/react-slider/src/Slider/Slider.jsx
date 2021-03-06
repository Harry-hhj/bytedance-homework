import React, { Component } from 'react';

require('./Slider.css');

import SliderItem from './SliderItem/SliderItem';
import SliderDots from './SliderDots/SliderDots';
import SliderArrows from './SliderArrows/SliderArrows';

export default class Slider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nowLocal: 0,
    };
  }

  // 向前向后多少
  turn(n) {
    console.log("turn");
    var _n = this.state.nowLocal + n;
    if(_n < 0) {
      _n = _n + this.props.items.length;
    }
    if(_n >= this.props.items.length) {
      _n = _n - this.props.items.length;
    }
    this.setState({nowLocal: _n});
  }

  // 开始自动轮播
  goPlay() {
    console.log("goPlay");
    if(this.props.autoplay) {
      this.autoPlayFlag = setInterval(() => {
        this.turn(1);
      }, this.props.delay * 1000);
    }
  }

  // 暂停自动轮播
  pausePlay() {
    console.log("pausePlay");
    clearInterval(this.autoPlayFlag);
  }

  componentDidMount() {
    console.log("componentDidMount");
    this.goPlay();
  }

  down(e){
    console.log("down");
    this.setState({
        flag:true,
        x_last: e.clientX,
        x_start:e.clientX
    })
  }

  move(e){
    console.log("move");
      let move=0;
      if(this.state.flag===true){
          move=this.state.x_last-e.clientX;
          this.setState({
              x_last:e.clientX,
              // left:this.state.left-move
          })
      }
  }

  up(e){
    console.log("up");
    this.setState({
        flag:false,
    })
    console.log("this.state.x_start-e.clientX=", this.state.x_start-e.clientX);
    if(this.state.x_start-e.clientX>0){
        this.turn(1);
    }
    else if(this.state.x_start-e.clientX<0){
        this.turn(-1);
    }
    else{
      this.turn(0);
    }
  }

  render() {
    let count = this.props.items.length;

    let itemNodes = this.props.items.map((item, idx) => {
      return <SliderItem item={item} count={count} key={'item' + idx} />;
    });

    let arrowsNode = <SliderArrows turn={this.turn.bind(this)}/>;

    let dotsNode = <SliderDots turn={this.turn.bind(this)} count={count} nowLocal={this.state.nowLocal} />;

    return (
      <div
        className="slider"
        onMouseOver={this.props.pause?this.pausePlay.bind(this):null} onMouseOut={this.props.pause?this.goPlay.bind(this):null}>
          <ul style={{
              left: -100 * this.state.nowLocal + "%",
              transitionDuration: this.props.speed + "s",
              width: this.props.items.length * 100 + "%"
            }}
            onMouseDown={this.down.bind(this)} onMouseMove={this.move.bind(this)} onMouseUp={this.up.bind(this)}>
              {itemNodes}
          </ul>
          {this.props.arrows?arrowsNode:null}
          {this.props.dots?dotsNode:null}
        </div>
      );
  }
}

Slider.defaultProps = {
  speed: 1,
  delay: 2,
  pause: true,
  autoplay: true,
  dots: true,
  arrows: true,
  items: [],
};
Slider.autoPlayFlag = null;
