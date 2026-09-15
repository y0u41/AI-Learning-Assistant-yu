# og-image.png generator (ASCII-only script; Chinese text is read from UTF-8 .txt files
# to avoid codepage issues on Windows consoles).
# Usage: powershell -NoProfile -ExecutionPolicy Bypass -File scripts\gen-og.ps1
Add-Type -AssemblyName System.Drawing
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$projectDir = Split-Path -Parent $scriptDir
$width = 1200
$height = 630
$bmp = New-Object System.Drawing.Bitmap($width, $height)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
$g.Clear([System.Drawing.Color]::FromArgb(255, 10, 10, 10))
$soft = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(12, 255, 255, 255))
$g.FillEllipse($soft, 900, -140, 420, 420)
$g.FillEllipse($soft, -90, 430, 320, 320)
$border = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(26, 255, 255, 255), 2)
$g.DrawRectangle($border, 1, 1, $width - 3, $height - 3)
$title = [System.IO.File]::ReadAllText((Join-Path $scriptDir 'og-title.txt'), [System.Text.Encoding]::UTF8).Trim()
$subtitle = [System.IO.File]::ReadAllText((Join-Path $scriptDir 'og-subtitle.txt'), [System.Text.Encoding]::UTF8).Trim()
$fontBig = New-Object System.Drawing.Font('Microsoft YaHei', 76, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
$fontSmall = New-Object System.Drawing.Font('Microsoft YaHei', 30, [System.Drawing.FontStyle]::Regular, [System.Drawing.GraphicsUnit]::Pixel)
$white = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(235, 255, 255, 255))
$gray = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(166, 255, 255, 255))
$fmt = New-Object System.Drawing.StringFormat
$fmt.Alignment = [System.Drawing.StringAlignment]::Center
$g.DrawString($title, $fontBig, $white, (New-Object System.Drawing.RectangleF(0, 225, $width, 110)), $fmt)
$g.DrawString($subtitle, $fontSmall, $gray, (New-Object System.Drawing.RectangleF(0, 355, $width, 50)), $fmt)
$g.Dispose()
$outPath = Join-Path $projectDir 'public\og-image.png'
$bmp.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Dispose()
Write-Output ('saved: ' + $outPath)