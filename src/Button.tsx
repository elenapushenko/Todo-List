import React from 'react';

type OwnPropsType = {
    onClickFn: () => void
    classBtn: string
    title: string
}

class Button extends React.Component<OwnPropsType> {

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