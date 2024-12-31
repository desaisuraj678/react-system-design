/**
 
 Two-way data binding refers to the ability to bind changes to an object’s properties to changes in the UI(mostly input), and vice-versa.
 */

 const input = document.createElement("input");

 const state = { value: "suraj" };
 
 function model(state, input) {
   // Define a property with a getter and setter for two-way binding
   Object.defineProperty(state, "value", {
     get() { // The getter ensures that when state.value is accessed, it always reflects the current value of the input element
       return input.value;
     },
     set(newValue) {
       input.value = newValue;
     },
     configurable: true,
   });
 
   // Sync changes from the input element back to the state object
   input.addEventListener("input", () => {
     state.value = input.value;
   });
 
   // Initialize the input's value
   input.value = state.value;
 }
 
 // Call the model function
 model(state, input);
 
 // Test the functionality
 console.log(input.value); // should print "suraj"
 
 state.value = "desai";
 console.log(input.value); // should print "desai"
 
 input.value = "Developer";
 input.dispatchEvent(new Event("input")); // Trigger input event
 console.log(state.value); // should print "Developer"
 

