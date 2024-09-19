import globals from 'globals';
import pluginJs from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import jest from 'eslint-plugin-jest';

export default [
	{ languageOptions: { globals: globals.browser } },
	pluginJs.configs.recommended,
	eslintConfigPrettier,
	jest,
];
