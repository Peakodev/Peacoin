const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

console.clear();


const chart = document.createElement('div')
chart.classList.add('chart')
$(".graph").append(chart);

let open = 1000, close = 30000
let cnt = 0
let height = 0

const renderCandle = (open,close,high,low) => {
    const candleBox = document.createElement('div')
    candleBox.classList.add('candle-box')
    const candle = document.createElement('div')
    candle.classList.add('candle')
    candleBox.appendChild(candle)
    candleBox.classList.add(open > close ? 'candle-down' : 'candle-up')

    let gap=abs(close-open)

    console.log('open, close',open,close)
    console.log(gap)



    candleBox.style = `
        height: ${gap}px;
        margin-bottom: ${min(open,close)}px;
    `

    chart.appendChild(candleBox)

    ++cnt
}
const running = (rate = 50, start = 2, end = 10) => {
    start*=1000
    end*=1000
    let prevOpen = open
    let prevclose = close

    if(rint(1,100)>90 || cnt%9 == 0 || cnt%5 == 0) start*=10,end*=5

    trend = min(open,close)<=0 || (rint(1,100) <= rate)

    if(trend) {
        if(open<close) [open,close] = [close-500,close+rint(start,end)]
        else [open,close] = [close,close+rint(start,end)]
    } else {
        if(open<close) [open,close] = [close-500,max(0,close-500-rint(start,end))]
        else [open,close] = [close+500,max(0,close+500-rint(start,end))]
    }

    renderCandle(open/1000,close/1000)

    return [trend,open,close]
}


for(let i=0;i<100;i++) running()
setInterval(running,6000)

function div(x,y) {
    return Math.floor(x/y)
}
function abs(x) {
    return Math.abs(x)
}
function max(x,y) {
    return Math.max(x,y)
}
function min(x,y) {
    return Math.min(x,y)
}
function rint (min=0, max=100) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
