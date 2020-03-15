import React from 'react';
import Button from "./Button";


class TodoListFooter extends React.Component {
    state = {
        isHidden: false
    };

    onAllFilterClick = () => {this.props.changeFilter(this.props.buttons[0].title)}
    onCompletedFilterClick = () => {this.props.changeFilter(this.props.buttons[1].title)}
    onActiveFilterClick = () => {this.props.changeFilter(this.props.buttons[2].title)}
    onShowFiltersClick = () => {this.setState({isHidden: false})}
    onHideFiltersClick = () => {this.setState({isHidden: true})}

    render = () => {
        let classForAll = this.props.filterValue === this.props.buttons[0].title ? "filter-active" : "";
        let classForCompleted = this.props.filterValue === this.props.buttons[1].title ? "filter-active" : "";
        let classForActive = this.props.filterValue === this.props.buttons[2].title ? "filter-active" : "";
        return (
            <div className="todoList-footer">
                {!this.state.isHidden && <div className="butn">
                <Button onClickFn={this.onAllFilterClick} classBtn = {classForAll} title ={this.props.buttons[0].title}/>
                <Button onClickFn={this.onCompletedFilterClick} classBtn = {classForCompleted} title ={this.props.buttons[1].title}/>
                <Button onClickFn={this.onActiveFilterClick} classBtn = {classForActive} title = {this.props.buttons[2].title}/>
                </div>}
                {!this.state.isHidden && <span onClick={this.onHideFiltersClick}>hide</span>}
                {this.state.isHidden && <span onClick={this.onShowFiltersClick}>show</span>}
            </div>
        );
    }
}

export default TodoListFooter;

///вынести кнопки в отдельную компоненту