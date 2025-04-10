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
    expect(isValidPostalCode('ABCDE')).toBe(false);
    expect(isValidPostalCode('7500A')).toBe(false);
});

test('validates birthdate with edge cases around turning 18', () => {
    const today = new Date();

    const nextMonth = new Date(today.getFullYear() - 18, today.getMonth() + 1, today.getDate());
    expect(isValidBirthdate(nextMonth.toISOString().split('T')[0])).toBe(false);

    const lastMonth = new Date(today.getFullYear() - 18, today.getMonth() - 1, today.getDate());
    expect(isValidBirthdate(lastMonth.toISOString().split('T')[0])).toBe(true);
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