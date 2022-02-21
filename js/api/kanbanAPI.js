export default class KanbanAPI {
    //locate item via its id
    static getItem(columnId) {
        //static mean this run without having to be initiated via the class auto runs
        const column = read().find((column) => column.id == columnId);
        if (!column) {
            return [];
        }
        return column.items;
    }
    //insert Item(which dont get completly how i would insert jsut return column dosent exits for now)
    static insertItem(columnId, content) {
        const data = read();
        const column = data.find((column) => column.id == columnId);
        const item = {
            id: Math.floor(Math.random() * 100000),
            content
        };
        if (!column) {
            throw new Error('Column does not exist');
        }
        column.items.push(item);
        save(data);

        return item;
    }
    //update Item
    static updateItem(itemId, newProps) {
        //gets refrence to the current data in local storage page currently
        const data = read();
        //array destructure to run this funciton
        const [item, currentColumn] = (() => {
            for (const column of data) {
                const item = column.items.find((item) => item.id == itemId);
                if (item) {
                    return [item, column];
                }
            }
        })();

        if (!item) {
            throw new Error('item not found');
        }

        item.content = newProps.content === undefined ? item.content : newProps.content;

        //update comumn and position
        if (newProps.columnId !== undefined && newProps.position !== undefined) {
            const targetColumn = data.find(column => column.id == newProps.columnId);
            //delete the item form it's current column (finding index of item and splicing it out of array and 1 for dlete count)
            currentColumn.items.splice(currentColumn.items.indexOf(item), 1);

            //move item into it's new column and position (here we just insert but no delete count)
            targetColumn.items.splice(newProps.position, 0, item);
        }
        //reads the local storate data (saving it )
        save(data);
    }

    //
    static deleteItem(itemId) {
        const data = read();

        for (const column of data) {
            const item = column.items.find((item) => item.id == itemId);

            if (item) {
                column.items.splice(column.items.indexOf(item), 1);
            }
        }
        save(data);
    }
}

// all methods actions will make use of these funcitons
function read() {
    const jsObj = localStorage.getItem('kanban-data');

    if (!jsObj) {
        return [
            {
                id: 1,
                items: [],
            },
            {
                id: 2,
                items: [],
            },
            {
                id: 3,
                items: [],
            },
        ];
    }
    return JSON.parse(jsObj)
}

function save(data) {
    localStorage.setItem('kanban-data', JSON.stringify(data));
}


//its a very different way of thinking compared to how i would originally when creating a project just sort of approched it always
//from the ui side which was majority of my projects right so makes sense however now wanting to build full stack and actual deployable
//apps that more then just my self can visit i see how really starting from the other side as in how we are going to serve and
//collect save data  comes first thinking of all that first the we build the ui using that
//thinkig first how we'll store , strucuture , serve and collect date come first
//thinkig about how data will be edited and accessed before we event think about how it will be inserted ect..


// if get json issue with unexpected u in json some shit lul
// run localStorage.clear()
// in the console to clear it up