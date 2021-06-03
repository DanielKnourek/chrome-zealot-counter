class kill_counter{
    constructor(parent, name){
        this.components = {
            parent: parent,
            counter: document.createElement("div")
        }
        let initVal = localStorage.getItem("counterStart") === null ? 0 : localStorage.getItem("counterStart");
        this.data = {
            name: name,
            counter_start: initVal,
            counter_now: initVal
        }

        this.#create_counter(this.components.counter);

        this.components.parent.appendChild(this.components.counter)
    }

    #create_counter(root){
        let root_ = root;

        add(document.createTextNode(`${this.data.name} killed: `));
        this.components.counter_now = document.createTextNode(this.data.counter_now);
        add(this.components.counter_now);
        
        add(document.createElement('br'))
        
        add(document.createTextNode("This session: "))
        this.components.counter_start = document.createTextNode(this.data.counter_now - this.data.counter_start);
        add(this.components.counter_start)

        function add(node){
            root_.appendChild(node);
        }
    }

    setValue(value){
        this.data.counter_now = value;
        this.#update_counter()
    }

    resetStart(value){
        if(typeof value === 'undefined'){ value = this.data.counter_now}

        localStorage.setItem("counterStart", value);

        this.data.counter_start = value;
        this.#update_counter();
    }

    #update_counter(){
        this.components.counter_now.textContent = this.data.counter_now;
        this.components.counter_start.textContent = (this.data.counter_now - this.data.counter_start);
    }
}
// let mycounter = new kill_counter(document.querySelector('.answercell.post-layout--right'), "Zealots")