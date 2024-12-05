const token = "your token";
const inputtext = document.getElementById("input");
const image = document.getElementById("image");
const button = document.getElementById("btn");
const loadingIndicator = document.getElementById("loading"); // Add a loading element

async function query() {
    try {
        const response = await fetch(
            "https://api-inference.huggingface.co/models/ZB-Tech/Text-to-Image",
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify({ "inputs": inputtext.value }),
            }
        );

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const result = await response.blob();
        return result;
    } catch (error) {
        console.error("Error fetching image:", error);
        alert("Failed to generate image. Please try again.");
    }
}

button.addEventListener('click', async function () {
    if (!inputtext.value.trim()) {
        alert("Please enter some text.");
        return;
    }

    loadingIndicator.style.display = 'block'; // Show loading
    const response = await query();

    if (response) {
        const objectURL = URL.createObjectURL(response);
        image.src = objectURL;
    }
    loadingIndicator.style.display = 'none'; // Hide loading
});

