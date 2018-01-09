import React, { Component } from 'react';

export default class CheckBox extends Component {

    constructor(props) {
        super(props);

        this.state = {
            checked: this.props.checked || false,
        };
    }

    onChange = e => {
        onChange(!this.state.checked);
        this.setState({ checked: !this.state.checked });
    }

    render() {
        const { checked } = this.state;
        const { color = '#666', size = 24, onChange = _ => _ } = this.props;

        return (
            <i
                className="material-icons"
                style={{ color: color, fontSize: size }}
                onClick={this.onChange}
                >
                {checked ? 'check_box' : 'check_box_outline_blank'}
            </i>
        );
    }
}
