<!DOCTYPE html>
<html>

<head>
  <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">

  <style type="text/css">
    .tg {
      border-collapse: collapse;
      border-color: #9ABAD9;
      border-spacing: 0;
    }

    .tg td {
      background-color: #EBF5FF;
      border-color: #9ABAD9;
      border-style: solid;
      border-width: 1px;
      color: #444;
      font-family: Arial, sans-serif;
      font-size: 14px;
      overflow: hidden;
      padding: 10px 5px;
      word-break: normal;
    }

    .tg th {
      background-color: #409cff;
      border-color: #9ABAD9;
      border-style: solid;
      border-width: 1px;
      color: #fff;
      font-family: Arial, sans-serif;
      font-size: 14px;
      font-weight: normal;
      overflow: hidden;
      padding: 10px 5px;
      word-break: normal;
    }

    .tg .tg-0lax {
      text-align: left;
      vertical-align: top
    }
  </style>
</head>

<body>
  <table class="tg">
    <?php
    $servername = getenv("DB_HOST");
    $username = getenv("DB_USER");
    $password = getenv("DB_PASS");
    $dbname = getenv("DB_NAME");

    $conn = new mysqli($servername, $username, $password, $dbname);
    if ($conn->connect_error) {
      die("Connection failed: " . $conn->connect_error);
    }

    $conn->set_charset("utf8");

    $sql = "SELECT * FROM " . getenv("TABLE");
    $result = $conn->query($sql);

    $cicle = 0;

    if ($result->num_rows > 0) {
      while ($row = $result->fetch_assoc()) {
        $keys = array_keys($row);
        if ($cicle == 0) {
          $str = "<thead><tr>";
          foreach ($keys as $key) {
            $str .= '<th class="tg-0lax">' . $key . '</th>';
          }
          $str .= "</tr></thead><tbody>";
          echo $str;
        }

        $_rowStr = "<tr>";
        foreach ($row as $col) {
          $_rowStr .= '<td class="tg-0lax">' . $col . '</td>';
        }
        $_rowStr .= "</tr>";
        echo $_rowStr;
        $cicle += 1;
      }
    } else {
      echo "0 results";
    }

    $conn->close();
    ?>
    </tbody>
  </table>

</body>

</html>