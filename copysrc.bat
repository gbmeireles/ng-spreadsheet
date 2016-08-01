call tsc
call XCOPY src "demo\node_modules\ng-spreadsheet\src" /E /Y /I >NUL
XCOPY dist "demo\node_modules\ng-spreadsheet\dist" /E /Y /I >NUL