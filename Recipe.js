const numRecipes = 3;
        // const API_KEY = "b6a9aeff10334f5898f279a8e8c3ec68";
        const API_KEY = "5fb1910d88fe4e91b523799e4d57d2b3";
        async function getRecipe() {
            try {
                let ingredients = document.getElementById("ingredientGet").value;
                console.log (ingredients);

                const endpoint = new URL(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}
                    &number=${numRecipes}&ranking=2&ignorePantry=true&apiKey=${API_KEY}`);
                const response = await fetch(endpoint);
                const data = await response.json();

                logRecipes(data);
                await displayRecipes(data);

            } catch (err) {
                console.log("From findByIngredient endpoint: " + err);
            }
        }

        async function displayRecipes(data) {
            for (let i = 0; i < numRecipes; i++) {
                // display image
                let img = document.createElement('img');
                img.src = data[i].image;
                document.body.appendChild(img);

                // create title
                let name = document.createElement("a");
                let textNode = document.createTextNode(data[i].title);
                name.appendChild(textNode);

                // create link
                await new Promise(resolve => setTimeout(resolve, 1000));
                let sourceLink = await getRecipeLink(data[i].id);
                name.title="link title";
                name.href = sourceLink;

                // display title and link
                document.body.appendChild(name);
            }

            const refresh = document.createElement('button');
            refresh.innerText = "Refresh";
            refresh.className = "prettyButton2";
            refresh.addEventListener('click', () => {
                location.reload();
            })
            document.body.appendChild(refresh);
        }

        async function getRecipeLink(id) {
            try {
                const endpoint = new URL(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}&includeNutrition=false.`);
                const response = await fetch(endpoint);
                const data = await response.json();
                return data.sourceUrl;

            } catch (err) {
                console.log("From getRecipe endpoint: " + err);
            }
        }

        function logRecipes(data) {
            for (let i = 0; i < data.length; i++) {
                console.log(data[i].id + " " + data[i].title);
            }
        }