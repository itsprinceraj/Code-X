//  crate a toggle class function ;

export const toggle = (element, className) => {
  const ele = document.querySelector(element);
  ele.classList.toggle(className);
};

export const htmlCode = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Boilerplate Code</title>
  <!-- Link to CSS -->
  <!-- <link rel="stylesheet" href="styles.css"> -->
</head>
<body>
  <header>
  <img  src="https://guide.codex.storage/codex/logo/Horizontal%20lockup/Large/PREVIEW-Codex-Horizontal%20lockup-White-Large.png"/>
    <h1>Welcome to CodeX! </h1>
  </header>

  <main>
    <p>This is a simple boilerplate for HTML, CSS, and JavaScript.</p>
    <button id="actionButton">Click Me</button>
  </main>

  <footer>
    <h3>&copy; 2024 Prince Raj. All rights reserved.</h3>
  </footer>

  <!-- Link to JavaScript -->
  <!-- <script src="script.js"></script> -->
</body>
</html>
`;

export const cssCode = `/* Reset some default styles */
body, h1, p, button {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
  line-height: 1.6;
  background-color: #f4f4f4;
  color: #333;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

header {
  text-align: center;
  margin-bottom: 20px;
}

img{
width: 200px;
}

main {
  text-align: center;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  color: white;
  background-color: #007BFF;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

footer {
  margin-top: 20px;
  font-size: 14px;
}
`;

export const jsCode = ` //Select the button and add a click event listener
document.getElementById('actionButton').addEventListener('click', () => {
  alert("Welcome To Code-X !");
});
`;
