function setup() {
    const canvas=createCanvas(450,510)
    const content=document.getElementById('content')
    canvas.parent(content)
}

const grid=[
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
]
const color_arr=['black','red','orange','yellow','rgb(32, 163, 32)','blue','#165e83','purple']
const blockData=[
    [
        [1,0,1],
        [1,1,1]
    ],
    [
        [1],
        [1],
        [1],
        [1]
    ],
    [
        [1,1],
        [1,1]
    ],
    [
        [1,0,0],
        [1,1,1]
    ],
    [
        [1,0],
        [1,1],
        [1,0]
    ]
]

class oneBlock{
    constructor(){
        this.block=blockData[Math.floor(Math.random()*blockData.length)]
        this.colorNumber=Math.floor(Math.random()*color_arr.length)
        this.color=color_arr[this.colorNumber]
        this.y=-this.block.length
        this.x=Math.floor(Math.random()*(15-this.block[0].length))
    }

    //一回動くときに行う処理
    oneMove(){
        //現在の場所にあるブロックを削除
        this.removeFloor(this.x,this.y)
        if(this.checkFloor(this.x,this.y+1)==0){
            //ブロックが存在しない
            this.y++
        }else{
            //ブロックが存在する
            this.addFloor(this.x,this.y)
            return 1
        }
        this.addFloor(this.x,this.y)
    }

    //x座標とy座標を渡すと、ブロックを追加してくれる
    addFloor(x,y){
        this.block.map((verticialArr,vNumber)=>{
            if((y+vNumber)<0)return
            verticialArr.map((besideValue,bNumber)=>{
                if(besideValue==1){
                    grid[y+vNumber][x+bNumber]=this.colorNumber
                }
            })
        })
    }
    //x座標とy座標を渡すと、ブロックの削除を行ってくれる
    removeFloor(x,y){
        this.block.map((verticialArr,vNumber)=>{
            if((y+vNumber)<0)return
            verticialArr.map((besideValue,bNumber)=>{
                if(besideValue==1){
                    grid[y+vNumber][x+bNumber]=0
                }
            })
        })
    }
    //x座標とy座標を渡すと、その場所にすでにほかのブロックが存在しないか確認してくれる(存在する=>1 存在しない=>0)
    checkFloor(x,y){
        let exist=0
        this.block.map((verticialArr,vNumber)=>{
            if((y+vNumber)<0)return
            if((y+vNumber)==grid.length){
                exist=1
                return
            }
            verticialArr.map((besideValue,bNumber)=>{
                if(besideValue==1&&grid[y+vNumber][x+bNumber]!=0){
                    exist=1
                }
            })
        })
        return exist;
    }
    //横に動かす
    moveSide(key){
        let newCoordinate=[]
        if(key=="a")newCoordinate=[this.x-1,this.y]
        else if(key=="d")newCoordinate=[this.x+1,this.y]
        this.removeFloor(this.x,this.y)
        if(this.checkFloor(newCoordinate[0],newCoordinate[1])==0){
            this.x=newCoordinate[0]
        }
        this.addFloor(this.x,this.y)
        drawObj()
    }
    //回転させる
    rotateBlock(){
        const beforeBlock=this.block
        this.removeFloor(this.x,this.y)
        let newBlock=[]
        beforeBlock.forEach((value,numNow)=>{
            value.forEach((xVal,index)=>{
                if(numNow==0)newBlock[index]=[]
                newBlock[index].unshift(xVal)
            })
        })
        this.block=newBlock
        if(this.checkFloor(this.x,this.y)==0){}
        else{
            this.block=beforeBlock
        }
        this.addFloor(this.x,this.y)
        drawObj()
    }
}

let analNum=0
let nowBlock=new oneBlock()
const drawObj=()=>{
    clear()

    background('black')
    girdDraw()
}
function draw() {
    //パフォーマンスの関係上、4０回に１回しか描画されない
    //テストのためスピードを変更しています。(1/2)
    analNum++
    if(analNum%40==0){
        drawObj()

        //ブロックを動かす。(動かす予定の場所にブロックがあった場合、1を返すのでそれを受け取ると、新しいブロックを生成する。)
        if(nowBlock.oneMove()==1){
            nowBlock=new oneBlock()
        }
    }
}

//キー
window.addEventListener('keydown',(e)=>{
    if(e.key!="w"&&e.key!="a"&&e.key!="s"&&e.key!="d")return
    if(e.key=="a"||e.key=="d"){
        nowBlock.moveSide(e.key)
    }
    if(e.key=="w"){
        //回転させる
        nowBlock.rotateBlock()
    }
})

//gridをもとに描画
function girdDraw(){
    grid.map((yValue,y)=>{
        yValue.map((xValue,x)=>{
            stroke('rgb(43, 43, 43)')
            fill(color_arr[xValue])
            rect(x*30,y*30,30,30)
        })
    })
}