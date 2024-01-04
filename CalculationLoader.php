<?php

declare(strict_types=1);

class CalculationLoader
{
    private const FILENAME = 'calculations.csv';

    public function loadCalculations(): array
    {
        if (!file_exists(self::FILENAME)) throw new RuntimeException('File not found: ' . self::FILENAME);

        $csvData = file_get_contents(self::FILENAME);
        if ($csvData === false) throw new RuntimeException('Unable to read file: ' . self::FILENAME);

        return $this->parseCsvData($csvData);
    }

    private function parseCsvData(string $csvData): array
    {
        $lines = explode("\n", $csvData);
        $rows = array_map('str_getcsv', $lines);

        $rows = array_filter($rows, function($row) {
            return isset($row[0]) && is_string($row[0]) && !empty(trim($row[0]));
        });

        usort($rows, fn($a, $b) => strtotime($b[0]) <=> strtotime($a[0]));

        return $rows;
    }

}

?>
