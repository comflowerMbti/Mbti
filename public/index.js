function openPopup() {
  document.getElementById("ch_overlay").style.display = "flex";
}

function closePopup() {
  document.getElementById("ch_overlay").style.display = "none";
}

document.addEventListener("DOMContentLoaded", function () {
  const textarea = document.getElementById("ch_text");
  textarea.addEventListener("input", handleTextareaInput);

  function handleTextareaInput(event) {
    const maxCharactersPerLine = 30; // Adjust this value as needed
    const inputText = event.target.value;

    // Replace newline characters with empty string to calculate visible characters
    const visibleCharacters = inputText.replace(/\n/g, "");

    // Calculate the number of lines based on the visible characters
    const lines = Math.ceil(visibleCharacters.length / maxCharactersPerLine);

    // Set the number of rows dynamically
    textarea.rows = lines > 1 ? lines : 1;
  }

  textarea.addEventListener("keydown", function (e) {
    // Check if Enter key is pressed without the Shift key
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Prevent default behavior (newline)
      // Add your logic for submitting the value here
      console.log("Submit:", textarea.value);
      textarea.value = ""; // Clear the textarea
    }
  });
});

function openNav() {
  document.getElementById("sidebar").style.width = "20%";
  document.getElementById("mainMenu").style.width = "0";
}

function closeNav() {
  document.getElementById("sidebar").style.width = "0";
  document.getElementById("mainMenu").style.width = "3vw";
}
