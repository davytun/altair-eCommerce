<?php
$__storeTrack = null;
$__dir = __DIR__;
for ($__i = 0; $__i < 8; $__i++) {
    $__cand = $__dir . DIRECTORY_SEPARATOR . 'includes' . DIRECTORY_SEPARATOR . 'store-tracking.php';
    if (is_readable($__cand)) { $__storeTrack = $__cand; break; }
    $__parent = dirname($__dir);
    if ($__parent === $__dir) break;
    $__dir = $__parent;
}
if ($__storeTrack !== null) {
    require_once $__storeTrack;
    echo store_tracking_head();
} else {
    echo '<script type="text/plain" id="dead_store_tracking" data-erp-track="dead_store_tracking">/* includes/store-tracking.php not found */</script>';
}
unset($__storeTrack, $__dir, $__i, $__cand, $__parent);
?>
