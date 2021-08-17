import SourceEditingEditor from '../src/sourceeditingeditor';

describe( 'SourceEditingEditor', () => {
	it( 'should be named', () => {
		expect( SourceEditingEditor.pluginName ).to.equal( 'SourceEditingEditor' );
	} );

	describe( '#staticTest', () => {
		it( 'returns foo when passed a==1', () => {
			expect( SourceEditingEditor.staticTest( 1 ) ).to.equal( 'foo' );
		} );

		it( 'returns bar when passed a==2', () => {
			expect( SourceEditingEditor.staticTest( 2 ) ).to.equal( 'bar' );
		} );

		it( 'throws an error when passed a==3', () => {
			expect( () => {
				SourceEditingEditor.staticTest( 3 )
			} ).to.throw( 'Test' );
		} );
	} );
} );
