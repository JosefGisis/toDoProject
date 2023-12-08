This is a todo application made with JavaScript. This website is designed using Tailwind CSS. 

-Josef Gisis 12/05/2023

Project Requirements:
  - Collections:
    - All todo items are contained within collections.
    - The web application automatically instantiates a default collection for quick todo creation. 
    - Default collection need to have...
      1. A preset title.
      2. A method to instantiate a todo item.  
      3. A count of the items it contains. 
      4. A position before any custom collections.
    - Default collection cannot be deleted, does not have a start date, and cannot be renamed. 

    - Users can create custom collections.
    - Custom collections need to have...
      1. A method to instantiate a todo item.
      2. A title.
      3. A creation date.
      4. A count of the items it contains.
      5. A method to delete the collection and all of its contents.
      6. A position relative to other custom collections.
      7. A method to reposition a collection anywhere after the default collection.
      8. A method to edit the title of the collection. 

  - TODO items:
    - Users can instantiate TODOs in any collection by accessing the their respective methods.
    - All due todo items are prefixed with "Need to...!".
    - All open-ended todo items are prefixed with "Have you...?".
    - All todo items share these features...
      1. They have a title.
      2. They have an optional description. 
      2. They have a creation date. 
      3. They have a completion status, complete or incomplete, indicated by a checkmark.
      4. They have a due date, that may be indefinite or definite. 
      5. They have a method that edits the title, description, and due date.
      6. They have a method to delete the item. 
      7. They change their appearance when completed (e.g. crossed out, color change, etc.).
      8. They have a position relative to other items within the same collection. 
      9. A method to reposition the TODO relative to the other items within the same collection. 
    - All todo items need to display a condescending comment when items are checked-off.