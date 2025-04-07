import { isValidName, isValidEmail, isValidPostalCode, isValidBirthdate, validateForm } from './validation';

test('validates name', () => {
    expect(isValidName('John')).toBe(true);
    expect(isValidName('')).toBe(false);
});

test('validates email', () => {
    expect(isValidEmail('john.doe@example.com')).toBe(true);
    expect(isValidEmail('invalid-email')).toBe(false);
});

test('validates postal code', () => {
    expect(isValidPostalCode('75000')).toBe(true);
    expect(isValidPostalCode('invalid')).toBe(false);
});

test('validates birthdate', () => {
    expect(isValidBirthdate('2000-01-01')).toBe(true);
    expect(isValidBirthdate('2015-01-01')).toBe(false);
});

test('validates form', () => {
    const form = {
        name: 'John',
        surname: 'Doe',
        email: 'john.doe@example.com',
        birthdate: '2000-01-01',
        city: 'Paris',
        postalCode: '75000'
    };
    expect(validateForm(form)).toEqual({});
});