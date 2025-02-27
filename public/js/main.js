//buttons. Looking for anything with the text specified in paranthese.
const deleteBtn = document.querySelectorAll(".fa-trash"); //creating a variable and assigning it to a selection of all elements with a class of the trash can
const item = document.querySelectorAll(".item span"); //creating a variable and assigning it to a selection of span tags inside of a parent that has a class of "item"
const itemCompleted = document.querySelectorAll(".item span.completed"); // creating a variable and assigning it to a selection of spans with a class of "completed" inside of a parent with a class of "item"
//we use const so it cannot be changed

Array.from(deleteBtn).forEach((element) => {
  //creating an array from our selection and starting a loop.  We have multiple trash cans so we're taking those delete buttons and creating an array.
  element.addEventListener("click", deleteItem); //We're looping through each item and on the current item we're adding an event listener that waits for a click and then calls a function called deleteItem
}); //closes our loop

Array.from(item).forEach((element) => {
  //creating an array from our selection and starting a loop. We have multiple item so we're taking those items and creating an array.
  element.addEventListener("click", markComplete); //add an event listener to the current item that waits for a click and then calls a function called markComplete
}); //closes our loop

Array.from(itemCompleted).forEach((element) => {
  //creating an array from our selection (a span with the class of completed under the parent class of item) and starting a loop
  element.addEventListener("click", markUnComplete); //adds an event listener to ONLY completed items
}); //closes our loop

//FUNCTIONS  - these reference the functions we called above. We don't add the functions directly above otherwise they would execute immediately
// deleteItem is the method name. Async tells the method that this is not going to be the
//same function that runs in the same of loop. We're waiting for information before
//running this function
async function deleteItem() {
  //declare an asynchronous function. We can force the function to wait for other tasks to
  //be completed.
  const itemText = this.parentNode.childNodes[1].innerText;
  //looks inside of the list item and grabs only the inner text within the list span.
  //intertext is text inside an element
  //.this refers to the container that the item  is in
  //?Parentnode is the list itself and the childNOde is the span. element [1] in an array is the second item in an array. Indent is the first item, span with text is the second

  try {
    //declaring a try block. A try comes with a catch. The try block allows us to run something and
    //if an error is thrown the catch block handles that error with a response.
    const response = await fetch("deleteItem", {
      //creates a response variable that waits on a fetch to get data from the result of the deleteItem route
      method: "delete", // //we're also starting an object and declaring a method of delete. Sets the CRUD method for the route
      headers: { "Content-Type": "application/json" }, //We're specifiing the type of content expected which is JSON.
      body: JSON.stringify({
        // The body is the message we're getting. Declare the message content being passed, and stringify that content
        itemFromJS: itemText, //itemFromJS is itemText, which is the innertext of our list item and calling it itemFromJ/ Setting the content of the body to the inner text of the list item, and naming it 'itemFromJS'
      }), //closing the body
    }); //closing the object

    //awaiting response from server then reloading the page
    const data = await response.json(); //waiting for the conversion of the response (to JSON) back from the server
    console.log(data); //log the result to the console
    location.reload(); //reloads the page to update what is displayed
  } catch (err) {
    // if for whatever reason it cannot delete then throw out an error OR If an error occurs grab it and pass it into catch block
    console.log(err); //log the error to the console
  }
}

async function markComplete() {
  //declare an asynchronous function
  const itemText = this.parentNode.childNodes[1].innerText; //looks inside of the list item and grabs only the inner text within the list span.
  try {
    // starting a try block to do something
    const response = await fetch("markComplete", {
      //creates a response variable that waits on a fetch to get data from the result of the markComplete route
      method: "put", //setting the CRUD method to "update" for the route
      headers: { "Content-Type": "application/json" }, //specifying the type of content expected, which is JSON
      body: JSON.stringify({
        //declare the message content being passed, and stringify that content
        itemFromJS: itemText, //setting the content of the body to the inner text of the list item, and naming it 'itemFromJS'
      }), //closing the body
    }); //closing the object
    const data = await response.json(); //waiting on JSON from the response to be converted
    console.log(data); //log the result to the console
    location.reload(); //reloads the page to update what is displayed
  } catch (err) {
    //if an error occurs, pass the error into the catch block
    console.log(err); //log the error to the console
  } //close the catch block
} //end the function

async function markUnComplete() {
  //declare an asynchronous function
  const itemText = this.parentNode.childNodes[1].innerText; //looks inside of the list item and grabs only the inner text within the list span.
  try {
    // starting a try block to do something
    const response = await fetch("markUnComplete", {
      //creates a response variable that waits on a fetch to get data from the result of the markUnComplete route
      method: "put", //setting the CRUD method to "update" for the route
      headers: { "Content-Type": "application/json" }, //specifying the type of content expected, which is JSON
      body: JSON.stringify({
        //declare the message content being passed, and stringify that content
        itemFromJS: itemText, //setting the content of the body to the inner text of the list item, and naming it 'itemFromJS'
      }), //closing the body
    }); //closing the object
    const data = await response.json(); //waiting on JSON from the response to be converted
    console.log(data); //log the result to the console
    location.reload(); //reloads the page to update what is displayed
  } catch (err) {
    //if an error occurs, pass the error into the catch block
    console.log(err); //log the error to the console
  } //close the catch block
} //end the function
