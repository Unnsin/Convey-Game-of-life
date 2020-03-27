import * as _ from 'lodash'


export const generateArrayEntity = (count, xField, yField) => {
    const randomX = _.shuffle(_.range(0, xField)).slice(0, count)
    const randomY = _.shuffle(_.range(0, yField)).slice(0, count)

    var mapFilledZero = [];
    for (var i = 0; i < xField; i++){
        mapFilledZero[i] = [];
        for (var j = 0; j < yField; j++){
            mapFilledZero[i][j] = 0;
    }}
    

    for(let i=0; i < count; i++) {
        mapFilledZero[randomX[i]][randomY[i]] = 1
    }
    
    
    return mapFilledZero
}