import React, {Component} from 'react';
import SingleInput from '../components/SingleInput';
import Highlighter from '../components/Highlighter'
import styles from '../highlighterstyles.css';
import latinize from 'latinize'


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
		this.renderName = this.renderName.bind(this);
	}
	componentDidMount() {
		// fetch('./fake_db.json')
		// 	.then(res => res.json())
		// 	.then(data => {
		// 		this.setState({
		// 			ownerName: data.ownerName,
		// 			petSelections: data.petSelections,
		// 			selectedPets: data.selectedPets,
		// 			ageOptions: data.ageOptions,
		// 			ownerAgeRangeSelection: data.ownerAgeRangeSelection,
		// 			siblingOptions: data.siblingOptions,
		// 			siblingSelection: data.siblingSelection,
		// 			currentPetCount: data.currentPetCount,
		// 			description: data.description
		// 		});
		// 	});
	}

	handleInitChange(e) { this.setState({ initText: e.target.value }) }
	handleAfterChange(e) { this.setState({ afterText: e.target.value }) }


	handleRegexChange(e) {
		let input = e.target.value;
		this.setState({ regexText: input }, () => this.writeReplace())
	}

	handleReplaceChange(e) {
		let input = e.target.value;
		// this.setState({ replaceText: input }).then(()=>{
    		
  //   	})
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
		console.log( this.evalRegex() )
		console.log('write replacement ', this.state.initText  );
		console.log('write replacement ', this.state.afterText  );
		if ( this.evalRegex() ) {
			var regex = new RegExp( this.state.regexText, 'g' );
			var init = this.state.initText;
			var replacement = this.state.replaceText;
			var result = init.replace(regex , replacement  );
			console.log( 'this is the result ', result )
			this.setState({ afterText: result }, () => console.log('writeReplace: ', this.state.afterText));
		} else {}

	}

	renderName() {
		var html = []

		var splitPattern = this.state.regexText != null ? new RegExp( this.state.regexText, "i") : '';
		var name = this.state.initText;
		var miniWords = name.split(splitPattern);
		console.log( 'miniWords --> ', miniWords)

		miniWords.forEach( (mw) => {
			console.log( "-->", mw )
			if (this.state.regexText != null && mw.toLowerCase() == this.state.regexText.toLowerCase()) {
				html.push(<span className="bold">{mw}</span>)
			} else {
				html.push(<span>{mw}</span>)
			}
		} )
		console.log( 'html -->', html)

		return <span> {html}</span>;
		this.setState({ initText: html });

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
		const searchWords = this.state.regexText.split(/\s/).filter(word => word)

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
				 
				<Highlighter
			          activeClassName={styles.Active}
			          activeIndex={-1}
			          caseSensitive={false}
			          highlightClassName={styles.Highlight}
			          highlightStyle={{ fontWeight: 'normal' }}
			          sanitize={latinize}
			          searchWords={searchWords}
			          textToHighlight={this.state.initText}
			        />

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