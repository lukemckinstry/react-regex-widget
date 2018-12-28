import React, {Component} from 'react';
import PropTypes from 'prop-types';


class TextArea extends Component {
	render(props) {
	return(
		<div className="form-group">
			<label className="form-label">{this.props.title}</label>
			<textarea
				className="form-input"
				style={this.props.resize ? null : {resize: 'none'}}
				name={this.props.name}
				rows={this.props.rows}
				value={this.props.content}
				onChange={this.props.controlFunc}
				placeholder={this.props.placeholder} />
		</div>
	)
	}

}


TextArea.propTypes = {
	title: PropTypes.string.isRequired,
	rows: PropTypes.number.isRequired,
	name: PropTypes.string.isRequired,
	//content: PropTypes.string.isRequired,
	content: PropTypes.oneOfType([
  		PropTypes.string,
  		PropTypes.element
	]),
	resize: PropTypes.bool,
	placeholder: PropTypes.string,
	controlFunc: PropTypes.func.isRequired
};

export default TextArea;