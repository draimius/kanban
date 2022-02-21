import Column from './column.js';
//entry point for the user interface code
export default class Kanban {
    //root represent the main div in html where all else will be generated via js into
    constructor(root) {
        this.root = root;

        Kanban.columns().forEach((column) => {
            const columnView = new Column(column.id, column.title);

            this.root.appendChild(columnView.elements.root);
        });
    }
    static columns() {
        return [
            {
                id: 1,
                title: 'Not Started'
            },
            {
                //idealy these be return via the server side (here we'll just define)
                id: 2,
                title: 'In Progress'
            },
            {
                id: 3,
                title: 'Completed'
            },
        ];
    }
}
