@echo off
echo 正在启动前端开发服务器...
echo.
echo 配置信息：
echo - 服务地址：http://0.0.0.0:5173
echo - 局域网访问：http://[你的IP地址]:5173
echo.
echo 正在获取本机IP地址...
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /R "IPv4.*:"') do set ip=%%a
echo 本机IP地址: %ip%
echo.
echo 启动命令：npm run dev
echo.
echo 请等待服务器启动...
echo.

npm run dev

pause