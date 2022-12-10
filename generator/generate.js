const {generateTemplateFiles} = require('generate-template-files');
const {exec} = require('child_process');


generateTemplateFiles([
    {
        option: 'UI Module',
        defaultCase: '(pascalCase)',
        entry: {
            folderPath: './generator/ui',
        },
        stringReplacers: [{question: 'Insert UI Module Name', slot: '__name__'}],
        output: {
            path: './src/modules/__name__(kebabCase)',
            pathAndFileNameDefaultCase: '(kebabCase)',
            overwrite: true,
        },
    },
    {
        option: 'UI Component',
        defaultCase: '(pascalCase)',
        entry: {
            folderPath: './generator/component',
        },
        stringReplacers: [{question: 'Insert UI Component Name', slot: '__name__'}],
        output: {
            path: './src/modules/components/utils/__name__(kebabCase)',
            pathAndFileNameDefaultCase: '(kebabCase)',
            overwrite: true,
        },
    }

]);