// Create the database
var request = window.indexedDB.open("login", 1);
request.onerror = function(event) {
  console.error("Error opening database: ", event.target.errorCode);
};
request.onsuccess = function(event) {
  var db = event.target.result;

  // Create the object store
  var objectStore = db.createObjectStore("users");

  // Add the user data to the object store
  objectStore.add({
    username: "johndoe",
    password: "password123"
  });
};

// Listen for the submit event
document.getElementById("loginForm").addEventListener("submit", function(event) {
  event.preventDefault();

  // Get the username and password from the form
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;

  // Check if the user exists in the database
  var request = objectStore.get(username);
  request.onsuccess = function(event) {
    var user = event.target.result;

    // If the user exists, check if the password is correct
    if (user && user.password === password) {
      // The user is authenticated, redirect to the home page
      window.location.href = "home.html";
    } else {
      // The user is not authenticated, show an error message
      alert("Invalid username or password");
    }
  };
});