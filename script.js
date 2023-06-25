let input=document.querySelector('.enter-task')
let addbtn=document.querySelector('.add-bttn');
let task=document.querySelector('.task');
input.addEventListener('keyup',()=>{
    if(input.value !=""){
        addbtn.classList.add('active');
    }
})