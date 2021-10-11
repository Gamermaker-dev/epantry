import React, { Component } from "react";

export default class RefuelToggleSwitch extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let className = this.props.className ? `${this.props.className} switch` : 'switch';

        if (this.props.isRtl) {
            className += ' is-rtl';
        }

        if (this.props.color) {
            className += ` is-${this.props.color}`;
        }

        if (this.props.size) {
            className += ` is-${this.props.size}`;
        }

        if (this.props.thin) {
            className += ' is-thin';
        }

        if (this.props.rounded) {
            className += ' is-rounded';
        }

        if (this.props.outlined) {
            className += ' is-outlined';
        }

        let id = this.props.id ? this.props.id : '';
        let checked = this.props.checked ? this.props.checked : false;
        let disabled = this.props.disabled ? this.props.disabled : false;

        return (
            <input class={className} type="checkbox" id={id} checked={checked} disabled={disabled} {...this.props} /> 
        );
    }
}