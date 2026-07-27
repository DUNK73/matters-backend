module.exports = {
  apps: [
    {
      name: 'matters-backend',
      script: './dist/src/main.js',
      cwd: '/var/www/matterslab/matters-backend',
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      watch: false,
      max_memory_restart: '500M',
      env: {
        NODE_ENV: 'production',
        PORT: 3002
      }
    }
  ]
};