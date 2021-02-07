import React, { Component } from 'react'

class Canvas extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isPainting: false,
      userStrokeStyle: '#EE92C2',
      line: [],
      prevPos: { offsetX: 0, offsetY: 0 }
    }
    this.onMouseDown = this.onMouseDown.bind(this)
    this.onMouseMove = this.onMouseMove.bind(this)
    this.endPaintEvent = this.endPaintEvent.bind(this)
  }

  onMouseDown({ nativeEvent }) {
    const { offsetX, offsetY } = nativeEvent
    this.setState({isPainting: true})
    this.setState({prevPos: { offsetX, offsetY }})
  }

  onMouseMove({ nativeEvent }) {
    if (this.state.isPainting) {
      const { offsetX, offsetY } = nativeEvent
      const offSetData = { offsetX, offsetY }
      const positionData = {
        start: { ...this.state.prevPos },
        stop: { ...offSetData },
      }
      this.setState({
        line: [...this.state.line, positionData]
      })
      this.paint(this.state.prevPos, offSetData, this.state.userStrokeStyle)
    }
  }

  endPaintEvent() {
    if (this.state.isPainting) {
      this.setState({isPainting: false})
      this.sendPaintData()
    }
  }

  paint(prevPos, currPos, strokeStyle) {
    const { offsetX, offsetY } = currPos
    const { offsetX: x, offsetY: y } = prevPos

    this.ctx.beginPath()
    this.ctx.strokeStyle = strokeStyle;
    this.ctx.moveTo(x, y)
    this.ctx.lineTo(offsetX, offsetY)
    this.ctx.stroke()
    this.setState({prevPos: { offsetX, offsetY }})
  }

  async sendPaintData() {
    const body = {
      line: this.state.line
    }
    
    const req = await fetch('http://localhost:4000', {
      method: 'post',
      body: JSON.stringify(body),
      headers: {
        'content-type': 'application/json',
      },
    })
    const res = await req.json()
    this.state.line = []
  }

  componentDidMount() {
    this.canvas.width = 1000
    this.canvas.height = 800
    this.ctx = this.canvas.getContext('2d')
    this.ctx.lineJoin = 'round'
    this.ctx.lineCap = 'round'
    this.ctx.lineWidth = 5
  }

  render() {
    return (
      <canvas
        ref={(ref) => (this.canvas = ref)}
        style={{ background: 'white' }}
        onMouseDown={this.onMouseDown}
        onMouseLeave={this.endPaintEvent}
        onMouseUp={this.endPaintEvent}
        onMouseMove={this.onMouseMove}
      />
    );
  }
}
export default Canvas