#! /usr/bin/env node

let commander = require('commander');
let path = require('path');
let {
    execSync
} = require('child_process');
const inquirer = require('inquirer');


let execCommand = (commandName, options) => {
    require('../commands/index').execCommand(commandName, options);
}

commander
    .version(require('../package').version)
    .description('project overview tool')
    .usage('<command> [options]')

commander
    .command('report')
    .description('获取项目概要信息')
    .action(function () {
        let processDirPath = process.env.PWD;
        execCommand('report', {
            reportDirPath: '' || processDirPath,
            srcDirPath: '' || processDirPath
        });
    })



commander.on('--help', function () {
    console.log('');
    console.log('  Examples:');
    console.log('');

    console.log('    $ pot report ## 获取项目概要信息');

    console.log('');
});

// 为所有帮助信息的最后一行加空白
commander.commands.forEach(c => c.on('--help', () => console.log()))

commander.parse(process.argv);

if (!process.argv.slice(2).length) {
    commander.outputHelp()
}
