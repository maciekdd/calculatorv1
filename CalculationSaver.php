<?php


header("Referrer-Policy: no-referrer");
date_default_timezone_set('Europe/Warsaw');

class CalculationSaver {
    private string $file;

    public function __construct(string $filename = 'calculations.csv') {
        $this->file = $filename;
        $this->initFile();
    }

    private function initFile(): void {
        if (!file_exists($this->file)) {
            file_put_contents($this->file, '');
        }
    }

    public function saveCalculation(string $calculation, string $result): string {
        if (empty($calculation) || empty($result)) {
            return $this->createResponse("error", "Calculation or result is empty");
        }

        $date = date('Y-m-d H:i:s');
        $ip = $this->getClientIP();
        $calculationWithResult = $calculation . ' = ' . $result;
        $data = [$date, $ip, $calculationWithResult];

        return $this->writeToFile($data) ? $this->createResponse("success") :
            $this->createResponse("error", "Unable to write to file");
    }

    private function getClientIP(): string {
        $keys = ['HTTP_CLIENT_IP', 'HTTP_X_FORWARDED_FOR', 'HTTP_X_FORWARDED',
            'HTTP_FORWARDED_FOR', 'HTTP_FORWARDED', 'REMOTE_ADDR'];
        foreach ($keys as $key) {
            if ($ip = getenv($key)) {
                return $ip;
            }
        }
        return 'UNKNOWN';
    }

    private function writeToFile(array $data): bool {
        if (($fp = fopen($this->file, 'a')) !== false) {
            fputcsv($fp, $data);
            fclose($fp);
            return true;
        } else {
            return false;
        }
    }

    private function createResponse(string $status, string $message = ""): string {
        return json_encode(["status" => $status, "message" => $message]);
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['calculation'], $_POST['result'])) {
    $calculation = trim($_POST['calculation']);
    $result = trim($_POST['result']);
    $calculationSaver = new CalculationSaver();
    echo $calculationSaver->saveCalculation($calculation, $result);
}
?>

