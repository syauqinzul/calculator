Unit Test Examples
// Test untuk fungsi matematika
describe('Calculator Operations', () => {
    test('addition works correctly', () => {
        calculator.appendNumber('2');
        calculator.chooseOperation('add');
        calculator.appendNumber('3');
        calculator.compute();
        expect(calculator.currentOperand).toBe('5');
    });
    
    test('scientific functions work', () => {
        calculator.appendNumber('45');
        calculator.scientificOperation('sin');
        expect(calculator.currentOperand).toBe('0.7071067812');
    });
});

Integration Test Examples
describe('Full Calculator Flow', () => {
    test('complete calculation with memory', () => {
        // Simulate user interaction
        simulateClick('5');
        simulateClick('+');
        simulateClick('3');
        simulateClick('=');
        
        // Verify display
        expect(getDisplay()).toBe('8');
        
        // Test memory
        simulateClick('M+');
        expect(getMemory()).toBe(8);
    });
});