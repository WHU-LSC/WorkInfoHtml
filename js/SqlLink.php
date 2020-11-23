
<?php
    ob_start ();
    header("Access-Control-Allow-Origin:*");
    $conn = mysqli_connect("localhost","root","123456","shixi") or die("数据库连接失败".mysql_error());
    $sql = "select * from shixi_country";//查询数据库当中的表的ID，
    $result = $conn->query($sql);
     

    $array = array(); 
    $i = 0; 
     
    if ($result->num_rows > 0) {
        // 输出数据
        while($row = $result->fetch_assoc()) {
            $array[$i]["infoId"] = $i;
            $array[$i]["infoAddress"] = $row["base"];
            $array[$i]["infoCompany"] = $row["company"];
            $array[$i]["infoJob"] = $row["job"];
            $array[$i]["infoHerf"] = $row["url"];  
            $array[$i]["infoSource"] = $row["source"];  
            $array[$i]["infoTime"] = $row["upgrade_date"];  
            $i++;
        }
    } else {
        echo "0 结果";
    }
    $data = json_encode($array,JSON_UNESCAPED_UNICODE);
    echo $data;
    $conn->close();
?>
