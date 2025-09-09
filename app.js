
const Categories=document.getElementById("categories")
const cardcontainer=document.getElementById("card-container")

const loadCategory=()=>{
   fetch("https://openapi.programming-hero.com/api/categories") 
   .then((res)=>res.json())
   .then((data)=>{
    
    const categories=data.categories
    // console.log(categories);
    displaycategory(categories);
   })
}

const displaycategory=(categories)=>{
    categories.forEach(cat => {
       Categories.innerHTML+=`
       <li id="${cat.id}" class="hover: cursor-pointer">${cat.category_name}</li>
       `
    });
    Categories.addEventListener('click',(e)=>{
        if(e.target.localName==='li')
        //  console.log(e.target.id)
        loadtplants(e.target.id)
    })
}

const loadtplants=(plantId)=>{
    console.log(plantId)
    fetch(`https://openapi.programming-hero.com/api/category/${plantId}`)
    .then(res=>res.json())
    .then(data=>{
       const plants = Array.isArray(data.plants) ? data.plants : [data.plants];
      displayplants(plants);
        // displayplants(data.plants)
    })
}

const displayplants=(plants)=>{
    cardcontainer.innerHTML = "";
plants.forEach(plant=>{
    let imgSrc = plant.image.replace("ibb.co.com", "ibb.co");
    cardcontainer.innerHTML+=`
    <div class=" p-3 rounded shadow mb-4 w-72">
    <img src="${imgSrc}" onerror="this.src='https://via.placeholder.com/150'"  class="w-full h-48 object-cover rounded">
    
    <h1>${plant.name}</h1>
    <p>${plant.description}</p>
    <div class="flex justify-between">
    <p>${plant.category}</p>
    <p>${plant.price}</p>
    </div>
     <button class="bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-2 rounded-md w-full">
          Add to Cart
        </button>

    </div>`
})
}
loadCategory();