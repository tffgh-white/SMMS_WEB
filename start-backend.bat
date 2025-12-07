@echo off
echo 正在启动后端服务器...
echo 服务器将在局域网内可访问
echo.

cd /d "%~dp0\server"

node server.js

pause