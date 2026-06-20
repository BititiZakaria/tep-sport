@echo off
REM run-elevated.cmd - Launch allow-node-firewall.ps1 with elevation
SET scriptPath=%~dp0allow-node-firewall.ps1
powershell -NoProfile -Command "Start-Process powershell -ArgumentList '-NoProfile -ExecutionPolicy Bypass -File "%scriptPath%"' -Verb RunAs"
