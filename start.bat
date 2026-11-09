@echo off
setlocal
cd /d "%~dp0"
title Sasiru Liyanage Portfolio - Local Server
color 0b
cls

:: Smart project directory detection
if not exist "package.json" (
    if exist "C:\projects\Portfollo\package.json" (
        cd /d "C:\projects\Portfollo"
    )
)

echo =======================================================================
echo.
echo     SASIRU LIYANAGE - FULL-STACK SOFTWARE ENGINEER PORTFOLIO
echo     React 19, Next.js, Vite, Tailwind CSS and WebGL Architecture
echo.
echo =======================================================================
echo.

:: 1. Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    color 0c
    echo [ERROR] Node.js is not installed or not in your system PATH!
    echo Please install Node.js LTS from: https://nodejs.org/
    echo.
    pause
    exit /b 1
)

echo [1/3] Node.js environment detected:
node -v
echo.

:: 2. Check if node_modules exists
if not exist node_modules (
    echo [2/3] Project dependencies not found. Installing packages...
    echo Running npm install...
    call npm install
    if %errorlevel% neq 0 (
        color 0c
        echo [ERROR] Failed to install npm dependencies!
        pause
        exit /b 1
    )
    echo Dependencies successfully installed.
) else (
    echo [2/3] Dependencies verified: node_modules present.
)

echo.
echo [3/3] Starting Vite development server and opening browser...
echo.
echo =======================================================================
echo     Opening http://localhost:5173/ in your default browser...
echo.
echo     Press Ctrl + C in this window to stop the server anytime.
echo =======================================================================
echo.

:: Launch Vite with automatic browser opening
call npm run dev -- --open

pause
