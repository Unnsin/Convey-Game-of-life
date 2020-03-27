import React from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { generateArrayEntity } from './utils'

class CanvasComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      EntityMap: [],
      x: 16,
      y: 16,
      entity: 10,
    }
  }


  componentDidMount() {
    const { x, y, entity } = this.state 
    const EntityMap = generateArrayEntity(entity, x, y)
    this.setState({ EntityMap: EntityMap }, () => {
      this.updateCanvas();
    })
  }

  createEntity = (ctx, radius, x, y) => {
    ctx.beginPath()
    ctx.arc(x, y, radius, 0, 2 * Math.PI, false)
    ctx.fillStyle = 'green'
    ctx.fill()
    ctx.strokeStyle = 'green'
    ctx.stroke()
    ctx.strokeStyle = 'black'
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  updateCanvas() {
    const { EntityMap, x, y } = this.state
    const ctx = this.refs.canvas.getContext('2d');
    this.refs.canvas.width= x*35
    this.refs.canvas.height = x*35
    ctx.strokeRect(20, 20, x*32, y*32);
    ctx.fillRect(20, 20, x*32, y*32);
    for (let i = 0; i < x; i += 1)
      for (let j = 0; j < y; j += 1) {
          ctx.strokeRect(20 + i * 32, 20 + j * 32, 32, 32);
          ctx.clearRect(20 + i * 32, 20 + j * 32, 32, 32);
          if(EntityMap[i][j]) {
            this.createEntity(ctx, 10, 36 + i * 32, 36 + j * 32)
          }
      }
  }

  newGenerate = () => {
    const { x, y, entity } = this.state 
    const EntityMap = generateArrayEntity(entity, x, y)
    this.setState({ EntityMap: EntityMap })

    const ctx = this.refs.canvas.getContext('2d');
    this.refs.canvas.width= x*35
    this.refs.canvas.height = x*35
    ctx.strokeRect(20, 20, x*32, y*32);
    ctx.fillRect(20, 20, x*32, y*32);
    for (let i = 0; i < x; i += 1)
      for (let j = 0; j < y; j += 1) {
          ctx.strokeRect(20 + i * 32, 20 + j * 32, 32, 32);
          ctx.clearRect(20 + i * 32, 20 + j * 32, 32, 32);
          if(EntityMap[i][j]) {
            this.createEntity(ctx, 10, 36 + i * 32, 36 + j * 32)
          }
      }
  }

  render() {
    const { x, y, entity } = this.state

    return (
      <>
        <Grid container justify="center">
          <h2>Convey Game Life</h2>
        </Grid>
        <Grid container justify="center" alignItems="flex-start">
          <Grid item xs={4} style={{ marginTop: 20 }}>
            <Grid container direction="column" spacing={3} alignContent="center">
              <Grid item>
                <TextField
                  label="Count entity"
                  variant="outlined"
                  name="entity"
                  value={entity}
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item>
                <TextField
                  label="Size x"
                  variant="outlined"
                  name="x"
                  value={x}
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item>
                <TextField
                  label="Size y"
                  variant="outlined"
                  name="y"
                  value={y}
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item >
                <Button variant="contained" onClick={this.newGenerate}> Generate </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <canvas ref="canvas" width={640} height={640}/>
          </Grid>
          <Grid item xs={4}>
          </Grid>
        </Grid>
      </>
    );
  }
}
export default CanvasComponent;
