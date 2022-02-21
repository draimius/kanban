import KanbanAPI from "../api/KanbanAPI.js";
import DropZone from "./dropZone.js";
export default class Item {
    constructor(id, content) {
        this.bottomDropZone = DropZone.createDropZone()


        this.elements = {}
        this.elements.root = Item.createRoot()
        this.elements.input = this.elements.root.querySelector('.kanban__item-input')


        this.elements.root.dataset.id = id
        this.elements.input.textContent = content
        //to know if theres been a change in the content we need to store a regrence to the original
        this.content = content
        this.elements.root.appendChild(this.bottomDropZone)

        const onBlur = () => {
            const newContent = this.elements.input.textContent.trim()
            //start here 
            if (newContent == this.content) { return }
            this.content = newContent
            //id for the row then object for ???(or is that wrong)
            KanbanAPI.updateItem(id, {
                content: this.content
            })

        }
        this.elements.input.addEventListener('blur', onBlur)
        this.elements.root.addEventListener('dblclick', () => {
            const check = confirm('sure you want to delete')

            if (check) {
                //this remove it from the local storage(database)
                KanbanAPI.deleteItem(id)
                this.elements.input.removeEventListener('blur', onBlur)
                //this.element.root is the container injected contain input ect.. all together
                //==then grabbing its parent being the column then from the removing thislementsroot
                this.elements.root.parentElement.removeChild(this.elements.root)
            }
        })

        this.elements.root.addEventListener('dragstart', (e) => {
            //comunicate between two html elemetns  (item id)
            //transfer date crazy you can pass the litaral item/elemtst id into another 
            // (you know exactly which two ect.. involved in action without having to directly select them)
            e.dataTransfer.setData('text/plain', id)
        })
        this.elements.input.addEventListener('drop', (e) => {
            //prevent the id form one elememtn bieng drop into other
            e.preventDefault()
        })

    }
    static createRoot() {
        const range = document.createRange();

        range.selectNode(document.body);

        return range.createContextualFragment(`
    <div class="kanban__item" draggable="true">
        <div class="kanban__item-input" contenteditable></div>
    </div>
    `).children[0];
    }

}
