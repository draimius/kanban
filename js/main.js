import Kanban from './view/kanban.js';
new Kanban(document.querySelector('.kanban'));




//so each elemetn like the board itself, its column, its related title , and items each have their own file
// and class and respective methods and initiations each element broken down aa to its creation and
//intended behavior with itseld and related elements
//we make the class and file the export and import then in the using of the others like
// in the column when we go to add item in target column we would create a new instance of the item class
//that way not only created but inheriently have all the realated propeties methods and behaviors we want
// damn amazing