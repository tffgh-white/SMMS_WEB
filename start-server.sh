#!/bin/bash

echo "正在启动前端开发服务器..."
echo ""
echo "配置信息："
echo "- 服务地址：http://0.0.0.0:5173"
echo "- 局域网访问：http://[你的IP地址]:5173"
echo ""
echo "正在获取本机IP地址..."

# 获取本机IP地址
if command -v ip >/dev/null 2>&1; then
    # Linux
    IP=$(ip route get 1.1.1.1 | awk '{print $7}' | head -1)
elif command -v ifconfig >/dev/null 2>&1; then
    # macOS
    IP=$(ifconfig | grep "inet " | grep -v 127.0.0.1 | awk '{print $2}' | head -1)
else
    IP="无法获取"
fi

echo "本机IP地址: $IP"
echo ""
echo "启动命令：npm run dev"
echo ""
echo "请等待服务器启动..."
echo ""

npm run dev