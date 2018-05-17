const express = require('express');
const moment = require('moment');
const chalk = require('chalk');
const config = require('./config.json');
const exec = require('child_process').exec;

const app = express();

function getTimestamp() {
    return chalk.grey(`[${moment().format('YYYY-MM-DD HH:mm:ss')}]`);
}

function log(content) {
    console.log(`${getTimestamp()} ${chalk.white(content)}`)
}

function executeHook(hookName, command) {
    exec(command,
        (error, stdout, stderr) => {
            if (stdout) {
                log(`${chalk.green(hookName)} | ${stdout}`);
            }
            if (stderr) {
                log(`${chalk.green(hookName)} | ${stderr}`);
            }
            if (error) {
                log(`${chalk.red(hookName)} | ${error}`);
            }
        });
}

function getHooks() {
    delete require.cache[require.resolve('./hooks.json')];
    return require('./hooks.json');
}

app.post(`/${config.secret}/:hookName`, function (req, res) {
    const hooks = getHooks();
    const hookName = req.params.hookName;
    if (hooks[hookName]) {
        res.sendStatus(200);
        executeHook(hookName, hooks[hookName]);
    } else {
        log(chalk.red(`invalid hook: ${hookName}`));
        res.sendStatus(403);
    }
});

app.listen(config.port, function () {

    console.log(chalk.green(
        `          
        _ _  _ |_ _ . _   |_  _  _ |  
       (_(_||_)|_(_||| )  | )(_)(_)|( 
            |                         
       `
    ));
    log(`started pirate hooks on port ${config.port}`);
});
