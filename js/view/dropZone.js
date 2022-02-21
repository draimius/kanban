import KanbanAPI from "../api/kanbanAPI.js";

export default class DropZone {
    static createDropZone() {
        const range = document.createRange();

        range.selectNode(document.body);

        const dropZone = range.createContextualFragment(`
    <div class="kanban__dropzone"></div>
    `).children[0];

        //magic w/drag and drop (active class)
        dropZone.addEventListener('dragover', (e) => {
            e.preventDefault()
            dropZone.classList.add('kanban__dropzone--active')
        })
        dropZone.addEventListener('dragleave', (e) => {
            dropZone.classList.remove('kanban__dropzone--active')
        })
        dropZone.addEventListener('drop', (e) => {
            e.preventDefault() //also dosent use this nearly many times i did (lul i also dont truely know what it does lmao)
            //becuase we drag on it first listener my fire and add class and unfocus our drag
            //-prevent by auto removing class in event happends
            dropZone.classList.remove('kanban__dropzone--active')
            //what does closest function do???
            //return the column for which currently dragging on 
            const columnElement = dropZone.closest('.kanban__column')
            //grabbing the id that was created in the column class
            const columnId = Number(columnElement.dataset.id)

            //that every drop zone bottom and top(clever)
            const dropZonesInColumn = Array.from(columnElement.querySelectorAll('.kanban__dropzone'))

            //find target dropzone dragging over in the list of whole/all
            const droppedindex = dropZonesInColumn.indexOf(dropZone)
            //return the index of item in its target list

            //which item did we drop (getting the id of the item we are draggin across)
            const itemId = Number(e.dataTransfer.getData('text/plain'))

            //grab item the we are dropping(dragging)
            const droppedItemElement = document.querySelector(`[data-id="${itemId}"]`)


            //dropped on target (now where do i insert)
            // checking if the target dropzone is one of the kanban items 
            //===appendign either after seclted item or the top of list 
            const insertAfter = dropZone.parentElement.classList.contains('kanban__item') ? dropZone.parentElement : dropZone

            //prevent bugzzzz
            //in the event try to insert into its current drop zone we do nothing
            if (droppedItemElement.contains(dropZone)) {
                return
            }


            console.log(insertAfter)
            //what the after function do here
            insertAfter.after(droppedItemElement)


            //where is/are/how/structure come from id's keys value ect...
            KanbanAPI.updateItem(itemId, {
                columnId,
                position: droppedindex
            })

        })

        return dropZone
    }
}
//using very different methods to make the drag and drop in what used to read the movement i]
//=identify the targets even the event listners are differnt and new to me
//event the elemtns like the row have individual ids to track interaction and identify
//--where not event any user data there but just taking the whole structure as a whole every piece