import React, {Component} from 'react';
import SingleInput from '../components/SingleInput';
import TextArea from '../components/TextArea';



class FormContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			regexText: '',
			replaceText: '',
			initText: '',
			afterText: ''
		};
		this.handleFormSubmit = this.handleFormSubmit.bind(this);
		this.handleClearForm = this.handleClearForm.bind(this);
		this.handleRegexChange = this.handleRegexChange.bind(this);
		this.handleReplaceChange = this.handleReplaceChange.bind(this);
		this.handleInitChange = this.handleInitChange.bind(this);
		this.handleAfterChange = this.handleAfterChange.bind(this);
		this.evalRegex = this.evalRegex.bind(this);
		this.writeReplace = this.writeReplace.bind(this);
	}
	componentDidMount() {
	}

	handleInitChange(e) { this.setState({ initText: e.target.value }) }
	handleAfterChange(e) { this.setState({ afterText: e.target.value }) }


	handleRegexChange(e) {
		let input = e.target.value;
		this.setState({ regexText: input }, () => this.writeReplace())
	}

	handleReplaceChange(e) {
		let input = e.target.value;
		this.setState({ replaceText: input }, () => this.writeReplace())
	}


	evalRegex() {
		var r = this.state.regexText;
		try {
	        var regex = new RegExp(r);
	    } catch(e) {
	        alert(e);
	        return false;
	    }
	    return true
	}
	
	writeReplace() {
		if ( this.evalRegex() ) {
			var regex = new RegExp( this.state.regexText, 'g' );
			var init = this.state.initText;
			var replacement = this.state.replaceText;
			var result = init.replace(regex , replacement  );
			this.setState({ afterText: result }, () => console.log('writeReplace: ', this.state.afterText));
		} else {}

	}



	handleClearForm(e) {
		e.preventDefault();
		this.setState({
			regexText: '',
			replaceText: '',
			initText: '',
			afterText: ''
		});
	}
	handleFormSubmit(e) {

	}
	render() {
		return (
			<div>
			<form className="container" onSubmit={this.handleFormSubmit}>
				<h6>Cleaning text with regex, you are in the right place ...</h6>
				
				<TextArea
					inputType={'text'}
					title={'Original'}
					name={'name'}
					rows={ 10 }
					controlFunc={this.handleInitChange}
					content={this.state.initText }
					placeholder={'Enter text to edit with regex'} />
				<TextArea
					inputType={'text'}
					title={'Regex Find'}
					name={'name'}
					rows={ 2 }
					controlFunc={this.handleRegexChange}
					content={this.state.regexText }
					placeholder={'Enter regex'} />
				<TextArea
					inputType={'text'}
					title={'Regex Replace'}
					name={'name'}
					rows={ 2 }
					controlFunc={this.handleReplaceChange}
					content={this.state.replaceText }
					placeholder={'Enter text to replace regex matches'} />
				<TextArea
					inputType={'text'}
					title={'Cleaned by Regex'}
					name={'name'}
					rows={ 10 }
					controlFunc={this.handleAfterChange}
					content={this.state.afterText }
					placeholder={'This will output text edited by regex '} />


				<button
					className="btn btn-link float-left"
					onClick={this.handleClearForm}>Clear</button>
			</form>
			</div>

		);
	}
}

export default FormContainer;