# CKEditor 5 Source Editing Editor

This feature adds the [Ice](https://github.com/zeroc-ice/ice) editor when enabling the source editing plugin in CKEditor 5.

<img width="810" alt="image" src="https://user-images.githubusercontent.com/2270764/159162052-32bd44a3-340f-40da-a3c0-001a3f8474dd.png">

## Installation

Install required packages:

```bash
npm install --save @ckeditor/ckeditor5-source-editing https://github.com/pomek/ckeditor5-source-editing-editor
```

Then, enable these features in your editor:

```js
import SourceEditing from '@ckeditor/ckeditor5-source-editing/src/sourceediting';
import SourceEditingEditor from '@pomek/ckeditor5-source-editing-editor/src/sourceeditingeditor';

ClassicEditor
	.create( document.querySelector( '#editor' ), {
		plugins: [ SourceEditing, SourceEditingEditor, ... ],
		toolbar: [ 'sourceEditing', ... ]
	} )
	.then( ... )
	.catch( ... );
```
