import React from 'react';

type StateType = {
    error: boolean
    title: string
}

type OwnPropsType = {
    addItem: (newTitle: string) => void
}

class AddNewItemForm extends React.Component<OwnPropsType, StateType> {
    state: StateType = {
        error: false,
        title: ""
    }
    onAddItemClick = () => {
        let newTitle = this.state.title
        this.setState({title: ""})
        if(newTitle === "") {
            this.setState({error: true})
        } else {
            this.setState({error: false})
            this.props.addItem(newTitle);
        }
    };

    onTitleChanged = (e: any) => {
        let newTitle = e.currentTarget.value;
        this.setState({error: false, title: newTitle})
    };
    onAddItemEnterPress = (e: any) => {
        if (e.key === "Enter") {
            this.onAddItemClick();
        }
    }

    render = () => {
        let classForInput = (this.state.error) ? "error" : "";
        return (
            <div className="todoList-header">
                <div className="todoList-newTaskForm">
                    <input onChange={this.onTitleChanged}
                           className={classForInput}
                           type="text"
                           placeholder="New item name"
                           onKeyPress = {this.onAddItemEnterPress}
                           value={this.state.title}
                    />
                    <button onClick={this.onAddItemClick}>Add</button>
                </div>
            </div>
        );
    }
}

export default AddNewItemForm;

