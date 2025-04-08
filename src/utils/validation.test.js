import { isValidName, isValidEmail, isValidPostalCode, isValidBirthdate, validateForm } from './validation';

test('validates names with accents, hyphens and apostrophes', () => {
    expect(isValidName("Élise")).toBe(true);
    expect(isValidName("Jean-Luc")).toBe(true);
    expect(isValidName("O'Connor")).toBe(true);
    expect(isValidName("Chloë")).toBe(true);
    expect(isValidName("François")).toBe(true);
    expect(isValidName("Léa-Maël")).toBe(true);
});

test('invalidates names with special characters or digits', () => {
    expect(isValidName("John3")).toBe(false);
    expect(isValidName("Marie@")).toBe(false);
    expect(isValidName("")).toBe(false);
});

test('validates various email formats', () => {
    expect(isValidEmail("john.doe@example.com")).toBe(true);
    expect(isValidEmail("john@example.co.uk")).toBe(true);
    expect(isValidEmail("john+test@example.io")).toBe(true);
    expect(isValidEmail("john..doe@example.com")).toBe(false);
    expect(isValidEmail("john@.com")).toBe(false);
});

test('validates postal code', () => {
    expect(isValidPostalCode('75000')).toBe(true);
    expect(isValidPostalCode('123')).toBe(false);
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