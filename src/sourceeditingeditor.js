/**
 * @module source-editing-editor/sourceeditingeditor
 */

/* global window */

import { Plugin } from 'ckeditor5/src/core';

import '../theme/sourceeditingeditor.css';

const { ace } = window;

/**
 * @extends module:core/plugin~Plugin
 */
export default class SourceEditingEditor extends Plugin {
	/**
	 * @inheritDoc
	 */
	static get requires() {
		return [ 'SourceEditing' ];
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
	init() {
		this._aceEditors = [];
	}

	/**
	 * @inheritDoc
	 */
	afterInit() {
		if ( !ace ) {
			window.console.log( 'The "ace" library must be provided.' );

			return;
		}

		const editor = this.editor;

		this.listenTo( editor.plugins.get( 'SourceEditing' ), 'change:isSourceEditingMode', ( evt, name, isSourceEditingMode ) => {
			if ( !isSourceEditingMode ) {
				leaveEditingSourceMode( editor );
			} else {
				enterEditingSourceMode( editor );
			}
		} );
	}
}

/**
 * A callback which is executed when leaving the editing source mode.
 *
 * @param {module:core/editor/editor~Editor} editor
 */
function leaveEditingSourceMode( editor ) {
	const sourceEditingEditor = editor.plugins.get( 'SourceEditingEditor' );

	for ( const aceEditor of sourceEditingEditor._aceEditors ) {
		aceEditor.destroy();
	}

	sourceEditingEditor._aceEditors = [];
}

/**
 * A callback which is executed when entering the editing source mode.
 *
 * @param {module:core/editor/editor~Editor} editor
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
			maxLines: Infinity,
			autoScrollEditorIntoView: true,
			showPrintMargin: false
		} );

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
