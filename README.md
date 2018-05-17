# captain hook
node app for running arbitrary shell scripts (hooks) remotely via http(s). Use wisely.

# usage

1. copy ``config.copyme.json`` to ``config.json`` and edit your personal secret for your hooks and your desired network port.

2. add your hook commands into ``hook.json``.

3. send ``POST`` requests to your ``http(s)://host:port/secret/hookName`` adress.

4. enjoy your remote hooks.

5. use ``pm2`` to manage this app.