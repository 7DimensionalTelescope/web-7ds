module.exports = {
  apps: [
    {
      name: "7ds",
      cwd: "/home/dtak/7ds",
      script: "npm",
      args: "start",
      interpreter: "/home/dtak/.nvm/versions/node/v20.20.2/bin/node",
      env: {
        PATH: "/home/dtak/.nvm/versions/node/v20.20.2/bin:/usr/bin:/bin",
        NODE_ENV: "production",
        PORT: "3001",
      },
      autorestart: true,
      max_restarts: 20,
      min_uptime: "5s",
    },
  ],
};
