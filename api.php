<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

$connection = mysqli_connect('localhost', 'root', '', 'userdata');

if (isset($_POST['action']) && $_POST['action'] == 'getdata') {

    $query = "select * from users";

    $result = mysqli_query($connection, $query);
    $arr = [];
    while ($row = mysqli_fetch_assoc($result)) {
        $arr[] = $row;
    }
    header('Content-Type: application/json');
    echo json_encode([
        'status' => 'success',
        'data' => $arr
    ]);

    exit;
}
if (isset($_POST['action']) && $_POST['action'] == 'editdata') {
    $query = "select * from users where id ='" . $_POST['id'] . "'";
    $result = mysqli_query($connection, $query);
    $arr = [];
    while ($row = mysqli_fetch_assoc($result)) {
        $arr[] = $row;
    }

    echo json_encode([
        'status' => 'success',
        'data' => $arr
    ]);

    exit;
}
if (isset($_POST['action']) && $_POST['action'] == 'update_data') {


    $data = $_POST;

    var_dump($data);
    $query = "UPDATE users
              SET name = '{$data['name']}', 
                  state = '{$data['state']}', 
                  city = '{$data['city']}', 
                  email = '{$data['email']}', 
                  phonenumber = '{$data['phonenumber']}'
              WHERE id = {$data['id']}";
    $result = mysqli_query($connection, $query);
    echo json_encode([
        'status' => $result ? 'success' : 'error'
    ]);
    exit;
}
