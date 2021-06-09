@echo off
ssh -i C:\Users\WinZoom\.ssh\id_rsa -p 22 pi@10.25.100.200  "echo out > /sys/class/gpio/gpio14/direction;sleep 2s;echo in > /sys/class/gpio/gpio14/direction"