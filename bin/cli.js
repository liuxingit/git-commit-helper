#!/usr/bin/env node

const cli = require('cac')();
const pkg = require('../package.json');
const branch = require('git-branch');
const chalk = require('chalk');
const path = require('path');
const fs = require('fs');
const fsCus = require('../fs');
const msgReg = require('../msg-reg');
const msgPath = path.join(process.cwd(), '.git/COMMIT_EDITMSG');
const msg = fs.readFileSync(msgPath, 'utf-8').trim();

cli.option('-p, --prefix <prefix>', 'set a prefix')
cli.option('-i, --idprefix <idprefix>', 'set a id‘s prefix')
cli.help()
cli.version(pkg.version)
cli.parse()

const prefix = cli.options.prefix ?  cli.options.idp instanceof Array ? cli.options.prefix[0] : cli.options.prefix : ''
const idprefix = cli.options.idprefix ? (cli.options.idprefix instanceof Array ? cli.options.idprefix : [cli.options.idprefix]) : []
const { MSG_REG, MSG_DES }  = msgReg.getMsgReg(prefix)
const passed = MSG_REG.some(reg => {
    return reg.test(msg)
})

if(prefix){
    if(!passed){
        const branchName = branch.sync();
        let allIdReg = [];
        if(idprefix && idprefix.length){
            allIdReg = idprefix.map(idp => {
                return new RegExp(idp + '(-|_)(\\d{1,})', 'i' )
            })
        } else {
            allIdReg = [new RegExp(prefix + '(-|_)(\\d{1,})', 'i' )]
        }
        let id;
        allIdReg.some(reg => {
            const matches = reg.exec(branchName)
            if(matches && matches[0]){
                id = RegExp.$2;
            }
            return matches && matches[0]
        });
        if(id){
            var newMsg = `${prefix}_${id} ${msg}`
            const passed = MSG_REG.some(reg => {
                return reg.test(newMsg)
            })
            if(passed){
                console.log(`${chalk.green(`commit msg::: ${newMsg}\n`)}`)
                fsCus.write(msgPath, newMsg)
            } else {
                commitError()
            }
            
        } else {
            console.log(`${chalk.red(`failed, branch name(${branchName}) doesn‘t match ${allIdReg}, please check(eg:set -i)!!!\n`)}`)
            commitError()
        }   
    }
} else {
    !passed && commitError();
}
function commitError(){
    const ALL_MSG_DES = MSG_DES.map(msg => {
        return `${chalk.green(msg)}`
    }).join('\n')

    console.error(
        ` 
${chalk.bgRed.white(' ERROR ')} ${chalk.red(`invalid commit message format.`)}\n\n
${chalk.red(`Proper commit message format is required. Examples:\n`)}
${ALL_MSG_DES}\n\n
        `
    );
    process.exit(1);
}