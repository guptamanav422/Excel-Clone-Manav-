
let allAlignmentOptions=document.querySelectorAll(".align-cell-content span");
let allColorOptions=document.querySelectorAll(".cell-color-options span");
let fontType=document.querySelectorAll(".bold-italics-underline span");
let body=document.querySelector("body");

let leftAlign=allAlignmentOptions[0];
let centerAlign=allAlignmentOptions[1];
let rightAlign=allAlignmentOptions[2];

leftAlign.addEventListener("click",(e)=>{
    if(lastCell)
    {
        lastCell.style.textAlign="left";
        let address=lastCell.getAttribute("data-adress");
        dataobj[address].align="left";
    }
})
centerAlign.addEventListener("click",(e)=>{
    if(lastCell)
    {
        lastCell.style.textAlign="center";
        let address=lastCell.getAttribute("data-adress");
        dataobj[address].align="center";
    }
})
rightAlign.addEventListener("click",(e)=>{
    if(lastCell)
    {
        lastCell.style.textAlign="right";
        let address=lastCell.getAttribute("data-adress");
        dataobj[address].align="right";
    }
})


let bgColorPicker=allColorOptions[0];
let fontColorPicker=allColorOptions[1];

bgColorPicker.addEventListener("click",(e)=>{
    let colorPickerElement=document.createElement("input");
    colorPickerElement.type="color";
    body.append(colorPickerElement);
    colorPickerElement.click();

    colorPickerElement.addEventListener("input",(e)=>{
        let color=e.currentTarget.value;
        if(lastCell){
            lastCell.style.backgroundColor=color;
            let address=lastCell.getAttribute("data-adress");
            dataobj[address].bgColor=color;
        }
    })
})

fontColorPicker.addEventListener("click",(e)=>{
    let colorPickerElement=document.createElement("input");
    colorPickerElement.type="color";
    body.append(colorPickerElement);
    colorPickerElement.click();

    colorPickerElement.addEventListener("input",(e)=>{
        let color=e.currentTarget.value;
        if(lastCell){
            lastCell.style.color=color;
            let address=lastCell.getAttribute("data-adress");
            dataobj[address].color=color;
        }
    })
})


let bold=fontType[0];
let italic=fontType[1];
let underline=fontType[2];

bold.addEventListener("click",(e)=>{
    if(lastCell){
        lastCell.style.fontWeight="bold";
        let address=lastCell.getAttribute("data-adress");
        // dataobj[address].color=color;
    }
});

italic.addEventListener("click",(e)=>{
    if(lastCell){
        lastCell.style.fontStyle="italic";
        let address=lastCell.getAttribute("data-adress");
        // dataobj[address].color=color;
    }
})

underline.addEventListener("click",(e)=>{
    if(lastCell){
        lastCell.style.textDecoration="underline";
        let address=lastCell.getAttribute("data-adress");
        // dataobj[address].color=color;
    }
})
