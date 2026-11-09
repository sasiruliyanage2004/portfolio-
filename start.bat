@echo off
setlocal enabledelayedexpansion
title Sasiru Liyanage Portfolio - Local Development Server
color 0B
cls

echo =======================================================================
echo.
echo     SASIRU LIYANAGE -- FULL-STACK SOFTWARE ENGINEER PORTFOLIO
echo     React 19, Next.js, Vite, Tailwind CSS & Modern Web Architecture
echo.
echo =======================================================================
echo.

:: 1. Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    color 0C
    echo [ERROR] Node.js is not installed or not found in system PATH!
    echo Please download and install Node.js (LTS version) from:
    echo https://nodejs.org/
    echo.
    pause
    exit /b 1
)

echo [1/3] Node.js environment detected:
node -v
npm -v
echo.

:: 2. Check if node_modules exists, install if missing
if not exist "node_modules\" (
    echo [2/3] Project dependencies not found. Installing packages...
    echo Running 'npm install'...
    call npm install
    if %errorlevel% neq 0 (
        color 0C
        echo [ERROR] Failed to install npm dependencies!
        pause
        exit /b 1
    )
    echo Dependencies successfully installed.
) else (
    echo [2/3] Dependencies verified (node_modules present).
)

echo.
echo [3/3] Starting Vite development server...
echo.
echo =======================================================================
echo     Opening portfolio in your default browser at:
echo     http://localhost:5173/
echo.
echo     Press [Ctrl + C] in this window to stop the server anytime.
echo =======================================================================
echo.

:: Open browser after a brief 2-second delay once the server initializes
start "" cmd /c "timeout /t 2 >nul && start http://localhost:5173"

:: Run Vite development server
call npm run dev

pause
