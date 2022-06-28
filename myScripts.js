// variable storing assets in array
let array_assets ;

// fetching info from api (using local json file because of CORS problem)
fetch("./info.json",{
    mode:'cors',
    credentials: 'include',
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

// function to read tasks and assets
let jsonFunc = (data) => {
  task_title = data['tasks'][0].task_title // demo task
  document.getElementById("task_title").textContent = task_title

  array_assets = data['tasks'][0].assets // array of all assets


  //calling the function to create dynamic elements
  createContainer(array_assets);
}

// predefined functions to create elements

// fucntion to create text box
function createTbWoBg(){
  let input_wo_bg = document.createElement("div");
  let input_wo_bg_textarea = document.createElement("textarea");
  input_wo_bg_textarea.setAttribute("placeholder", "Enter Text Here")
  input_wo_bg.classList.add("task-inp");

  input_wo_bg.appendChild(input_wo_bg_textarea);

  return input_wo_bg;
}


// fucntion to create image element
function createImg(img_src) {

  let image_div = document.createElement("div");
  let img = document.createElement("img")
  img.setAttribute("src",img_src);

  image_div.appendChild(img)

  return image_div

}

// fucntion to create doc image and audio element

function createDocs(doc_src){
  let doc_div = document.createElement("div");
  let doc = document.createElement("embed")
  doc.setAttribute("src",doc_src);

  doc_div.appendChild(doc)

  return doc_div
}

// fucntion to create para

function createPara(para_content){
  let para = document.createElement("div")
  para.textContent = para_content;
  return para
}

// function to create collapsable description
function createDescription(description,id){
  let desc_div = document.createElement("div")
  desc_div.textContent = description;

  desc_div.setAttribute("id",id);
  desc_div.classList.add('hide-show')

  return desc_div
}

// function to create angle arrow to show/hide collapsable description


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


// function to show/hide collapsable description

function toggle_display(asset_unique_id,arrow){
  document.getElementById(asset_unique_id).classList.toggle('hide-show');
  arrow.classList.toggle('fa-angle-down')
  arrow.classList.toggle('fa-angle-up')
}

// function to make first letter capital
function capitalizeFirstLetter(given_string){
  const str = given_string;
  const str2 = str.charAt(0).toUpperCase() + str.slice(1);
  console.log(str2);

  return str2
}

//function to create dynamic elements based on given data

let createContainer = (array_assets) => {

  task_container_group = document.querySelector('.task-container-group');

  // loop for traversing through each assets and creating element accordingly 

  for(let asset_data of array_assets){


      let task_container_wrapper = document.createElement("div");
      let task_container = document.createElement("div");
      let heading = document.createElement("div");
      let content = document.createElement("div");


      task_container_wrapper.classList.add("task-container-wrapper")
      task_container.classList.add('task-container')
      heading.classList.add("heading")
      content.classList.add('content')

      // above code has divided the task container into 2 parts heading and content 

      heading.textContent = capitalizeFirstLetter(asset_data.asset_title);

      task_container_group.appendChild(task_container_wrapper);
      task_container_wrapper.appendChild(task_container);
      task_container.appendChild(heading);
      task_container.appendChild(content);

      // code for what content to be shown
      if(asset_data.asset_type == "display_asset" && asset_data.asset_content == "reflection"){
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

      // appending collapsable description
      content.appendChild(createDescription(asset_data.asset_description,asset_data.asset_id))
      content.appendChild(createDownArrow(asset_data))

  }
}