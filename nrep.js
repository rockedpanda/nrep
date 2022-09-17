#!/usr/bin/env node
const fs = require('fs');
const readline = require('readline');
const args = process.argv.slice(2);

let i = 0,j=0,k=0;
let sum = 0;
let a=0,b=0,c=0,d=0,e=0,f=0,g={};
let A=[],B=[],C=[],D={},E={},F={};

let re = args[0]; //默认第一个参数是待执行的函数语句
let autoLog = false;
let sourceFile = '';
let inputFile = '';
let outputFile = '';
let main = {
    reFunc: x=>log(x),
    startFunc: ()=>{},
    endFunc: ()=>{},
    enableTime: false,
    timeStr:'min',
    isTimeLine: false,
    checkTimeLine:(x)=>{
        this.isTimeLine = /20[0-9][0-9]/.test(x.slice(0,20)); //简单起见,按照前20字符包含2019或2020作为是否含时间的判定依据
    }
};

args.forEach((arg,argIndex)=>{
    // console.log(arg, argIndex);
    if(arg=='-p'){
        autoLog = true;
    }else if(arg=='-s'){
        let sFunc = args[argIndex+1];
        if(sFunc.indexOf('=>')==-1){
            sFunc = '()=>'+sFunc;
        }
        main.startFunc = eval(sFunc);
    }else if(arg=='-e'){
        let eFunc = args[argIndex+1];
        if(eFunc.indexOf('=>')==-1){
            eFunc = '()=>'+eFunc;
        }
        main.endFunc = eval(eFunc);
    }else if(arg=='-t'){
        main.enableTime = true;
        main.timeStr = args[argIndex+1];
    }else if(arg=='-c'){ //code sourceFile
        sourceFile = args[argIndex+1];
        // console.log(sourceFile);
        re = '('+fs.readFileSync(sourceFile,'utf8')+')';
        // console.log(re);
    }else if(arg=='-i'){ //input file
        inputFile = args[argIndex+1];
    }/* else if(arg=='-o'){ //output file
        outputFile = args[argIndex+1];
    } */
});
if(args.length === 0){
    console.log('需要输入过滤方法');
    return;
}
if(autoLog && !sourceFile){
    re = `log(${re})`;
}

if(re.indexOf('=>')==-1 && !sourceFile){
    re = `(x)=>{${re}}`;
}

function log(){
    console.log.apply(console, arguments);
}
// console.log('>>>>'+re+'<<<<');
main.reFunc = eval(re);
if(Array.isArray(main.reFunc)){
    main.startFunc = main.reFunc[1] || main.startFunc;
    main.endFunc = main.reFunc[2] || main.endFunc;
    main.reFunc = main.reFunc[0] || main.reFunc;
}

main.startFunc();
const rl = readline.createInterface({
  input: inputFile? fs.createReadStream(inputFile) : process.stdin,
  output: process.stdout,
  terminal: false,
  crlfDelay: Infinity
});

rl.on('line', (line) => {
    if(main.enableTime){
        main.checkTimeLine(line);
    }
  main.reFunc(line, i);
  i++;
});

rl.on('close',()=>{
    main.endFunc();
});