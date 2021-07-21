
let rowNumberSection=document.querySelector(".row-number-section");
let columnTagSection=document.querySelector(".column-tag-section");
let cellSection=document.querySelector(".cell-section");
let formulaBarSelectedArea=document.querySelector(".selected-cell-div");
let formulaInput=document.querySelector(".formula-input-section")

let lastCell;
let dataobj={};

formulaInput.addEventListener("keydown",(e)=>{
    if(e.key=='Enter')
    {
        let typeFormula=e.currentTarget.value;
        
        if(!lastCell) return;

        let selectedCellAdress=lastCell.getAttribute("data-adress");
        let cellObj=dataobj[selectedCellAdress];

        cellObj.formula=typeFormula;

        let currUpstream=cellObj.upstream;
        for(let k=0;k<currUpstream.length;k++)
        {
                // removeFromDownStream(parent ,child )
            removeFromDownStream(currUpstream[k],selectedCellAdress);
        }
        cellObj.upstream=[];

        // nyi upstrem bnadi formula se 
        let formulaArr=typeFormula.split(" ");
        let cellsInFormula=[];
        for(let i=0;i<formulaArr.length;i++)
        {
            if(formulaArr[i]!="+" &&
              formulaArr[i]!="-" &&
              formulaArr[i]!="*" &&
              formulaArr[i]!="/" &&
              isNaN(formulaArr[i])  //to check a Number
            ) {
                cellsInFormula.push(formulaArr[i]);
            }    
        }

        for(let i=0;i<cellsInFormula.length;i++)
        {
            addToDownStream(cellsInFormula[i],selectedCellAdress)
        }

        cellObj.upstream=cellsInFormula;

        // ye code thora sa updateCell wale function se copy kiya 
        let valObj={};
        for(let i=0;i<cellsInFormula.length;i++)
        {
           let CellValue=dataobj[cellsInFormula[i]].value;
           valObj[cellsInFormula[i]]=CellValue;
        }

        // a1 + b1 
        for(let key in valObj)
        {
           typeFormula=typeFormula.replace(key,valObj[key]);
        }

        let newValue=eval(typeFormula);
        lastCell.innerText=newValue;
        cellObj.value=newValue;

        let downstream=cellObj.downstream;
        for(let i=0;i<downstream.length;i++)
        {
            updateCell(downstream[i]);
        }
        formulaInput.value="";
        dataobj[selectedCellAdress]=cellObj;
    }
})

for(let i=1;i<=100;i++)
{
    let div=document.createElement("div");
    div.innerText=i;
    div.classList.add("row-number")
    rowNumberSection.append(div);
}

for(let i=0;i<26;i++)
{
    let ascciiCode= 65+i; //60+0 => A

    let requiredAlphabet=String.fromCharCode(ascciiCode);
    let div=document.createElement("div");
    div.innerText=requiredAlphabet;
    div.classList.add("column-tag")
    columnTagSection.append(div);
}


cellSection.addEventListener("scroll",(e)=>{
    
    // for scrolling of column tag section 
    columnTagSection.style.transform=`translateX(${-e.currentTarget.scrollLeft}px)`

    rowNumberSection.style.transform=`translateY(${-e.currentTarget.scrollTop}px)`
})

