module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
  settings: {
		react: {
			version: 'detect',
		}
	},
	extends: [
    'plugin:react/recommended',
		'standard',
		'plugin:react/jsx-runtime',
		'eslint-config-prettier',
	],
	overrides: [],
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: ['react'],
	rules: {
		'no-unused-vars': 'warn',
		'react/prop-types': 'off',
		'react/no-unknown-property': 'off',
		'import/export': 'off',
	},
};
