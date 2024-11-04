<?php
error_reporting(0);
// Adatbázis kapcsolódás
$servername = '127.0.0.1'; // adatbázis szerver címe
$username = 'root';
$dbname = 'adatok';

$db = new mysqli($servername, $username, '', $dbname);
if ($db->connect_errno) 
{   
    echo $db->connect_error;
    die();
} 

//Megnézzük hogy  van-e már regisztrálva ilyen
if ($_GET['user'] !== null && $_GET['user'] !== '')
{
    $user = $_GET['user'];
}

if ($_GET['jelszo'] !== null && $_GET['jelszo'] !== '')
{
    $jelszo = $_GET['jelszo'];
}

//beolvas
$data = file_get_contents("password.txt");
$password_file = explode("\n", $data);

foreach ($password_file as $line) 
{
    $decoded_line = decodeLine($line);
    //echo $decoded_line . "<br>";

    $parts = explode('*', $decoded_line);
    $file_username = $parts[0];
    $file_password = $parts[1];

    //echo $user . " " . $jelszo . "<br>";
    //echo $file_username . " " . $file_password . "<br>";
    //echo '---------------------<br>';

    $szin = "";
    $szin_html ='';
    $szöveg_szin = '#ffffff'; //feher

    if (strcmp($jelszo, $file_password) == 0)
    {   
        if($result = $db->query("SELECT Titkos FROM `tabla` WHERE Username = '$user'"))
        {   
            if ($result->num_rows > 0) 
            {
                $row = $result->fetch_assoc();
                $szin = $row["Titkos"];
            } 
            else 
            {
                echo "Nincs ilyen felhasználó";
                exit(); // Stop execution if user not found
            }
        }

        switch ($szin) 
        {
            case 'piros':
                $szin_html = '#ff0000';
                break;
            case 'zold':
                $szin_html = '#00ff00';
                break;
            case 'feher':
                $szin_html = '#ffffff';
                $szöveg_szin = '#000000';
                break;
            case 'kek':
                $szin_html = '#0000ff';
                break;
            case 'sarga':
                $szin_html = '#ffff00';
                break;
            case 'fekete':
                $szin_html = '#000000';
                $szöveg_szin = '#ffffff';
                break;
        }

        echo '<!DOCTYPE html>
                <html>
                <head>
                    <title>Your HTML Page</title>
                    <style>
                        h1 {
                            text-align: center;
                            color: ' . $szöveg_szin . '; /* Set text color dynamically */
                        }
                    </style>
                </head>
                <body style="font-family: Arial; background-color: ' .$szin_html . ';">
                    <h1>Gratulálok sikerült belépned!</h1>
                    <!-- Other HTML content -->
                </body>
                </html>';
        exit(); // Stop execution after successful login
    }
    else
    {
        if (strcmp($user, $file_username) == 0) {
            echo "Hibás jelszó";
            echo '<script>
                    setTimeout(function() {
                        window.location.href = "https://www.police.hu";
                    }, 3000); // Redirect to police.hu after 3 seconds
                  </script>';
            exit();
        }
    }
}

echo "Nincs ilyen felhasználó"; // Display if no matching user found

$db->close();

function decodeLine($line)
{   
    $key = array(5, -14, 31, -9, 3);
    $index = 0;
    $decoded_line = "";

    for ($i = 0; $i < strlen($line); $i++) 
    {
        if ($key[$index] > 0)
        {
            $decoded_line .= chr(ord($line[$i]) - $key[$index]);
        }
        else
        {
            $decoded_line .= chr(ord($line[$i]) - $key[$index]);
        }
        $index++;
        if ($index >= 5 )
        {
            $index = 0;
        }
    }
    return $decoded_line;
}
?>
