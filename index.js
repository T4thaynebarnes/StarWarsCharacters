// Week 12 project
// Create a full CRUD application of your choice using an API or JSON Server.
// Use JQuery/AJAX to interact with the API.
// Use a form to post new entities.
// Build a way for users to update or delete entities.
// Include a way to get entities from the API.
// Use Bootstrap and CSS to style your project.
// ***************************************************
// *****************allows for html to be written in Javascript*****************
/*  
   lit-html snippet - Begin
   Add to the top of your code. Works with html or jsx!
   Formats html in a template literal  using the lit-html library 
   Syntax: html`<div> html or jsx here! ${variable} </div>`
*/
//lit-html snippet - Begin
let html = (strings, ...values) =>
  strings.reduce((acc, str, i) => acc + str + (values[i] || ""), "");
//lit-html snippet - End

// **** TESTING CODE***
const URL_ENDPOINT = "http://localhost:3000/StarWarsCharacters";
// testing JQUERY get method
$.get(URL_ENDPOINT).then((data) => console.log("testing url endpoint", data));

// get method to grab the data in the json file and display it in a table
$.get(URL_ENDPOINT).then((data) =>
  // data.map() function will do the same as for/of loop
  data.map((character) => {
    console.log(
      "requesting data and mapping it onto the UI,same as for/of loop"
    );
    // append method used grabbing the table body in html and appending(html content)
    // to it
    $("#dom-table").append(
      $(html` <tr>
        <td>${character.id}</td>
        <td>${character.name}</td>
        <td>${character.profession}</td>
        <td>
          <button
            class="btn btn-warning"
            id="delete-btn-${character.id}"
            onclick="deleteCharacter('${character.id}')"
          >
          &#128169
          </button>
        </td>
        <td>
          <button class="btn btn-info">&#9999 </button>
        </td>
      </tr>`)
    );
  })
);
// delete character function deletes the character on click
function deleteCharacter(id) {
  console.log("deleting character: ", id);
  return $.ajax({
    url: URL_ENDPOINT + `/${id}`,
    type: "DELETE",
  });
}
// ****end of deleteCharacter()**
// this function handles the update of an existing character in the API

// this button once clicked will post a new character to the API
// event listener for submit button on screen
$("#create-newcharacter-btn").click(function () {
  console.log(
    "creating new character adding value from input bozes to json server"
  );
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
