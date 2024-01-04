
<?php

use PHPUnit\Framework\TestCase;

class CalculationSaverTest extends TestCase
{
    private CalculationSaver $calculationSaver;

    protected function setUp(): void
    {
        parent::setUp();
        $this->calculationSaver = new CalculationSaver('test_calculations.csv');
    }

    protected function tearDown(): void
    {
        if (file_exists('test_calculations.csv')) {
            unlink('test_calculations.csv');
        }
        parent::tearDown();
    }

    public function testInitFileCreatesFileIfNotExists(): void
    {
        $this->assertFileExists('test_calculations.csv');
    }

    public function testSaveCalculationWithValidData(): void
    {
        $response = $this->calculationSaver->saveCalculation('1 + 1', '2');
        $this->assertJson($response);
        $decoded = json_decode($response, true);
        $this->assertEquals('success', $decoded['status']);
    }

    public function testSaveCalculationWithEmptyData(): void
    {
        $response = $this->calculationSaver->saveCalculation('', '');
        $this->assertJson($response);
        $decoded = json_decode($response, true);
        $this->assertEquals('error', $decoded['status']);
    }

    public function testGetClientIP(): void
    {
        putenv('REMOTE_ADDR=123.123.123.123');

        $reflection = new ReflectionClass($this->calculationSaver);
        $method = $reflection->getMethod('getClientIP');
        $method->setAccessible(true);
        $ip = $method->invoke($this->calculationSaver);

        $this->assertEquals('123.123.123.123', $ip);
    }

    public function testWriteToFile(): void
    {
        $response = $this->calculationSaver->saveCalculation('2 + 2', '4');
        $decoded = json_decode($response, true);

        $this->assertEquals('success', $decoded['status']);
        $this->assertFileExists('test_calculations.csv');
        $contents = file_get_contents('test_calculations.csv');
        $this->assertStringContainsString('2 + 2 = 4', $contents);
    }

    public function testCreateResponse(): void
    {
        $reflection = new ReflectionClass($this->calculationSaver);
        $method = $reflection->getMethod('createResponse');
        $method->setAccessible(true);
        $response = $method->invokeArgs($this->calculationSaver, ['success', 'Test message']);

        $this->assertJson($response);
        $decoded = json_decode($response, true);
        $this->assertEquals('success', $decoded['status']);
        $this->assertEquals('Test message', $decoded['message']);
    }
}
//
//        String('2 + 2 = 4', $contents);
//    }
//
//    public function testCreateResponse(): void
//    {
//        $reflection = new ReflectionClass($this->calculationSaver);
//        $method = $reflection->getMethod('createResponse');
//        $method->setAccessible(true);
//        $response = $method->invokeArgs($this->calculationSaver, ['success', 'Test message']);
//
//        $this->assertJson($response);
//        $decoded = json_decode($response, true);
//        $this->assertEquals('success', $decoded['status']);
//        $this->assertEquals('Test message', $decoded['message']);
//    }
//
//
