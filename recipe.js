// recipe.js

document.getElementById("recipe-form").addEventListener("submit", async function(event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", document.getElementById("recipe-name").value);
    formData.append("ingredients", document.getElementById("recipe-ingredients").value);
    formData.append("directions", document.getElementById("recipe-directions").value);

    const imageFile = document.getElementById("recipe-image").files[0];
    if (imageFile) {
        formData.append("recipe-image", imageFile);
    }

    try {
        const response = await fetch("/add-recipe", {
            method: "POST",
            body: formData,
        });

        if (response.ok) {
            alert("Recipe added successfully!");
            loadRecipes(); // Reload all recipes after adding a new one
        } else {
            alert("Failed to add recipe.");
        }
    } catch (error) {
        console.error("Error:", error);
    }
});

// Function to fetch and display recipes
async function loadRecipes() {
    try {
        const response = await fetch("/recipes");
        const recipes = await response.json();

        const recipeContainer = document.getElementById("recipe-container");
        recipeContainer.innerHTML = recipes.map(recipe => `
            <div class="recipe">
                <h2>${recipe.name}</h2>
                <p><strong>Ingredients:</strong> ${recipe.ingredients}</p>
                <p><strong>Directions:</strong> ${recipe.directions}</p>
                ${recipe.owner ? `<p><strong>Owner:</strong> ${recipe.owner}</p>` : ""}
                ${recipe.image ? `<img src="${recipe.image}" alt="${recipe.name} image" style="width:200px; height:auto;">` : ""}
            </div>
        `).join("");
    } catch (error) {
        console.error("Failed to load recipes:", error);
    }
}

// Load all recipes on page load
loadRecipes();
