var row=document.querySelector('#row');
var link=document.querySelectorAll('a');
var smallBoxBody=document.querySelector('.smallBoxBody');
var ol=document.querySelector('#ingred');
var boxModel=document.querySelector('.boxModel');
var close=document.querySelectorAll('#close');

var recipe='pizza';
    getData(recipe);



for(var i=0;i<link.length;i++){
    link[i].addEventListener('click',function(e){
      recipe=  e.target.innerHTML;
      console.log(recipe);
      getData(recipe)

    })
}
// ****************


function getData(recipe){
    var allData;
    var allDataRecipes;
    //1-istance
var req=new XMLHttpRequest();

//2-open   make conection withe my web and api.
req.open('GET',`https://forkify-api.herokuapp.com/api/search?q=${recipe}`);
//3-send   send my req.
req.send(); 
//4-addeventlister when readyState change and the stutuse ==200
//to access the req.response
req.addEventListener('readystatechange',function(){
    if(req.readyState==4&&req.status==200){
    allData=req.response;//string.
    allData=JSON.parse(allData);//obj{}
   
    allDataRecipes=allData.recipes;//array[]
    
    // console.log(allDataRecipes);
    displayData(allDataRecipes);
    smillbox()
    }
    });

}


// // ********************* displayData*****
function displayData(list){
  
    var str=``;
    for(var i=0;i<list.length;i++){
        str+=`<div class="col-lg-4 parent_item ">
        <div class="item bg-info  p-3 ">
        <img src="${list[i].image_url}" alt="" class="w-100" id=${list[i].recipe_id
        } />
            <h3>${list[i].title.slice(0,10)}</h3>
            <p>${list[i].publisher}</p>
        </div>
    </div>`;
    }
    row.innerHTML=str;
}

//********************** function smillbox() */

// `https://forkify-api.herokuapp.com/api/get?rId=47746`



function smillbox(){
    var itemImg=document.querySelectorAll('.item img');
    var close=document.querySelectorAll('#close');
 
     for(var i=0;i<itemImg.length;i++){
        itemImg[i].addEventListener('click',function(e){
          
         console.log(e.target.id);
         getRecipeData(e.target.id);
       boxModel.style.display='block';
        });

    }

    closeBox();

}


function closeBox(){
    for(var i=0;i<close.length;i++){
        close[i].addEventListener('click',function(e){
        
            boxModel.style.display='none';
         
         
    //    boxModel.style.display='none';
        });
    }
}



// *********************  getRecipeData()

function getRecipeData(id){
    // console.log(`https://forkify-api.herokuapp.com/api/get?rId=${id}`)
var recipeData;
var req2=new XMLHttpRequest();
req2.open('GET',`https://forkify-api.herokuapp.com/api/get?rId=${id}`)
req2.send();
req2.addEventListener('readystatechange',function(e){
    if(req2.readyState==4&&req2.status==200){
        recipeData=req2.response;
        
        recipeData=JSON.parse(recipeData);
        
        displayRecipeData(recipeData);
        
    }

    });
}
// ****************
function displayRecipeData(list){
var str1;
var strOl=``;
var ingredients=list.recipe.ingredients;
// console.log(list.recipe)
// console.log(ingredients);
for(var i=0;i<ingredients.length;i++ ){
    strOl+=`<li>${ingredients[i]}</li>`

 }
    str1=`<img src="${list.recipe.image_url}" alt="" class="w-100">
    <h2>${list.recipe.title}</h2>
    <p class="lead">${list.recipe.publisher}</p>
    
    <ol  type="1" id="ingred" class="text-start">
    ${strOl}
    </ol>`;
    


 smallBoxBody.innerHTML=str1;
}