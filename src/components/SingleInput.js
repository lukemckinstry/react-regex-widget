import React, {Component} from 'react';
import PropTypes from 'prop-types';


class SingleInput extends Component {
	render(props) {
	return(
		<div className="form-group">
		<label className="form-label">{this.props.title}</label>
		<input
			className="form-input"
			name={this.props.name}
			type={this.props.inputType}
			value={this.props.content}
			onChange={this.props.controlFunc}
			placeholder={this.props.placeholder} />
		</div>
		)
	}
}

SingleInput.propTypes = {
	inputType: PropTypes.oneOf(['text', 'number']).isRequired,
	title: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	controlFunc: PropTypes.func.isRequired,
	content: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	]).isRequired,
	placeholder: PropTypes.string,
};

export default SingleInput;