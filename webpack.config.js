'use strict';

/* eslint-env node */

const { builds } = require( '@ckeditor/ckeditor5-dev-utils' );

const config = builds.getDllPluginWebpackConfig( {
	themePath: require.resolve( '@ckeditor/ckeditor5-theme-lark' ),
	packagePath: __dirname,
	manifestPath: require.resolve( 'ckeditor5/build/ckeditor5-dll.manifest.json' ),
	isDevelopmentMode: process.argv.includes( '--dev' )
} );

// `getDllPluginWebpackConfig()` is configured for the "@ckeditor" scope. Manual adjustments are needed.
config.output.library = [ 'Pomek', 'sourceEditingEditor' ];
config.output.filename = 'source-editing-editor.js';

module.exports = config;
