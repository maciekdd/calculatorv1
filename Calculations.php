<!DOCTYPE html>
<html lang="pl">
<head>
    <title>Calculations</title>
    <style>
        table {
            width: 100%;
            border-collapse: collapse;
        }
        th, td {
            border: 1px solid black;
            padding: 8px;
            text-align: left;
        }
        th {
            background-color: #f2f2f2;
        }
    </style>
</head>
<body>
<h1>Saved Calculations</h1>
<table>
    <tr>
        <th>Date</th>
        <th>IP Address</th>
        <th>Calculation</th>
    </tr>
    <?php
    require_once 'CalculationLoader.php';

    try {
        $loader = new CalculationLoader();
        $rows = $loader->loadCalculations();

        foreach ($rows as $row): ?>
            <tr>
                <td><?= htmlspecialchars($row[0]) ?></td>
                <td><?= htmlspecialchars($row[1]) ?></td>
                <td><?= htmlspecialchars($row[2]) ?></td>
            </tr>
        <?php endforeach;
    } catch (Exception $e) {
        echo '<tr><td colspan="3">Error loading calculations: ' . htmlspecialchars($e->getMessage()) . '</td></tr>';
    }
    ?>
</table>
</body>
</html>
