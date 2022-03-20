# CKEditor 5 Source Editing Editor

This feature adds the [Ice](https://github.com/zeroc-ice/ice) editor when enabling the source editing plugin in CKEditor 5.

<img width="821" alt="image" src="https://user-images.githubusercontent.com/2270764/159161777-514d02b0-446f-4b75-a102-7d1cfccb4eaf.png">

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
