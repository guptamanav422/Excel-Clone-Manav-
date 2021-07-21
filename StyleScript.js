let allAlignmentOptions=document.querySelectorAll(".align-cell-content span");

let leftAlign=allAlignmentOptions[0];
let centerAlign=allAlignmentOptions[1];
let rightAlign=allAlignmentOptions[2];

leftAlign.addEventListener("click",(e)=>{
    if(lastCell)
    {
        lastCell.style.textAlign="left";
        let address=lastCell.getAttribute("data-address");
        dataobj[address].align="left";
    }
})
centerAlign.addEventListener("click",(e)=>{
    if(lastCell)
    {
        lastCell.style.textAlign="center";
        let address=lastCell.getAttribute("data-address");
        dataobj[address].align="center";
    }
})
rightAlign.addEventListener("click",(e)=>{
    if(lastCell)
    {
        lastCell.style.textAlign="right";
        let address=lastCell.getAttribute("data-address");
        dataobj[address].align="right";
    }
})