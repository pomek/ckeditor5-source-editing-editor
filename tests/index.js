import { SourceEditingEditor as SourceEditingEditorDll } from '../src/index';
import SourceEditingEditor from '../src/sourceeditingeditor';

describe( 'CKEditor5 Source Editing DLL', () => {
	it( 'exports SourceEditingEditor', () => {
		expect( SourceEditingEditorDll ).to.equal( SourceEditingEditor );
	} );
} );
