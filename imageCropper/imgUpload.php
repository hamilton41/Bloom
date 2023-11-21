<?php
if (isset($_POST['image'])) {
    $base64_image = $_POST['image'];

    $image_data = base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $base64_image));

    $uploadDir = 'upload/';
    $existingFiles = glob($uploadDir . 'variable*.jpg');
    $maxNumber = 0;
    foreach ($existingFiles as $file) {
        preg_match('/variable(\d+)\.jpg/', $file, $matches);
        if (isset($matches[1])) {
            $number = intval($matches[1]);
            $maxNumber = max($maxNumber, $number);
        }
    }
    $newFileName = 'variable' . ($maxNumber + 1) . '.jpg';

    $file_name = 'upload/' . $newFileName;

    if (file_put_contents($file_name, $image_data) !== false) {
        echo '圖片上傳成功！';
    } else {
        echo 'Failed to save the image.';
    }
} else {
    echo 'Image data not received.';
}
?>
