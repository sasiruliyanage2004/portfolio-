@echo off
title Portfolio App - Dev Server
echo ===================================
echo   Starting Portfolio Dev Server
echo ===================================
echo.

if not exist node_modules (
    echo node_modules folder not found. Installing dependencies...
    call npm install
    echo.
)

echo Running 'npm run dev'...
call npm run dev -- --open
pause
