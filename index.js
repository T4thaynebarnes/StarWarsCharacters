// Week 12 project
// Create a full CRUD application of your choice using an API or JSON Server.
// Use JQuery/AJAX to interact with the API.
// Use a form to post new entities.
// Build a way for users to update or delete entities.
// Include a way to get entities from the API.
// Use Bootstrap and CSS to style your project.
// ***************************************************
// **** TESTING CODE***
const URL_ENDPOINT = "http://localhost:3000/StarWarsCharacters";
$.get(URL_ENDPOINT).then((data) => console.log("testing url endpoint", data));
// using get method to grab the data in the array on .json file and console logs on click
$("#test-btn").click(function () {
  $.get(URL_ENDPOINT).then((data) => console.log(data));
});
// get method to grab the data in the json file and display it in a table
$.get(URL_ENDPOINT).then((data) =>
  data.map((character) => {
    $("#dom-table").append(
      $(` <tr>
        <td>${character.id}</td>
        <td>${character.name}</td>
        <td>${character.profession}</td>
        <td>
          <button onclick="deleteUser(${character.id})" }>🗑</button>
        </td>
      </tr>`)
    );
  })
);
// this button once clicked will post a new character to the API
$("#test2-btn").click(function () {
  fetch(URL_ENDPOINT, {
    method: "POST",
    body: JSON.stringify({
      name: $("#name").val(),
      profession: $("#profession").val(),
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
});
