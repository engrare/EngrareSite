@echo off
setlocal EnableExtensions EnableDelayedExpansion
chcp 65001 >nul
cd /d "%~dp0"

echo ============================================
echo   ENGRARE - Site Yayinlama Scripti
echo ============================================
echo.

set "GIT_NAME=Engrare"
set "GIT_EMAIL=engrare.co@gmail.com"
set "REPO_URL=https://engrare@github.com/engrare/EngrareSite.git"
set "DEPLOY_OK=0"

echo Klasordeki tum dosyalar GitHub'a yukleniyor...
if exist ".git" rmdir /s /q .git
git init -q
git config user.name "%GIT_NAME%"
git config user.email "%GIT_EMAIL%"

git checkout -b deploy -q 2>nul
git add -A
if exist ".agents" git reset -q .agents 2>nul
git commit -q -m "Site guncellemesi %date% %time:~0,5%"

echo GitHub'a gonderiliyor: %REPO_URL%
git push --force "%REPO_URL%" deploy:main
if errorlevel 1 (
    echo.
    echo [HATA] GitHub yuklemesi basarisiz oldu.
) else (
    echo.
    echo [BASARILI] Tum dosyalar basariyla yayinlandi.
    set "DEPLOY_OK=1"
)

if exist ".git" rmdir /s /q .git

echo.
echo ============================================
if "!DEPLOY_OK!"=="1" (echo   Durum : YAYINDA - https://github.com/engrare/EngrareSite) else (echo   Durum : YAYINLANMADI)
echo ============================================
exit /b 0