// inside this nested for loop we are creating individual cell ui+ cell obj 
for(let i=1;i<100;i++)
{

    let rowDiv=document.createElement("div"); 
    rowDiv.classList.add("row");
    for(let j=0;j<26;j++) // i==1 j==1 asciicode =65 reqAlphabet=> A cellAdress=> A1;
    {
        let asciiCode=65+j;
        let reqAlphabet=String.fromCharCode(asciiCode);
        let cellAdress=reqAlphabet+i;

        dataobj[cellAdress]={
            value:undefined,
            formula:undefined,
            upstream:[],
            downstream:[],
            align:"left",
            color:"black",
            bgColor:"white"
        }

        let cellDiv=document.createElement("div");

        cellDiv.addEventListener('input',(e)=>{

            // jis cell pr mene type krra uske attribute se maine uska cell adress fetch krra 
            let currCellAdress=e.currentTarget.getAttribute("data-adress");

            // kuki sare cell obj data obj me store ho rhe using there cell adress as a key 
            // jo obj mene cell adress us krke dataObj se fetch krlia object 
            let currCellObj=dataobj[currCellAdress];

            currCellObj['value']=e.currentTarget.innerText;
            currCellAdress['formula']=undefined;

            // 1 loop  on upstream 
            // 2 for each go to its downstream and remove ourself
            // 3 apni upstream ko empty krdo

            let currUpstream=currCellObj.upstream;
            for(let k=0;k<currUpstream.length;i++)
            {
                // removeFromDownStream(parent ,child )
                removeFromDownStream(currUpstream[k],currCellAdress);
            }
            currCellObj.upstream=[];
            

            let currDownstream=currCellObj.downstream;

            for(let i=0;i<currDownstream.length;i++)
            {
                updateCell(currDownstream[i]);
            }

            dataobj[currCellAdress]=currCellObj;

            // console.log(dataobj);
        })

        cellDiv.contentEditable=true;
        cellDiv.classList.add("cell")

        cellDiv.setAttribute("data-adress",cellAdress);
        cellDiv.addEventListener('click',(e)=>{
            if(lastCell) lastCell.classList.remove('cell-selected');

            e.currentTarget.classList.add('cell-selected');

            lastCell=e.currentTarget;

            let currSellAdress=e.currentTarget.getAttribute("data-adress");
            formulaBarSelectedArea.innerText=currSellAdress;
        })
        rowDiv.append(cellDiv);
    }
    cellSection.append(rowDiv);
}


// for testing of code 
// dataobj['A1'].value=20;
// dataobj['A1'].downstream=['B1'];
// dataobj['B1'].formula='2* A1';
// dataobj['B1'].upstream=['A1'];
// dataobj['B1'].value=40;

// let a1cell=document.querySelector("[data-adress=A1]")
// let b1cell=document.querySelector("[data-adress=B1]")

// a1cell.innerText=20;
// b1cell.innerText=40;

let removeFromDownStream=(parentCell,childCell)=>{

    // 1 fetch parentcell downstream 

    let parentDownstream= dataobj[parentCell].downstream;

    // 2 filter kro ParentCell downstream ko 
    let filterDownstream=[];

    for(let i=0;i<parentDownstream.length;i++)
    {
        if(parentDownstream[i]!=childCell)
        filterDownstream.push(parentDownstream[i]);
    }

    // 3 vo filter downstream parentCell me update krdo 
    dataobj[parentCell].downstream=filterDownstream;
}


let updateCell=(cell)=>{

    let cellObj=dataobj[cell];
    let upstream=cellObj.upstream;
    let formula=cellObj.formula;


    // upstream me jo bhi cell hai unke object me jaunga vha se unki value lekr aunga or void
    // sare value e object me store krrunga key being the cell adress
    
    let valObj={};
    for(let i=0;i<upstream.length;i++)
    {
        let CellValue=dataobj[upstream[i]].value;
        valObj[upstream[i]]=CellValue;
    }

    // a1 + b1 
    for(let key in valObj)
    {
        formula=formula.replace(key,valObj[key]);
    }
    // 10+20
    
    let newValue=eval(formula);
    dataobj[cell].value=newValue;

    let CellOnUi=document.querySelector(`[data-adress=${cell}]`);
    CellOnUi.innerText=cellObj['value'];

    let downstream=cellObj.downstream;
    for(let i=0;i<downstream.length;i++)
    {
        updateCell(downstream[i]);
    }
}

// Child ko parent ki downstream me dalna hai
function addToDownStream(parent,child)
{
    dataobj[parent].downstream.push(child);
}