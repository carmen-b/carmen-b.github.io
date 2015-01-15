@echo off
cd ..
del *.* /q
for /d %%i in (*.*) do if not "%%i"==".git" if not "%%i"=="_code" rd /S /Q "%%i"
cd _code
call harp compile site ..\temp
xcopy /E ..\temp\* ..\
rd /S /Q ..\temp