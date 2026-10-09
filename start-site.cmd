@echo off
rem Starts a small local web server and opens the site.
rem The live portfolio previews need this: they do not run when index.html is opened by double-click.
pushd "%~dp0"
start "" http://127.0.0.1:8765/index.html
python -m http.server 8765 --bind 127.0.0.1
