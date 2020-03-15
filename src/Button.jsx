import React from 'react';


class Button extends React.Component {

    render = () => {

        return (
            <div className="button">
                <button onClick={this.props.onClickFn} className={this.props.classBtn}> {this.props.title}</button>
            </div>
        );
    }
}

export default Button;

///вынести кнопки в отдельную компоненту