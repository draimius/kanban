import KanbanAPI from "../api/kanbanAPI.js";
import DropZone from "./dropZone.js";
import Item from "./item.js";

export default class Column {
    constructor(id, title) {
        //able to create dropzone in both place with the same function
        const topDropZone = DropZone.createDropZone()

        this.elements = {};
        this.elements.root = Column.createRoot();
        this.elements.title = this.elements.root.querySelector('.kanban__column-title');
        this.elements.items = this.elements.root.querySelector('.kanban__column-items');
        this.elements.addItem = this.elements.root.querySelector('.kanban__add-item');

        this.elements.root.dataset.id = id
        this.elements.title.textContent = title
        //adding of the topDropZone happends before we render the item so add that do we auto come with it
        this.elements.items.appendChild(topDropZone) //just like the bottom was

        this.elements.addItem.addEventListener('click', () => {
            const newItem = KanbanAPI.insertItem(id, '');
            this.renderItem(newItem)
        })

        //make items under the column appear (we call the api)
        // if (KanbanAPI.getItem(id) !== undefined) {//my gaste keep code as i dont have any data in local yet
        KanbanAPI.getItem(id).forEach(item => {
            this.renderItem(item)
        })


        // }
    }
    static createRoot() {
        //createRange used to create html(not sure yet what it does)
        const range = document.createRange();
        range.selectNode(document.body);
        //very interesting (children[0] need to know where it should add it?? i believe)
        return range.createContextualFragment(`
    <div class="kanban__column">
      <div class="kanban__column-title"></div>
      <div class="kanban__column-items"></div>
      <button class="kanban__add-item" type="button"> + Add </button>
    </div>`).children[0];
        //its a virtural DOM tree(not sure what that is either?)
    }
    renderItem(data) {
        const item = new Item(data.id, data.content)
        this.elements.items.appendChild(item.elements.root)
    }
}
//notice that everything when inserting/adding a card title ,column it first goes throught the api
//then from there things get value return and generate for the client side render