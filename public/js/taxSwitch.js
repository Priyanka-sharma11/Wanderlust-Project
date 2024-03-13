
let taxSwitch = document.getElementById("flexSwitchCheckDefault");
taxSwitch.addEventListener("click",()=>{
    let taxInfo = document.getElementsByClassName("tax-info");
    for(info of taxInfo){
        if(info.style.display != "inline"){
            info.style.display="inline";
        }else{
            info.style.display="none";
        }
    }
})

const filtersContainer = document.getElementById("filters");
const scrollRightButton = document.getElementById("scroll-right");
const scrollLeftButton = document.getElementById("scroll-left");

scrollRightButton.addEventListener("click",()=>{
    filtersContainer.scrollBy({
        left:150,
        behavior:"smooth"
    });
});
scrollLeftButton.addEventListener("click",()=>{
    filtersContainer.scrollBy({
        left:-150,
        behavior:"smooth"
    });
});