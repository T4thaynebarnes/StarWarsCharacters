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

// **** URL endpoint***
const URL_ENDPOINT = "http://localhost:3000/StarWarsCharacters";
// testing JQUERY get method so one can see what data is being passed in
$.get(URL_ENDPOINT).then((data) => console.log("testing url endpoint", data));

// get method to grab the data in the json file and display it in a table
$.get(URL_ENDPOINT).then((data) =>
  // data.map() function will do the same as for/of loop. it basically goes
  // thru each and every item in the array in data.json and displays it on the HTML
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
          <button onclick="updateCharacter('${character.id}')"  id="update-btn-${character.id}" class="btn btn-info">&#9999 </button>
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
// *** function to update character use put method, it is called when the edit button is clicked
function updateCharacter() {
  $("#update-form").append(
    $(html`
      <div class="form-control">
        <h1>update your character</h1>
        <label for="update-name">Name: </label>
        <input id="update-name" type="text" placeholder="enter new name here" />
        <label for="update-profession">Profession: </label>
        <input
          id="update-profession"
          type="text"
          placeholder="enter new profession here"
        />
        <button class="btn btn-danger mt-2" id="submit-changes-btn">
          Submit Changes &#9854;
        </button>
      </div>
    `)
  );
}

// this button once clicked will post a new character to the API
// event listener for submit button on screen

$("#create-newcharacter-btn").click(function () {
  console.log(
    "creating new character adding value from input boxes to json server"
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
// **** end of submit your character button
// ***I have tried so hard to get a put method to work wether it be Jquery or fetch method.
// I am not sure why it is not working I also was never able to get the lab solution for week 12 to work to use as a reference.
// i tried fecth method as you see below, I tried ajax call, I beleive it is a logical error I have nor error messages or indications of syntax typos
$("#submit-changes-btn").click(function () {
  fetch(URL_ENDPOINT, {
    method: "PUT",
    body: JSON.stringify({
      name: $("#update-name").val(),
      profession: $("#update-profession").val(),
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
});

// ***** this ajax call did not work for put method
// $("submit-changes-btn").click(function () {
//   return $.ajax({
//     url: URL_ENDPOINT + `/${id}`,
//     type: "PUT",
//     name: $("#update-name").val(),
//     profession: $("#update-profession").val(),

//     success: function (response) {
//       console.log(response);
//     },
//     error: function (xhr, status, error) {
//       console.log(xhr.responseText);
//     },
//   });
// });
