
// const Categories=document.getElementById("categories")
// const cardcontainer=document.getElementById("card-container")

// const loadCategory=()=>{
//    fetch("https://openapi.programming-hero.com/api/categories") 
//    .then((res)=>res.json())
//    .then((data)=>{
    
//     const categories=data.categories
//     // console.log(categories);
//     displaycategory(categories);
//    })
// }
// mineeeeeeeeeeeeeeeeeeeeeee
// const displaycategory = (categories) => {
//   Categories.innerHTML = ""; // clear old items
// Categories.innerHTML = `
//   <li id="all" class="cursor-pointer px-4 py-2 rounded-md border border-green-500 hover:bg-green-600 hover:text-white text-green-600 font-bold">
//     All Plants
//   </li>
// `;

//   categories.forEach((cat, index) => {
//     Categories.innerHTML += `
    
//       <li id="${cat.id}" class="cursor-pointer px-4 py-2 rounded-md border border-green-500 hover:bg-green-600 hover:text-white ${index === 0 ? "bg-green-600 text-white font-bold" : "text-green-600"}">
          
//         ${cat.category_name}
     
//     `;
//   });

//   Categories.addEventListener("click", (e) => {
//     if (e.target.localName === "li") {
//       // reset styles
//       [...Categories.children].forEach((li) => {
//         li.classList.remove("bg-green-600", "text-white", "font-bold");
//         li.classList.add("text-black");
//       });
      
      
//       // mark selected one
//       e.target.classList.add("bg-green-600", "text-white", "font-bold");

//       // load plants
//      loadtplants(e.target.id);
//       if (e.target.id === "all") {
//       loadAllPlants();
//     } else {
//       loadAllPlants(e.target.id);
//     }

//     }
//   });
// };
// const loadAllPlants = () => {
//   fetch("https://openapi.programming-hero.com/api/plants")
//     .then(res => res.json())
//     .then(data => {
//       const plants = Array.isArray(data.plants) ? data.plants : [data.plants];
//       displayplants(plants,6);
//     });
// };


// const displaycategory=(categories)=>{
//     categories.forEach(cat => {
//        Categories.innerHTML+=`
//        <li id="${cat.id}" class="hover: cursor-pointer">${cat.category_name}</li>
//        `
//     });
//     Categories.addEventListener('click',(e)=>{
//         if(e.target.localName==='li')
//         //  console.log(e.target.id)
//         loadtplants(e.target.id)
//     })
// }



// const loadtplants=(plantId)=>{
//     console.log(plantId)
//     fetch(`https://openapi.programming-hero.com/api/category/${plantId}`)
//     .then(res=>res.json())
//     .then(data=>{
//        const plants = Array.isArray(data.plants) ? data.plants : [data.plants];
//       displayplants(plants,3);
//         // displayplants(data.plants)
//     })
// }

// const displayplants=(plants,limit)=>{
//     const plantsToShow = limit ? plants.slice(0, limit) : plants;
//     cardcontainer.className = "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
//     cardcontainer.innerHTML = "";
// plants.forEach(plant=>{
//     let imgSrc = plant.image.replace("ibb.co.com", "ibb.co");
//     cardcontainer.innerHTML+=`
//     <div class="flex flex-col gap-3 w-72 justify-between h-full bg-white">
//     <div class="flex flex-col flex-grow">
//     <img src="${imgSrc}" onerror="this.src='https://via.placeholder.com/150'"  class="w-full h-50 object-cover">
    
//     <div class="p-4 mx-auto"><h1 class="text-green-700 font-bold text-[25px] line-clamp-2">${plant.name}</h1>
//     <p class="font-300 text-[18px] mt-2 text-blue-400 line-clamp-4">${plant.description}</p>
//     <div class="flex justify-between mt-4">
//     <p class="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs rounded-md text-center mt-2">${plant.category}</p>
//     <p class="mt-2"><i class="fa-solid fa-bangladeshi-taka-sign font-[8px]"></i> ${plant.price}</p></div>
//     </div>
//     </div>
//      <button class="bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-2 rounded-md w-full mt-2"">
//           Add to Cart
//         </button>

//     </div>`
// })
// }

const Categories = document.getElementById("categories");
const cardcontainer = document.getElementById("card-container");
const showSpinner = () => {
  document.getElementById("spinner").classList.remove("hidden");
};

const hideSpinner = () => {
  document.getElementById("spinner").classList.add("hidden");
};


// Load all categories
const loadCategory = () => {
  fetch("https://openapi.programming-hero.com/api/categories")
    .then(res => res.json())
    .then(data => {
      const categories = data.categories;
      displayCategory(categories);
    });
};

// Display categories
const displayCategory = (categories) => {
  Categories.innerHTML = `
    <li id="all" class="cursor-pointer px-4 py-2 rounded-md border border-green-500 hover:bg-green-600 hover:text-white text-green-600 font-bold">
      All Plants
    </li>
  `;

  categories.forEach((cat, index) => {
    Categories.innerHTML += `
      <li id="${cat.id}" class="cursor-pointer px-4 py-2 rounded-md border border-green-500 hover:bg-green-600 hover:text-white text-green-600">
        ${cat.category_name}
      </li>
    `;
  });

  // Handle category click
  Categories.addEventListener("click", (e) => {
    if (e.target.localName === "li") {
      // Reset all styles
      [...Categories.children].forEach((li) => {
        li.classList.remove("bg-green-600", "text-white", "font-bold");
        li.classList.add("text-green-600");
      });
      // Highlight selected
      e.target.classList.add("bg-green-600", "text-white", "font-bold");

      // Load plants based on selection
      if (e.target.id === "all") {
        loadPlantsById("all", 6); 
      } else {
        loadPlantsById(e.target.id, 3);
      }
    }
  });
};

