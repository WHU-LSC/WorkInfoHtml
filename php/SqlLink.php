
<?php
    $conn = mysqli_connect("localhost","root","123456","shixi") or die("数据库连接失败".mysql_error());
    $sql = "select * from test";//查询数据库当中的表的ID，
    $result = $conn->query($sql);
     
    if ($result->num_rows > 0) {
        // 输出数据
        while($row = $result->fetch_assoc()) {
            echo "id: " . $row["id"]. " - Name: " . $row["name"]. " -num" . $row["num"]. "<br>";
        }
    } else {
        echo "0 结果";
    }
    $conn->close();
?>
