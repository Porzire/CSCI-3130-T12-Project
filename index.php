<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>CSCI 3130 Team 12</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">

    <link href="css/codiqa.ext.min.css" rel="stylesheet">
    <link href="css/jquery.mobile-1.3.1.min.css" rel="stylesheet">

    <script src="js/jquery-1.9.1.min.js"></script>
    <script src="js/jquery.mobile-1.3.1.min.js"></script>
    <script src="js/codiqa.ext.min.js"></script>
    <script src="js/script.js"></script>
    <script>
        (function(){
            document.location.hash = 'index';
        })();
    </script>
</head>
<body>
    <div id="content">
        <?php
        // Load content from individual pages.
        $path = 'html';
        $files = scandir($path);
        foreach ($files as $file) {
            $filenameInfo = pathinfo($file);
            if ($filenameInfo['extension'] == html) {
                $html = file_get_contents($path.'/'.$file);
                $dom = new DOMDocument();
                $dom->loadHTML($html);
                $xpath = new DOMXPath($dom);
                $div = $xpath->query('//div[@id="'.$filenameInfo['filename'].'"]');
                $div = $div->item(0);
                $content = $content.$dom->saveXML($div);
            }
        }
        // Change href reference syntax.
        $content = preg_replace('#href="(.*?)\.html"#','href="#\\1"', $content);
        echo $content;
        ?>
    </div>
</body>
</html>
