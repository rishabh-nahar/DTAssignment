// console.log("hello")
let array_assets ;
fetch("./info.json",{
    mode:'cors',
    credentials: 'include', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin':'http://127.0.0.1:5500'
    },
})
.then(response => response.json())
.then((data)=>{
    jsonFunc(data);
    console.log(data.tasks[0]);
  }
  )
.catch(err => console.log(err))

let jsonFunc = (data) => {
  task_title = data['tasks'][0].task_title // demo task
  document.getElementById("task_title").textContent = task_title

  array_assets = data['tasks'][0].assets // array of all assets



  createContainer(array_assets);
}

function createTbWoBg(){
  let input_wo_bg = document.createElement("div");
  let input_wo_bg_textarea = document.createElement("textarea");
  input_wo_bg_textarea.setAttribute("placeholder", "Enter Text Here")
  input_wo_bg.classList.add("task-inp");

  input_wo_bg.appendChild(input_wo_bg_textarea);

  return input_wo_bg;
}

function createTbWBg(){
  
  let input_w_bg = document.createElement("div");
  let input_w_bg_textarea = document.createElement("textarea");
  let input_w_bg_title = document.createElement("div")
  let input_w_bg_small_inp = document.createElement("div")

  input_w_bg.classList.add("input-bg");
  input_w_bg_title.classList.add('title');
  input_w_bg_title.textContent= "Input Head"
  input_w_bg_small_inp.classList.add('task-small-inp')

  input_w_bg.appendChild(input_w_bg_title);
  input_w_bg_small_inp.appendChild(input_w_bg_textarea);
  input_w_bg.appendChild(input_w_bg_small_inp);

  return input_w_bg;
}

function createImg(img_src) {

  let image_div = document.createElement("div");
  let img = document.createElement("img")
  img.setAttribute("src",img_src);

  image_div.appendChild(img)

  return image_div

}



function createDocs(doc_src){
  let doc_div = document.createElement("div");
  let doc = document.createElement("embed")
  doc.setAttribute("src",doc_src);

  doc_div.appendChild(doc)

  return doc_div
}


function createPara(para_content){
  let para = document.createElement("div")
  para.textContent = para_content;
  return para
}

function createDescription(description,id){
  let desc_div = document.createElement("div")
  desc_div.textContent = description;

  desc_div.setAttribute("id",id);
  desc_div.classList.add('hide-show')

  return desc_div
}


function option_container(option_values){

    let option_container = document.createElement("div");
    option_container.classList.add("option-container");
    let select_box = document.createElement("select");
    option_container.appendChild(select_box)


    option_values.map((option_val)=>{
        let option = document.createElement("option")
        option.value = option_val;
        option.textContent = option_val;
        select_box.appendChild(option)

      },this)


    return option_container

}



function createButton(){
    let blue_bttn = document.createElement("div")
    let bttn = document.createElement("button");
    blue_bttn.classList.add("blue-bttn");
    blue_bttn.appendChild(bttn)
    bttn.textContent = "Submit"
    bttn.classList.add('bttn');
  
    return blue_bttn
  }
  


function createDownArrow(asset_data){


  let down_arrow_div = document.createElement("div")
  down_arrow_div.classList.add("down-arrow")
  down_arrow = document.createElement("i");
  down_arrow.classList.add("fa") 
  down_arrow.classList.add("fa-angle-down") 

  let asset_unique_id = asset_data.asset_id;

  down_arrow.addEventListener("click",function(){
    toggle_display(asset_unique_id,this)
  })


  down_arrow_div.appendChild(down_arrow);

  return down_arrow_div
}

function toggle_display(asset_unique_id,arrow){
  document.getElementById(asset_unique_id).classList.toggle('hide-show');
  arrow.classList.toggle('fa-angle-down')
  arrow.classList.toggle('fa-angle-up')
}


function capitalizeFirstLetter(given_string){
  const str = given_string;
  const str2 = str.charAt(0).toUpperCase() + str.slice(1);
  console.log(str2);

  return str2
}



let createContainer = (array_assets) => {

  task_container_group = document.querySelector('.task-container-group');

  
  for(let asset_data of array_assets){
    

      let task_container_wrapper = document.createElement("div");
      let task_container = document.createElement("div");
      let heading = document.createElement("div");
      let content = document.createElement("div");


      task_container_wrapper.classList.add("task-container-wrapper")
      task_container.classList.add('task-container')
      heading.classList.add("heading")
      content.classList.add('content')

      heading.textContent = capitalizeFirstLetter(asset_data.asset_title);

      task_container_group.appendChild(task_container_wrapper);
      task_container_wrapper.appendChild(task_container);
      task_container.appendChild(heading);
      task_container.appendChild(content);


      if(asset_data.asset_type == "display_asset" && asset_data.asset_content == "reflection"){
        // console.log("createPara()=>",asset_data.display_asset_reflection)
        content.appendChild(createPara(asset_data.display_asset_reflection))
      }
      else if(asset_data.asset_type == "input_asset" && asset_data.asset_content == "tb"){
        content.appendChild(createTbWoBg())
      }
      else if(asset_data.asset_type == "input_asset" && asset_data.asset_content == "reflection"){
        content.appendChild(createTbWoBg())
      }

      else if(asset_data.asset_type == "display_asset" && asset_data.asset_content=="other"){
        if(asset_data.display_asset_image != ""){
          content.appendChild(createImg(asset_data.display_asset_image))
        }
        else if(asset_data.display_asset_video != ""){
          content.appendChild(createDocs(asset_data.display_asset_video))
        }
        else if(asset_data.display_asset_docs != ""){
          content.appendChild(createDocs(asset_data.display_asset_docs))
        }
        else if(asset_data.display_asset_url != ""){
          content.appendChild(createDocs(asset_data.display_asset_url))
        }

      }
      else if(asset_data.asset_type == "input_asset" && asset_data.asset_content == "article"){
        task_container_group.removeChild(task_container_wrapper)
      }
      else if(asset_data.asset_type == "input_asset" && asset_data.asset_content == "eb"){
        task_container_group.removeChild(task_container_wrapper)
      }

      content.appendChild(createDescription(asset_data.asset_description,asset_data.asset_id))
      content.appendChild(createDownArrow(asset_data))

  }
}

function createList(list_type,list_content){
  list_container = document.createElement("div");
  index = 0;
  for(li__type of list_type){
    
    let li_type  = document.createElement(li__type);

    for(li_s of list_content[index]){
      let li = document.createElement("li");
      li.textContent = li_s
      li_type.appendChild(li)
    }
    index++;
    list_container.appendChild(li_type);
  }
  return list_container;
}



function journeyBoard(){

  journey_board_task_list = document.getElementById("task_lists")
  journey_board_task_list.appendChild(createList(["ol","ul"],[["demo task"],['task1','task2','task3']]))

}
// journeyBoard();


function toggleJourneyBoard(){
  document.querySelector(".journey-board").classList.toggle('collapsed-journey-board');
  document.querySelector(".task-lists").classList.toggle('hide-show')
  document.querySelector(".collapsed-task").classList.toggle('show-hide')
}