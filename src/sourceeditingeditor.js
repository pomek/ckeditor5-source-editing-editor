/**
 * @module source-editing-editor/sourceeditingeditor
 */

/* global window */

import { Plugin } from 'ckeditor5/src/core';
import htmlBeautify from 'html-beautify';

import 'ace-builds/src-min-noconflict/ace';
import 'ace-builds/src-min-noconflict/mode-html';
import 'ace-builds/src-min-noconflict/theme-chrome';

import '../theme/sourceeditingeditor.css';

const { ace } = window;

/**
 * @extends module:core/plugin~Plugin
 */
export default class SourceEditingEditor extends Plugin {
	/**
	 * @inheritDoc
	 */
	constructor( editor ) {
		super( editor );

		/**
		 * @private
		 * @member {Array}
		 */
		this._aceEditors = [];
	}

	/**
	 * @inheritDoc
	 */
	static get pluginName() {
		return 'SourceEditingEditor';
	}

	/**
	 * @inheritDoc
	 */
	static get requires() {
		return [ 'SourceEditing' ];
	}

	/**
	 * @inheritDoc
	 */
	init() {
		const editor = this.editor;

		this.listenTo( editor.plugins.get( SourceEditing ), 'change:isSourceEditingMode', ( evt, name, isSourceEditingMode ) => {
			if ( !isSourceEditingMode ) {
				leaveEditingSourceMode( editor );
			} else {
				enterEditingSourceMode( editor );
			}
		} );
	}
}

/**
 *
 * @param editor
 */
function leaveEditingSourceMode( editor ) {
	const sourceEditingEditor = editor.plugins.get( 'SourceEditingEditor' );

	for ( const aceEditor of sourceEditingEditor._aceEditors ) {
		aceEditor.destroy();
	}

	sourceEditingEditor._aceEditors = [];
}

/**
 *
 * @param editor
 */
function enterEditingSourceMode( editor ) {
	const sourceEditing = editor.plugins.get( 'SourceEditing' );
	const sourceEditingEditor = editor.plugins.get( 'SourceEditingEditor' );

	for ( const [ , viewWrapper ] of sourceEditing._replacedRoots ) {
		const textarea = viewWrapper.childNodes[ 0 ];

		const aceEditor = ace.edit( textarea, {
			theme: 'ace/theme/chrome',
			mode: 'ace/mode/html',
			minLines: 5,
			maxLines: 20,
			autoScrollEditorIntoView: true,
			showPrintMargin: false
		} );

		aceEditor.setValue( htmlBeautify( textarea.value ) );

		aceEditor.on( 'change', () => {
			textarea.value = aceEditor.getValue();
			textarea.dispatchEvent( new window.Event( 'input' ) );
		} );

		aceEditor.session.setUseWorker( false );
		aceEditor.renderer.setScrollMargin( 10, 10, 10, 10 );
		aceEditor.selection.setRange( new ace.Range( 0, 0, 0, 0 ) );
		aceEditor.focus();

		sourceEditingEditor._aceEditors.push( aceEditor );
	}
}