// Unified function to load plants (all or by category)
// const loadPlantsById = (id, limit) => {
//   if (id === "all") {
//     fetch("https://openapi.programming-hero.com/api/plants")
//       .then(res => res.json())
//       .then(data => {
//         const plants = Array.isArray(data.plants) ? data.plants : [data.plants];
//         displayPlants(plants, limit);
//       });
//   } else {
//     fetch(`https://openapi.programming-hero.com/api/category/${id}`)
//       .then(res => res.json())
//       .then(data => {
//         const plants = Array.isArray(data.plants) ? data.plants : [data.plants];
//         displayPlants(plants, limit);
//       });
//   }
// };
const loadPlantsById = (id, limit) => {
  showSpinner();

  let url = id === "all"
    ? "https://openapi.programming-hero.com/api/plants"
    : `https://openapi.programming-hero.com/api/category/${id}`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      const plants = id === "all" 
        ? (Array.isArray(data.plants) ? data.plants : [data.plants]) 
        : (Array.isArray(data.plants) ? data.plants : [data.plants]);

      displayPlants(plants, limit);
      hideSpinner();
    })
    .catch(error => {
      console.error("Error loading plants:", error);
      hideSpinner();
    });
};


// Display plants in cards
const displayPlants = (plants, limit) => {
  const plantsToShow = limit ? plants.slice(0, limit) : plants;

  cardcontainer.className = "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6";
  cardcontainer.innerHTML = "";
// <h1 class="text-green-700 font-bold text-[25px] line-clamp-2">${plant.name}</h1>
  plantsToShow.forEach(plant => {
    let imgSrc = plant.image.replace("ibb.co.com", "ibb.co");
    cardcontainer.innerHTML += `
  <div class="bg-white shadow-md rounded-md overflow-hidden w-72 h-[420px] flex flex-col">
    <!-- Image -->
    <img src="${imgSrc}" onerror="this.src='https://via.placeholder.com/150'" 
         class="w-full h-40 object-cover">

    <!-- Content -->
    <div class="p-4 flex flex-col flex-grow">
      <h1 
        class="tree-name text-green-700 font-bold text-lg cursor-pointer"
        data-name="${plant.name}"
        data-description="${plant.description}"
        data-price="${plant.price}">
        ${plant.name}
      </h1>

      <p class="text-blue-400 text-sm mt-2 h-[100px]">${plant.description}</p>

      <div class="flex justify-between items-center mt-4">
        <p class="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs rounded-md">${plant.category}</p>
        <p><span class="text-base">৳</span> ${plant.price}</p>
      </div>

      <!-- Button is inside the same block -->
      <button 
  class="bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-2 rounded-md w-full mt-auto add-to-cart-btn"
  data-name="${plant.name}" 
  data-price="${plant.price}">
  Add to Cart
</button>

    </div>
  </div>
`;
  });
};
const modal = document.getElementById("tree-modal");
const modalTitle = document.getElementById("modal-title");
const modalDescription = document.getElementById("modal-description");
const modalPrice = document.getElementById("modal-price");
const closeModal = document.getElementById("close-modal");

closeModal.addEventListener("click", () => {
  modal.classList.add("hidden");
});

cardcontainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("tree-name")) {
    const name = e.target.dataset.name;
    const description = e.target.dataset.description;
    const price = e.target.dataset.price;

    modalTitle.innerText = name;
    modalDescription.innerText = description;
    modalPrice.innerText = `Price: ৳${price}`;
    modal.classList.remove("hidden");
  }
});

const cartContainer = document.getElementById("yourcart"); // Make sure this exists in your HTML

let totalPrice = 0;


const cartItemsList = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");

const addToCartUI = (name, price) => {
  const numericPrice = parseFloat(price);

  const item = document.createElement("li");
  item.className = "flex justify-between items-center text-sm border-b pb-1";

  item.innerHTML = `
    <span class="flex-1">${name}</span>
    <span class="text-green-700 font-semibold">৳${numericPrice}</span>
    <button class="remove-btn text-red-500 ml-2">❌</button>
  `;

  item.dataset.price = numericPrice;

  item.querySelector(".remove-btn").addEventListener("click", () => {
    totalPrice -= numericPrice;
    cartTotal.innerText = totalPrice.toFixed(2);
    item.remove();
  });

  cartItemsList.appendChild(item);
  totalPrice += numericPrice;
  cartTotal.innerText = totalPrice.toFixed(2);
};




cardcontainer.addEventListener('click',(e)=>{
  // console.log(e.target)
  // console.log(e.target.innerText)
  if(e.target.classList.contains('add-to-cart-btn')){
    const btn=e.target;
    const name = btn.getAttribute('data-name');
    const price = btn.getAttribute('data-price');

    console.log("Added to cart:");
    console.log("Name:", name);
    console.log("Price:", price);
    addToCartUI(name, price);

    // console.log("Bookmark button Clicked")
    // console.log(e.target.parentNode.children[0])
  }
})


loadCategory();
loadPlantsById("all",6);