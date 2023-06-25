const list=document.querySelector("#list");
const add_task=document.querySelector('#add-bttn');

let todo=[];

add_task.addEventListener('click',createNewTask);

function createNewTask(){
    const item={
        id:new Date().getTime(),
        text:"",
        complete:false
    }
    todo.unshift(item);
    const{item_ele,input_ele}=createTodoElement(item);

    list.prepend(item_ele);
    input_ele.removeAttribute("disabled");
    input_ele.focus();
    save();
}

function createTodoElement(item){
//    create new elements and add required child and class
    const item_ele=document.createElement("div");
    item_ele.classList.add("item");
    
    const checkbox_ele=document.createElement("input");
    checkbox_ele.type="checkbox";
    checkbox_ele.checked=item.complete;

    if(item.complete){
        item_ele.classList.add("complete");
    }

    const input_ele = document.createElement("input");
	input_ele.type = "text";
    // input_ele.classList.add("task-text");
	input_ele.value = item.text;
	input_ele.setAttribute("disabled", "");

	const item_bttn_ele= document.createElement("div");
	item_bttn_ele.classList.add("item-bttn");

    const edit_bttn_ele = document.createElement("button");
	edit_bttn_ele.classList.add("edit");
	edit_bttn_ele.innerText = "edit";

	const delete_bttn_ele = document.createElement("button");
	delete_bttn_ele.classList.add("delete");
	delete_bttn_ele.innerText = "delete";

   item_bttn_ele.append(edit_bttn_ele);
   item_bttn_ele.append(delete_bttn_ele);
   
   item_ele.append(checkbox_ele);
   item_ele.append(input_ele);
   item_ele.append(item_bttn_ele);

   //event add
   checkbox_ele.addEventListener("change",()=>{
    item.complete=checkbox_ele.checked;
    if(item.complete){
        item_ele.classList.add("complete");
    }
    else{
        item_ele.classList.remove("complete");
    }
    save();
   }) 

   input_ele.addEventListener("input",()=>{
    item.text=input_ele.value;
   })
    
   input_ele.addEventListener("blur", () => {
    input_ele.setAttribute("disabled", "");
    Save();
});

edit_bttn_ele.addEventListener("click", () => {
    input_ele.removeAttribute("disabled");
    input_ele.focus();
});

delete_bttn_ele.addEventListener("click", () => {
    todo = todo.filter(t => t.id != item.id);
    item_ele.remove();
    Save();
});
    return {item_ele,input_ele,edit_bttn_ele,delete_bttn_ele};
}

function DisplayTodos() {
	Load();

	for (let i = 0; i < todo.length; i++) {
		const item = todo[i];

		const { item_ele } = createTodoElement(item);

		list.append(item_ele);
	}
}

DisplayTodos();

function Save() {
	const save = JSON.stringify(todo);
	
	localStorage.setItem("my_todos", save);
}

function Load() {
	const data = localStorage.getItem("my_todos");

	if (data) {
		todo = JSON.parse(data);
	}
}