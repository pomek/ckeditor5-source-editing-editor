#!/usr/bin/env node

/* eslint-env node */

'use strict';

require( '@ckeditor/ckeditor5-dev-env' )
	.bumpVersions( {
		cwd: process.cwd(),
		packages: null,
		dryRun: process.argv.includes( '--dry-run' )
	} );
